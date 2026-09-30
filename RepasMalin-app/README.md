# RepasMalin

Next.js 15 + Tailwind 4 + dnd-kit. Aucune base de données : recettes dans `src/lib/recipes.ts`, planning sauvegardé dans le navigateur (localStorage).

## Lancer en local
    npm install && npm run dev      # http://localhost:3000

## Mettre en ligne (Vercel, gratuit)
1. Crée un dépôt GitHub et envoie-y ce dossier (ou glisse-le via github.com > "uploading an existing file").
2. Sur vercel.com : "Add New > Project" > choisis le dépôt > Deploy (aucun réglage à changer).
   Alternative sans GitHub : `npx vercel` dans ce dossier.

## Ajouter tes recettes
Édite `RECIPES` dans `src/lib/recipes.ts` (même format). Les recettes fournies sont des exemples.

## Mes recettes
Bouton « + Mes recettes » : saisis titre, temps, portions, ingrédients (un par ligne : `200 g de farine`, `2 oignons`, `sel`) et étapes. Stockées dans le navigateur.

## Images
Les 5 photos sont dans `public/img/` (linguine, pizza, burger, couscous, grill). Pour changer la photo d'une recette : `MAP` dans `src/lib/recipes.ts`.
