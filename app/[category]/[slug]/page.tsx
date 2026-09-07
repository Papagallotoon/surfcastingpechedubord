import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARTICLES, CATEGORIES, getArticle, relatedArticles } from "@/content/articles";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ArticleBody } from "@/components/article/ArticleBody";
import { ArticleRow } from "@/components/article/ArticleRow";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ category: a.category, slug: a.slug }));
}

export function generateMetadata({ params }: { params: { category: string; slug: string } }): Metadata {
  const article = getArticle(params.slug);
  if (!article || article.category !== params.category) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : undefined,
    },
  };
}

export default function ArticlePage({ params }: { params: { category: string; slug: string } }) {
  const article = getArticle(params.slug);
  if (!article || article.category !== params.category) notFound();

  const related = relatedArticles(article);

  return (
    <article className="mx-auto max-w-[760px] px-4 pb-20 pt-[clamp(28px,5vw,52px)] sm:px-7">
      <ArticleHeader article={article} />
      <ArticleBody blocks={article.blocks} categoryColor={CATEGORIES[article.category]!.color} />

      {related.length > 0 && (
        <section className="mt-16 border-t border-brand-300 pt-8">
          <h2 className="m-0 font-condensed text-[clamp(22px,3vw,28px)] font-extrabold uppercase tracking-[0.03em] text-brand-950">
            À lire aussi
          </h2>
          <div className="mt-4 flex flex-col">
            {related.map((a) => (
              <ArticleRow key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
