import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/config/active";
import { ARTICLES, CATEGORIES, CATEGORY_ORDER, byCategory } from "@/content/articles";
import { ArticleRow } from "@/components/article/ArticleRow";

export const metadata: Metadata = {
  title: "Tous les articles",
  description: `Tous les comparatifs ${SITE.siteName}, classés par couche de sécurité.`,
};

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-[clamp(28px,5vw,52px)] sm:px-7">
      <div className="font-mono text-[10px] uppercase tracking-ops text-brand-500">
        <Link href="/" className="text-brand-500 hover:text-brand-600">
          Accueil
        </Link>
        <span className="px-2 text-brand-400">/</span>
        Bibliothèque
      </div>

      <h1 className="mt-4 font-condensed text-[clamp(38px,7vw,72px)] font-extrabold uppercase leading-[0.92] text-brand-950">
        Tous les articles
      </h1>
      <p className="mt-4 max-w-[54ch] font-serif text-[clamp(19px,2.2vw,22px)] leading-[1.55] text-brand-700">
        {ARTICLES.length} articles publiés, classés par couche de sécurité. Chaque prix est vérifié
        directement sur Amazon.fr et mis à jour quand un produit change.
      </p>

      {CATEGORY_ORDER.map((key) => {
        const articles = byCategory(key);
        if (articles.length === 0) return null;
        return (
          <section key={key} className="mt-11">
            <div className="flex items-baseline justify-between gap-4 border-b border-brand-300 pb-3.5">
              <h2 className="m-0 font-condensed text-[clamp(22px,3vw,28px)] font-extrabold uppercase tracking-[0.03em] text-brand-950">
                {CATEGORIES[key]!.label}
              </h2>
              <Link href={`/${key}`} className="font-mono text-[10px] uppercase tracking-ops text-brand-600">
                Voir la rubrique →
              </Link>
            </div>
            <div className="flex flex-col">
              {articles.map((article) => (
                <ArticleRow key={article.slug} article={article} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
