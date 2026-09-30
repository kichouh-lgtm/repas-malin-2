import { allRecipes, type Src } from "./recipes";

const shuffle = <T,>(a: T[]) => {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
};
const pick = (sources: Src[], n: number, exclude: Set<string>) =>
  shuffle(allRecipes().filter((r) => sources.includes(r.source) && !exclude.has(r.id))).slice(0, n).map((r) => r.id);

export const generateWeek = (sources: Src[]) => pick(sources, 7, new Set());

/** Remplace uniquement `toReplace`; les recettes déjà présentes ou rejetées ne reviennent pas. */
export function replaceIds(ids: string[], toReplace: string[], sources: Src[], rejected: string[]) {
  const fresh = pick(sources, toReplace.length, new Set([...ids, ...rejected]));
  let k = 0;
  return ids.map((id) => (toReplace.includes(id) ? fresh[k++] ?? id : id));
}

/** Semaine cible : lundi de la semaine suivante à partir du vendredi, sinon lundi courant. */
export function targetWeek(now = new Date()) {
  const d = new Date(now); d.setHours(12, 0, 0, 0);
  const dow = d.getDay(); // 0 = dimanche
  const back = (dow + 6) % 7;
  d.setDate(d.getDate() - back + (dow === 0 || dow >= 5 ? 7 : 0));
  return d.toISOString().slice(0, 10);
}
