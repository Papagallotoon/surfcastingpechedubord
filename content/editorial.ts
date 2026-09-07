// Mise en scène de la home Surfcasting Pêche du Bord. Le contenu vit dans
// content/articles.ts ; ce fichier ne fait que choisir quoi mettre en une et
// dans quel ordre.

import { ARTICLES, CATEGORIES, CATEGORY_ORDER, articleHref, getArticle } from "./articles";

export { CATEGORIES };
export type { Category } from "./articles";

/** Forme attendue par app/page.tsx. Conservée telle quelle. */
export type Article = {
  href: string;
  kicker: string;
  category: string;
  title: string;
  excerpt?: string;
  image?: string;
  imageAlt?: string;
  imageDark?: boolean;
  meta?: string;
  date?: string;
  number?: number;
};

function toCard(slug: string): Article {
  const a = getArticle(slug);
  if (!a) throw new Error(`Article introuvable dans le registre : ${slug}`);
  return {
    href: articleHref(a),
    kicker: a.kicker,
    category: a.category,
    title: a.title,
    excerpt: a.excerpt,
    image: a.image,
    imageAlt: a.imageAlt,
    imageDark: a.imageDark,
    meta: a.meta,
    date: a.date,
    number: a.number,
  };
}

export const LEAD: Article = toCard("meilleures-cannes-surfcasting");

export const SECONDARY: Article[] = [
  toCard("meilleurs-moulinets-surfcasting"),
  toCard("meilleurs-leurres-appats-peche-du-bord"),
  toCard("accessoires-indispensables-surfcasting"),
];

export type Hub = {
  href: string;
  index: string;
  category: string;
  title: string;
  description: string;
};

export const HUBS: Hub[] = CATEGORY_ORDER.map((key, i) => ({
  href: `/${key}`,
  index: String(i + 1).padStart(2, "0"),
  category: key,
  title: CATEGORIES[key]!.label,
  description: CATEGORIES[key]!.blurb,
}));

export const LATEST: Article[] = [...ARTICLES]
  .sort((a, b) => b.number - a.number)
  .map((a) => toCard(a.slug));

export const NAV = CATEGORY_ORDER.map((key) => ({
  label: CATEGORIES[key]!.label,
  href: `/${key}`,
}));

export const EDITORIAL = {
  topbarNote: "Sélection indépendante · Aucun sponsoring de marque",
  hubsTitle: "Par où commencer",
  hubsLabel: "Piliers du site",
  latestTitle: "Derniers articles",
  latestAllLabel: "Tous les articles →",
  latestAllHref: "/library",
  // Pas de quiz/évaluation sur ce site (contrairement au moteur d'origine
  // Sécurité Maison) : le modèle ici est purement comparatif, sans produit
  // unique à recommander. Ce bloc met plutôt en avant le guide montages,
  // souvent le premier besoin d'un pêcheur qui débute le surfcasting.
  quizCard: {
    eyebrow: "Pour bien démarrer",
    title: "Le petit matériel qu'on rachète le plus souvent",
    body: "Bas de ligne, émerillons, plombs, hameçons : notre comparatif terminal tackle pour reconstituer une boîte complète.",
    cta: "Voir le comparatif",
    note: "Produits vérifiés en direct sur Amazon.fr",
  },
  /** Emplacement display : laissé vide tant qu'aucune régie n'est branchée. */
  showAdSlots: false,
};
