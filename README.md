# Surfcasting Pêche du Bord (SPDB) — site

Troisième site du portfolio (après Marius Dumas Home et Sécurité Maison),
forké depuis `securitemaison-site` (lui-même forké du moteur multi-niches
`readyscore-affiliate-engine`). Une seule niche ici (`config/niches/surfcasting/`).

**Différence volontaire avec securitemaison-site : pas de quiz/évaluation.**
Ce site n'a pas de produit-funnel unique à recommander (contrairement à
l'Anti-Looter Kit Digistore24 de Sécurité Maison) — le modèle est un pur
comparatif affilié Amazon, 5 catégories, 25 produits réels vérifiés en
direct. Les routes `/quiz`, `/assessment`, `/result` existent encore (héritées
du moteur) mais ne sont plus liées nulle part dans l'interface — `config/niches/surfcasting/quiz.ts`
et `scoring.ts` contiennent encore le texte générique du moteur d'origine,
inutilisé. `products.ts` est vide (ne pas y remettre les données Digistore24
de Sécurité Maison, hors sujet).

Chaque article correspond à un sujet déjà publié — ou à publier — sur la
chaîne YouTube `@surfacsting` (mêmes produits Amazon, mêmes prix vérifiés) —
le but premier de ce site est d'avoir un lien à mettre en description de
chaque vidéo.

Stack : Next.js 14 (App Router), TypeScript, Tailwind. Aucune base de données,
aucun compte, aucun email.

## Lancer

```bash
npm install
cp .env.example .env.local
npm run dev
```

---

# Créer une niche en 20 minutes

Cinq fichiers à écrire, un fichier à modifier. **Aucune modification dans
`app/`, `components/` ou `lib/`** — si tu dois y toucher, c'est que le moteur
manque d'un champ de configuration : ajoute le champ dans `lib/types.ts` plutôt
que d'écrire le texte dans le composant.

Duplique `config/niches/securitemaison/` sous ton nouveau nom, puis remplis :

### 1. `site.ts` — tout ce qui est visible et n'est pas une question

La marque, la palette, le hero, les étiquettes de résultat, les mentions
légales. `lib/types.ts` documente chaque champ ; les obligatoires te seront
signalés par TypeScript.

Deux points qui décident du rendu :

- **`branding.colors`** — rampe 50→950. Pour un thème **clair**, rampe normale
  (50 clair, 950 foncé). Pour un thème **sombre**, rampe **inversée** :
  `brand-50` = fond de page sombre, `brand-950` = texte clair. Dans les deux cas
  `brand-600` est l'accent (CTA, jauge, sélection). C'est ce qui permet aux mêmes
  classes Tailwind de servir un thème clair et un thème sombre.
- **`branding.headingFont`** — `"sans-bold"` (titres capitales lourdes :
  sécurité, finance, performance) ou `"serif"` (éditorial, bien-être, maison).

### 2. `quiz.ts` — les questions

Une question par dimension. Chaque option attribue des points à **deux** clés :

```ts
scoreImpact: { score: 2, water_storage: 2 }
//             ^^^^^ réservé : alimente le total 0-100
//                      ^^^^^^^^^^^^^ la dimension, pour les forces/lacunes
```

Oublier `score` est l'erreur classique : la question ne compte alors pas dans le
total. `lib/validateNiche.ts` te le dira au premier `npm run dev`.

`icon` prend une clé du jeu générique de `components/ui/Icon.tsx` (`shield`,
`droplet`, `sun`, `wallet`…). `dimensionLabel` est le libellé court affiché
au-dessus de la question.

### 3. `scoring.ts` — dimensions et profils

- `maxRawScore` = nombre de questions × points max par question. Faux ici, et
  tous les scores sont faux.
- `dimensions[].strengthThreshold` = points à partir desquels la dimension
  compte comme une force (sinon c'est une lacune).
- `dimensions[].shortLabel` = étiquette d'axe du radar, **8 caractères max**.
- `profiles` doivent couvrir 0→100 **sans trou** et sans chevauchement.

### 4. `products.ts` — les produits affiliés

`recommendedFor` cite des ids de profils. Les champs `netRevenuePerSale`,
`commissionRate`, `checkoutConversion` et `refundRate` sont **internes** : ils
servent au classement des recommandations et ne sont jamais affichés.
`affiliateUrl` doit être le vrai lien avant d'acheter du trafic.

### 5. `content.ts` — angles de contenu court

Dix accroches + CTA pour tes vidéos. Pas rendu par le site : c'est ton plan de
production. Jamais « achète ça » en accroche — une idée utile, puis le test
gratuit en CTA.

### 6. `config/registry.ts` — déclarer la niche

Une ligne dans `NICHES`. Puis `NEXT_PUBLIC_NICHE=ta-niche npm run dev`.

---

## Le garde-fou

`lib/validateNiche.ts` valide la niche active au chargement et échoue **en
développement** avec le nom du champ fautif : dimension citée mais non déclarée,
question qui n'alimente pas `score`, profils qui ne couvrent pas 0–100, produit
qui cible un profil inexistant, lien affilié resté en placeholder. En production
il journalise et laisse le site debout — un visiteur ne voit jamais un écran
blanc pour une virgule.

## Structure

```
config/
  active.ts        résout la niche depuis NEXT_PUBLIC_NICHE — SEUL point
                   d'entrée importé par app/, components/ et lib/
  registry.ts      table des niches disponibles
  niches/<slug>/   site, quiz, scoring, products, content
lib/
  types.ts         le contrat de configuration
  scoring.ts       moteur pur : (questions, réponses, scoring) → résultat
  validateNiche.ts garde-fou
components/        UI, sans aucune référence à un sujet
app/               pages, sans aucune référence à un sujet
```

## Règles à ne pas casser

- Contrairement au moteur d'origine, `app/` et `components/` contiennent ici
  du texte français en dur par endroits (`content/assessment.ts` et son
  composant `components/assessment/Assessment.tsx`, les pages légales, la
  bibliothèque) — c'était le choix le plus rapide et le plus sûr pour un dépôt
  mono-niche mono-langue plutôt que de réintroduire le paramétrage complet.
  Si ce site devient un jour multilingue, migrer ce texte vers `site.ts`
  (le champ `locale` existe déjà) avant d'ajouter une deuxième langue.
- Ne renomme pas les classes `brand-*` : c'est le pont entre le thème et l'UI.
- Le mobile d'abord — 80 % du trafic. Cibles tactiles ≥ 44 px, CTA pleine
  largeur sous `sm`, CTA collant sur la page résultat.
- Les liens affiliés passent par `/go/[slug]` et la mention d'affiliation reste
  visible. Obligation légale, pas une option.
