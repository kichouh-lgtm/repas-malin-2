"use client";
import { useEffect, useState } from "react";
import { DndContext, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { allRecipes, store, CUSTOM_KEY, imgOf, SOURCES, type Recipe, type Src } from "@/lib/recipes";
import { generateWeek, replaceIds, targetWeek } from "@/lib/generate";
import { buildShoppingList } from "@/lib/shopping";
import AddRecipe from "./AddRecipe";

type State = { week: string; sources: Src[]; ids: string[]; validated: boolean; rejected: string[]; checked: string[] };
type Tab = "selection" | "calendrier" | "courses";
const KEY = "repasmalin.v1";
const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const byId = (id: string) => allRecipes().find((r) => r.id === id)!;
const fresh = (sources: Src[]): State => ({ week: targetWeek(), sources, ids: generateWeek(sources), validated: false, rejected: [], checked: [] });
const pill = "rounded-full bg-ink px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition hover:bg-black/75 disabled:opacity-30";
const pillO = "rounded-full border border-ink px-4 py-2 text-[11px] uppercase tracking-[0.14em] transition hover:bg-ink hover:text-white disabled:opacity-30";
const tag = (s: Src) => (s === "COOKOMIX" ? "Thermomix" : "Classique");

function Photo({ r, className = "" }: { r: Recipe; className?: string }) {
  return <img src={imgOf(r)} alt={r.title} loading="lazy" draggable={false} className={`object-cover ${className}`} />;
}

function DayCard({ recipe, day, onOpen }: { recipe: Recipe; day: string; onOpen: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: recipe.id });
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} {...attributes} {...listeners}
      className={`touch-none overflow-hidden rounded-2xl border border-line bg-white/60 ${isDragging ? "z-10 shadow-2xl ring-2 ring-ink" : ""}`}>
      <div className="relative">
        <Photo r={recipe} className="aspect-[4/3] w-full" />
        <span className="absolute left-3 top-3 rounded-full bg-cream px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]">{day}</span>
      </div>
      <div className="p-3">
        <p className="font-display text-lg font-light uppercase leading-tight">{recipe.title}</p>
        <div className="mt-2 flex items-center justify-between text-[11px] text-ink/60">
          <span>{tag(recipe.source)} · {recipe.prep + recipe.cook} min</span>
          <button onPointerDown={(e) => e.stopPropagation()} onClick={onOpen} className="uppercase tracking-wider underline">Fiche</button>
        </div>
      </div>
    </div>
  );
}

function RecipeModal({ r, onClose }: { r: Recipe; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-4" onClick={onClose}>
      <article className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-cream sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="relative"><Photo r={r} className="h-52 w-full" />
          <button onClick={onClose} aria-label="Fermer" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-cream">✕</button></div>
        <div className="space-y-4 p-6">
          <h2 className="font-display text-3xl font-light uppercase leading-tight">{r.title}</h2>
          <p className="text-xs uppercase tracking-[0.12em] text-ink/60">{r.source === "COOKOMIX" ? "Cookomix" : "Kookmutjes"} · Prép. {r.prep} min · Cuisson {r.cook} min · {r.servings} portions</p>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em]">Ingrédients</h3>
          <ul className="list-disc pl-5 text-sm leading-relaxed">{r.ing.map(([n, q, u], i) => <li key={i}>{q ?? ""} {u ?? ""} {n}</li>)}</ul>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em]">Préparation</h3>
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed">{r.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
        </div>
      </article>
    </div>
  );
}

