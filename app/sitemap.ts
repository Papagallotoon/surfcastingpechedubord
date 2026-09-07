import type { MetadataRoute } from "next";
import { ARTICLES, CATEGORY_ORDER, articleHref } from "@/content/articles";

// Sitemap dérivé du registre : un article ajouté à content/articles.ts y entre
// sans intervention. NEXT_PUBLIC_SITE_URL sur Vercel, sinon le domaine par
// défaut.
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://surfcastingpechedubord.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: BASE, lastModified: now, priority: 1 },
    { url: `${BASE}/library`, lastModified: now, priority: 0.6 },
    ...CATEGORY_ORDER.map((key) => ({
      url: `${BASE}/${key}`,
      lastModified: now,
      priority: 0.7,
    })),
    ...ARTICLES.map((a) => ({
      url: `${BASE}${articleHref(a)}`,
      lastModified: now,
      priority: 0.8,
    })),
  ];
}
