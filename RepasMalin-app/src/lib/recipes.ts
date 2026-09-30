// Recettes d'EXEMPLE écrites pour la démo (pas issues de Kookmutjes/Cookomix).
// Remplace/complète ce tableau par tes propres recettes (même format).
export type Src = "KOOKMUTJES" | "COOKOMIX";
export type Ing = [name: string, qty: number | null, unit: string | null];
export type Recipe = { id: string; source: Src; title: string; prep: number; cook: number; servings: number; ing: Ing[]; steps: string[] };

export const SOURCES: { id: Src; label: string }[] = [
  { id: "KOOKMUTJES", label: "Kookmutjes (classique)" },
  { id: "COOKOMIX", label: "Cookomix (Thermomix)" },
];

const K = "KOOKMUTJES" as const, C = "COOKOMIX" as const;
export const RECIPES: Recipe[] = [
  { id: "k1", source: K, title: "Poulet rôti aux carottes", prep: 15, cook: 60, servings: 4,
    ing: [["poulet", 1, null], ["carottes", 600, "g"], ["oignon", 2, null], ["huile d'olive", 2, "cs"], ["sel", null, null]],
    steps: ["Préchauffer le four à 200 °C.", "Disposer légumes et poulet dans un plat, huiler et saler.", "Enfourner 1 h en arrosant à mi-cuisson."] },
  { id: "k2", source: K, title: "Spaghetti bolognaise", prep: 15, cook: 40, servings: 4,
    ing: [["spaghetti", 400, "g"], ["boeuf haché", 400, "g"], ["oignon", 1, null], ["tomates concassées", 400, "g"], ["ail", 2, null]],
    steps: ["Faire revenir oignon et ail.", "Ajouter la viande puis les tomates, mijoter 30 min.", "Cuire les pâtes et servir."] },
  { id: "k3", source: K, title: "Stoemp aux saucisses", prep: 20, cook: 30, servings: 4,
    ing: [["pommes de terre", 1, "kg"], ["carottes", 400, "g"], ["poireau", 2, null], ["saucisses", 4, null], ["beurre", 50, "g"], ["lait", 10, "cl"]],
    steps: ["Cuire les légumes à l'eau.", "Écraser avec beurre et lait.", "Poêler les saucisses et servir."] },
  { id: "k4", source: K, title: "Gratin de chicons au jambon", prep: 20, cook: 35, servings: 4,
    ing: [["endives", 8, null], ["jambon", 8, "tranches"], ["beurre", 40, "g"], ["farine", 40, "g"], ["lait", 50, "cl"], ["fromage râpé", 150, "g"]],
    steps: ["Cuire les endives à la vapeur.", "Les rouler dans le jambon.", "Napper de béchamel et de fromage, gratiner 25 min à 200 °C."] },
  { id: "k5", source: K, title: "Saumon et riz au citron", prep: 10, cook: 20, servings: 4,
    ing: [["pavés de saumon", 4, null], ["riz", 300, "g"], ["citron", 1, null], ["huile d'olive", 1, "cs"]],
    steps: ["Cuire le riz.", "Poêler le saumon 4 min par face.", "Servir avec le citron."] },
  { id: "k6", source: K, title: "Omelette aux champignons", prep: 10, cook: 10, servings: 2,
    ing: [["oeufs", 6, null], ["champignons", 250, "g"], ["beurre", 20, "g"], ["persil", null, null]],
    steps: ["Faire sauter les champignons.", "Verser les œufs battus.", "Plier et servir avec du persil."] },
  { id: "k7", source: K, title: "Soupe de courgettes", prep: 10, cook: 25, servings: 4,
    ing: [["courgettes", 800, "g"], ["pommes de terre", 200, "g"], ["oignon", 1, null], ["bouillon de légumes", 75, "cl"], ["crème", 10, "cl"]],
    steps: ["Faire revenir l'oignon.", "Ajouter légumes et bouillon, cuire 20 min.", "Mixer avec la crème."] },
  { id: "c1", source: C, title: "Risotto aux champignons", prep: 10, cook: 25, servings: 4,
    ing: [["riz rond", 300, "g"], ["champignons", 250, "g"], ["oignon", 1, null], ["bouillon de légumes", 90, "cl"], ["parmesan", 60, "g"], ["beurre", 30, "g"]],
    steps: ["Hacher l'oignon 5 s/vit 5.", "Rissoler beurre 3 min/120 °C, ajouter riz et champignons.", "Bouillon, 16 min/100 °C/sens inverse/vit 1, puis parmesan."] },
  { id: "c2", source: C, title: "Velouté de carottes", prep: 10, cook: 25, servings: 4,
    ing: [["carottes", 700, "g"], ["pommes de terre", 200, "g"], ["oignon", 1, null], ["bouillon de légumes", 75, "cl"], ["crème", 10, "cl"]],
    steps: ["Hacher l'oignon 5 s/vit 5.", "Ajouter le reste, cuire 25 min/100 °C/vit 1.", "Mixer 1 min progressif vit 5 à 10."] },
  { id: "c3", source: C, title: "Sauce bolognaise & pâtes", prep: 10, cook: 35, servings: 4,
    ing: [["boeuf haché", 400, "g"], ["oignon", 1, null], ["carottes", 1, null], ["tomates concassées", 400, "g"], ["spaghetti", 400, "g"]],
    steps: ["Hacher les légumes 5 s/vit 5.", "Ajouter la viande, 5 min/120 °C, puis les tomates.", "Cuire 30 min/100 °C, servir sur les pâtes."] },
  { id: "c4", source: C, title: "Pain de viande", prep: 15, cook: 45, servings: 4,
    ing: [["boeuf haché", 500, "g"], ["oignon", 1, null], ["chapelure", 50, "g"], ["oeufs", 1, null], ["ail", 1, null]],
    steps: ["Hacher oignon et ail.", "Ajouter viande, œuf et chapelure, pétrir 30 s.", "Cuire au four 45 min à 180 °C."] },
  { id: "c5", source: C, title: "Purée express", prep: 10, cook: 25, servings: 4,
    ing: [["pommes de terre", 1, "kg"], ["lait", 20, "cl"], ["beurre", 50, "g"], ["sel", null, null]],
    steps: ["Cuire les pommes de terre au Varoma.", "Mettre dans le bol avec lait et beurre.", "Mixer 20 s/sens inverse/vit 3."] },
  { id: "c6", source: C, title: "Quiche lorraine", prep: 15, cook: 40, servings: 6,
    ing: [["farine", 250, "g"], ["beurre", 125, "g"], ["lardons", 200, "g"], ["oeufs", 3, null], ["crème", 20, "cl"], ["lait", 10, "cl"]],
    steps: ["Pâte : farine, beurre, eau, 30 s/vit 6.", "Garnir de lardons.", "Mixer œufs, crème et lait, verser, cuire 40 min à 180 °C."] },
  { id: "c7", source: C, title: "Riz cantonais", prep: 10, cook: 20, servings: 4,
    ing: [["riz", 300, "g"], ["oeufs", 3, null], ["jambon", 4, "tranches"], ["petits pois surgelés", 150, "g"], ["huile", 1, "cs"]],
    steps: ["Cuire le riz au panier.", "Faire des œufs brouillés dans le bol.", "Mélanger avec jambon et petits pois."] },
];

// Recettes ajoutées par l'utilisateur (chargées depuis le navigateur)
export const store = { custom: [] as Recipe[] };
export const CUSTOM_KEY = "repasmalin.custom";
export const allRecipes = () => [...RECIPES, ...store.custom];

// Photos
const PHOTOS = ["linguine", "pizza", "burger", "couscous", "grill"];
const MAP: Record<string, string> = { k1: "couscous", k2: "linguine", k3: "grill", k4: "pizza", k5: "grill", k6: "pizza", k7: "couscous", c1: "linguine", c2: "couscous", c3: "linguine", c4: "burger", c5: "couscous", c6: "pizza", c7: "grill" };
export const imgOf = (r: { id: string }) =>
  `/img/${MAP[r.id] ?? PHOTOS[[...r.id].reduce((a, c) => a + c.charCodeAt(0), 0) % PHOTOS.length]}.jpg`;
