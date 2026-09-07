import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, CATEGORY_ORDER, byCategory, type CategoryKey } from "@/content/articles";
import { ArticleRow } from "@/components/article/ArticleRow";

export function generateStaticParams() {
  return CATEGORY_ORDER.map((category) => ({ category }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = CATEGORIES[params.category];
  if (!category) return {};
  return {
    title: category.label,
    description: category.blurb,
  };
}

export default function CategoryHubPage({ params }: { params: { category: string } }) {
  const key = params.category as CategoryKey;
  const category = CATEGORIES[key];
  if (!category) notFound();

  const articles = byCategory(key);

  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-[clamp(28px,5vw,52px)] sm:px-7">
      <div className="font-mono text-[10px] uppercase tracking-ops text-brand-500">
        <Link href="/" className="text-brand-500 hover:text-brand-600">
          Accueil
        </Link>
        <span className="px-2 text-brand-400">/</span>
        {category.label}
      </div>

      <h1
        className="mt-4 font-condensed text-[clamp(38px,7vw,72px)] font-extrabold uppercase leading-[0.92]"
        style={{ color: category.color }}
      >
        {category.label}
      </h1>
      <p className="mt-4 max-w-[54ch] font-serif text-[clamp(19px,2.2vw,22px)] leading-[1.55] text-brand-700">
        {category.blurb}
      </p>

      <div className="mt-11 flex flex-col">
        {articles.length === 0 ? (
          <p className="font-serif text-[17px] text-brand-700">
            Aucun article publié dans cette rubrique pour l'instant.
          </p>
        ) : (
          articles.map((article) => <ArticleRow key={article.slug} article={article} />)
        )}
      </div>
    </div>
  );
}
