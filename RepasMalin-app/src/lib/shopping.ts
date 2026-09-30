import type { Recipe } from "./recipes";

const AISLES: Record<string, string[]> = {
  "🥕 Fruits & légumes": ["carotte", "oignon", "ail", "tomate", "pomme de terre", "courgette", "poireau", "citron", "champignon", "endive", "persil"],
  "🥩 Viandes & poissons": ["poulet", "boeuf", "saucisse", "lardon", "saumon", "jambon"],
  "🧀 Crèmerie": ["lait", "creme", "beurre", "fromage", "oeuf", "parmesan"],
  "🍝 Épicerie": ["farine", "riz", "spaghetti", "huile", "sel", "bouillon", "concass", "chapelure"],
  "🧊 Surgelés": ["surgel"],
};
const aisleOf = (n: string) => Object.entries(AISLES).find(([, k]) => k.some((w) => n.includes(w)))?.[0] ?? "🛒 Divers";

type Base = "g" | "ml" | "pce";
const U: Record<string, [Base, number]> = {
  g: ["g", 1], kg: ["g", 1000], ml: ["ml", 1], cl: ["ml", 10], dl: ["ml", 100], l: ["ml", 1000], cs: ["ml", 15], cc: ["ml", 5],
};
const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\b(\w{3,})s\b/g, "$1").trim();

function fmt(q: number, b: Base) {
  const r1 = (n: number) => Math.round(n * 10) / 10;
  if (b === "g") return q >= 1000 ? `${r1(q / 1000)} kg` : `${Math.round(q)} g`;
  if (b === "ml") return q >= 1000 ? `${r1(q / 1000)} l` : `${Math.round(q)} ml`;
  return `${Math.ceil(q)}`;
}

export type Item = { key: string; label: string; qty: string; from: string[] };
export function buildShoppingList(recipes: Recipe[]): Record<string, Item[]> {
  const acc = new Map<string, { name: string; q: number | null; b: Base; from: Set<string> }>();
  for (const r of recipes)
    for (const [name, qty, unit] of r.ing) {
      const n = norm(name);
      const [q, b]: [number | null, Base] = qty == null ? [null, "pce"] : U[unit ?? ""] ? [qty * U[unit!][1], U[unit!][0]] : [qty, "pce"];
      const k = `${n}|${b}`;
      const cur = acc.get(k) ?? { name, q: null, b, from: new Set<string>() };
      if (q != null) cur.q = (cur.q ?? 0) + q;
      cur.from.add(r.title);
      acc.set(k, cur);
    }
  const out: Record<string, Item[]> = {};
  for (const [key, v] of acc) (out[aisleOf(norm(v.name))] ??= []).push({ key, label: v.name, qty: v.q == null ? "" : fmt(v.q, v.b), from: [...v.from] });
  for (const a in out) out[a].sort((x, y) => x.label.localeCompare(y.label, "fr"));
  return out;
}
