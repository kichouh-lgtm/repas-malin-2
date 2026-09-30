"use client";
import { useState } from "react";
import { store, CUSTOM_KEY, type Ing, type Recipe, type Src } from "@/lib/recipes";

const U = ["kg", "g", "ml", "cl", "dl", "l", "cs", "cc"];
/** "200 g de farine" | "2 oignons" | "sel" -> [nom, quantité, unité] */
export function parseIngredients(text: string): Ing[] {
  return text.split("\n").map((l) => l.trim()).filter(Boolean).map((l): Ing => {
    const m = l.match(/^(\d+(?:[.,]\d+)?)\s*(kg|g|ml|cl|dl|l|cs|cc)?\s+(?:de |d')?(.+)$/i);
    if (!m) return [l, null, null];
    return [m[3].trim(), parseFloat(m[1].replace(",", ".")), m[2] ? m[2].toLowerCase() : null];
  });
}

export default function AddRecipe({ onClose, onChange }: { onClose: () => void; onChange: () => void }) {
  const [f, setF] = useState({ title: "", source: "KOOKMUTJES" as Src, prep: "15", cook: "30", servings: "4", ing: "", steps: "" });
  const [, bump] = useState(0);
  const save = (list: Recipe[]) => { store.custom = list; localStorage.setItem(CUSTOM_KEY, JSON.stringify(list)); onChange(); bump((n) => n + 1); };
  const ok = f.title.trim() && f.ing.trim() && f.steps.trim();
  const submit = () => {
    save([...store.custom, {
      id: "u" + Date.now(), source: f.source, title: f.title.trim(), prep: +f.prep || 0, cook: +f.cook || 0, servings: +f.servings || 4,
      ing: parseIngredients(f.ing), steps: f.steps.split("\n").map((s) => s.trim().replace(/^\d+[.)]\s*/, "")).filter(Boolean),
    }]);
    setF({ ...f, title: "", ing: "", steps: "" });
  };
  const inp = "w-full rounded-xl border border-line bg-white/70 p-2.5 text-sm";
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4" onClick={onClose}>
      <div className="max-h-[92vh] w-full max-w-lg space-y-3 overflow-y-auto rounded-t-3xl bg-cream p-6 sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between"><h2 className="font-display text-3xl font-light uppercase">Mes recettes</h2><button onClick={onClose}>✕</button></div>
        <input className={inp} placeholder="Titre" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />
        <div className="flex gap-2">
          <select className={inp} value={f.source} onChange={(e) => setF({ ...f, source: e.target.value as Src })}>
            <option value="KOOKMUTJES">Classique</option><option value="COOKOMIX">Thermomix</option></select>
          {(["prep", "cook", "servings"] as const).map((k) => (
            <input key={k} className={inp} type="number" min={0} title={k} placeholder={{ prep: "Prép. min", cook: "Cuisson min", servings: "Portions" }[k]} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} />))}
        </div>
        <textarea className={inp} rows={5} placeholder={"Ingrédients (un par ligne)\n200 g de farine\n2 oignons\n25 cl de lait\nsel"} value={f.ing} onChange={(e) => setF({ ...f, ing: e.target.value })} />
        <textarea className={inp} rows={4} placeholder={"Étapes (une par ligne)"} value={f.steps} onChange={(e) => setF({ ...f, steps: e.target.value })} />
        <button disabled={!ok} onClick={submit} className="rounded-full bg-ink px-5 py-2.5 text-[11px] uppercase tracking-[0.14em] text-white disabled:opacity-30">Ajouter la recette</button>
        <p className="text-xs text-stone-500">Elle sera proposée lors des prochains tirages (« 🎲 Nouvelle semaine » ou 🔄).</p>
        {store.custom.length > 0 && (
          <ul className="divide-y border-t pt-2 text-sm">
            {store.custom.map((r) => (
              <li key={r.id} className="flex justify-between py-1.5"><span>{r.title}</span>
                <button className="text-red-600" onClick={() => save(store.custom.filter((x) => x.id !== r.id))}>Supprimer</button></li>))}
          </ul>)}
      </div>
    </div>
  );
}