export default function App() {
  const [s, setS] = useState<State | null>(null);
  const [tab, setTab] = useState<Tab>("selection");
  const [picked, setPicked] = useState<string[]>([]);
  const [open, setOpen] = useState<Recipe | null>(null);
  const [adding, setAdding] = useState(false);
  const [, refresh] = useState(0);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }), useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 6 } }));

  useEffect(() => {
    try { store.custom = JSON.parse(localStorage.getItem(CUSTOM_KEY) || "[]"); } catch {}
    let st: State | null = null;
    try { st = JSON.parse(localStorage.getItem(KEY) || "null"); } catch {}
    if (!st || st.week !== targetWeek() || st.ids.some((id) => !allRecipes().find((r) => r.id === id))) st = fresh(st?.sources?.length ? st.sources : SOURCES.map((x) => x.id));
    setS(st);
    if (st.validated) setTab("calendrier");
  }, []);
  useEffect(() => { if (s) localStorage.setItem(KEY, JSON.stringify(s)); }, [s]);

  const wrap = (children: React.ReactNode) => (
    <section id="planner" className="border-t border-line bg-white/40"><div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-12">{children}</div></section>
  );
  if (!s) return wrap(<p>Chargement…</p>);
  if (s.ids.some((id) => !allRecipes().find((r) => r.id === id))) { setS(fresh(s.sources)); return null; }

  const upd = (p: Partial<State>) => setS({ ...s, ...p });
  const recipes = s.ids.map(byId);
  const toggleSrc = (id: Src) => {
    const sources = s.sources.includes(id) ? s.sources.filter((x) => x !== id) : [...s.sources, id];
    if (sources.length) { setS(fresh(sources)); setPicked([]); }
  };
  const replace = () => { upd({ ids: replaceIds(s.ids, picked, s.sources, s.rejected), rejected: [...s.rejected, ...picked] }); setPicked([]); };
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) upd({ ids: arrayMove(s.ids, s.ids.indexOf(String(active.id)), s.ids.indexOf(String(over.id))) });
  };
  const shopping = buildShoppingList(recipes);
  const weekLabel = new Date(s.week + "T12:00:00").toLocaleDateString("fr-BE", { day: "numeric", month: "long" });
  const tabs: [Tab, string, boolean][] = [["selection", "01 Sélection", true], ["calendrier", "02 Calendrier", true], ["courses", "03 Courses", s.validated]];

  return wrap(
    <>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-ink/60">Semaine du {weekLabel}</p>
          <h2 className="font-display text-5xl font-light uppercase leading-none md:text-6xl">Ma semaine</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {SOURCES.map((x) => (
            <button key={x.id} onClick={() => toggleSrc(x.id)}
              className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.12em] ${s.sources.includes(x.id) ? "border-ink bg-ink text-white" : "border-line"}`}>{x.label}</button>
          ))}
          <button onClick={() => { setS(fresh(s.sources)); setTab("selection"); setPicked([]); }} className={pillO}>🎲 Nouvelle semaine</button>
          <button onClick={() => setAdding(true)} className={pillO}>+ Mes recettes</button>
        </div>
      </div>

      <nav className="mt-8 flex gap-8 border-b border-line text-[11px] uppercase tracking-[0.16em]">
        {tabs.map(([t, l, ok]) => (
          <button key={t} disabled={!ok} onClick={() => setTab(t)} className={`-mb-px border-b-2 pb-3 disabled:opacity-30 ${tab === t ? "border-ink" : "border-transparent text-ink/50"}`}>{l}</button>
        ))}
      </nav>

      {tab === "selection" && (
        <div className="mt-8 space-y-6">
          <p className="text-sm text-ink/70">Pas convaincu ? Choisissez 1 à 3 recettes ({picked.length}/3) et remplacez-les.</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {recipes.map((r) => {
              const on = picked.includes(r.id);
              return (
                <article key={r.id} className={`overflow-hidden rounded-2xl border bg-white/60 transition ${on ? "border-ink ring-2 ring-ink" : "border-line"}`}>
                  <button onClick={() => setOpen(r)} className="block w-full text-left"><Photo r={r} className="aspect-[4/3] w-full" /></button>
                  <div className="space-y-2 p-3">
                    <p className="font-display text-lg font-light uppercase leading-tight">{r.title}</p>
                    <p className="text-[11px] text-ink/60">{tag(r.source)} · {r.prep + r.cook} min · {r.servings} pers.</p>
                    <button onClick={() => setPicked(on ? picked.filter((x) => x !== r.id) : picked.length < 3 ? [...picked, r.id] : picked)}
                      className={`w-full rounded-full border py-2 text-[11px] uppercase tracking-[0.12em] ${on ? "border-ink bg-ink text-white" : "border-line hover:border-ink"}`}>🔄 Remplacer</button>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-3">
            <button disabled={!picked.length} onClick={replace} className={pillO}>Remplacer {picked.length || ""} recette(s)</button>
            <button onClick={() => setTab("calendrier")} className={pill}>Valider la sélection →</button>
          </div>
        </div>
      )}

      {tab === "calendrier" && (
        <div className="mt-8 space-y-6">
          <p className="text-sm text-ink/70">Glissez-déposez les recettes pour choisir le jour de chaque repas.</p>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={s.ids} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {recipes.map((r, i) => <DayCard key={r.id} recipe={r} day={DAYS[i]} onOpen={() => setOpen(r)} />)}
              </div>
            </SortableContext>
          </DndContext>
          <button onClick={() => { upd({ validated: true }); setTab("courses"); }} className={pill}>Valider le planning → liste de courses</button>
        </div>
      )}

      {tab === "courses" && (
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between"><p className="text-sm text-ink/70">Cochez au fur et à mesure de vos achats.</p>
            <button onClick={() => window.print()} className={`${pillO} no-print`}>Imprimer</button></div>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(shopping).map(([aisle, items]) => (
              <div key={aisle} className="rounded-2xl border border-line bg-white/60 p-5">
                <h3 className="mb-3 font-display text-xl font-light uppercase">{aisle}</h3>
                <ul className="space-y-2">
                  {items.map((i) => {
                    const done = s.checked.includes(i.key);
                    return (
                      <li key={i.key} className="flex items-start gap-3 text-sm">
                        <input type="checkbox" checked={done} className="mt-1 accent-black" onChange={() => upd({ checked: done ? s.checked.filter((x) => x !== i.key) : [...s.checked, i.key] })} />
                        <span className={done ? "text-ink/35 line-through" : ""}>{i.qty} {i.label}<span className="block text-[11px] text-ink/40">{i.from.join(", ")}</span></span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      {adding && <AddRecipe onClose={() => setAdding(false)} onChange={() => refresh((n) => n + 1)} />}
      {open && <RecipeModal r={open} onClose={() => setOpen(null)} />}
    </>
  );
}
