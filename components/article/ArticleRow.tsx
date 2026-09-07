import Link from "next/link";
import { CATEGORIES, articleHref, type ArticleMeta } from "@/content/articles";

// Ligne d'article réutilisée par les hubs, la bibliothèque et le pied
// d'article : numéro, titre, étiquette de catégorie, date.
export function ArticleRow({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={articleHref(article)}
      className="grid grid-cols-[52px_1fr_auto] items-baseline gap-[18px] border-b border-brand-200 py-[18px] text-inherit hover:bg-brand-600/[0.07]"
    >
      <span className="font-mono text-[11px] tracking-[0.16em] text-brand-500">
        {article.number}
      </span>
      <span className="min-w-0">
        <span className="block font-condensed text-[20px] font-bold uppercase leading-[1.1] text-brand-900">
          {article.title}
        </span>
        <span className="mt-1.5 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-500">
          <span style={{ color: CATEGORIES[article.category]!.color }}>
            {CATEGORIES[article.category]!.label}
          </span>
          <span>{article.meta}</span>
        </span>
      </span>
      <span className="font-mono text-[10px] tracking-[0.16em] text-brand-500">{article.date}</span>
    </Link>
  );
}
