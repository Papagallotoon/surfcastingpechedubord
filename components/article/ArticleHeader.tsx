import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, type ArticleMeta } from "@/content/articles";

const KIND_LABEL: Record<ArticleMeta["kind"], string> = {
  comparison: "Comparatif",
  guide: "Guide",
  duel: "Face à face",
  checklist: "Checklist",
};

// Entête d'article : fil d'Ariane, titre, chapeau, bande de chiffres clés, puis
// la prise en pleine largeur. Les chiffres clés donnent l'échelle du test avant
// que le lecteur n'entre dans le corps.
export function ArticleHeader({ article }: { article: ArticleMeta }) {
  const category = CATEGORIES[article.category]!;

  return (
    <header>
      <div className="flex flex-wrap items-center gap-2.5 font-mono text-[10px] uppercase tracking-ops text-brand-500">
        <Link href={`/${article.category}`} style={{ color: category.color }}>
          {category.label}
        </Link>
        <span className="text-brand-400">/</span>
        <span>{KIND_LABEL[article.kind]}</span>
        <span className="text-brand-400">/</span>
        <span>{article.updated}</span>
      </div>

      <h1 className="mt-4 max-w-[24ch] font-condensed text-[clamp(34px,6vw,60px)] font-extrabold uppercase leading-[0.95] text-brand-950 [text-wrap:balance]">
        {article.title}
      </h1>

      <p className="mt-5 max-w-[58ch] font-serif text-[clamp(19px,2.2vw,22px)] leading-[1.55] text-brand-700">
        {article.standfirst}
      </p>

      <div className="mt-7 grid grid-cols-1 gap-px border-y border-brand-300 py-px sm:grid-cols-3">
        {article.facts.map((fact) => (
          <div key={fact.label} className="bg-brand-100/70 px-4 py-4">
            <div className="font-condensed text-[30px] font-extrabold uppercase leading-none text-brand-950">
              {fact.value}
            </div>
            <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-500">
              {fact.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-500">
        <span>{article.readingTime}</span>
        <span>N° {article.number}</span>
        {article.kind === "comparison" && <span>Liens d'affiliation · prix vérifiés sur Amazon.fr</span>}
      </div>

      {article.youtubeUrl && (
        <a
          href={article.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex min-h-[48px] w-fit items-center gap-2.5 border px-5 py-3 font-mono text-[11px] uppercase tracking-ops text-white hover:opacity-85"
          style={{ backgroundColor: category.color }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M21.582 6.186a2.75 2.75 0 0 0-1.936-1.945C17.9 3.75 12 3.75 12 3.75s-5.9 0-7.646.491a2.75 2.75 0 0 0-1.936 1.945A28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .418 5.814 2.75 2.75 0 0 0 1.936 1.945C6.1 20.25 12 20.25 12 20.25s5.9 0 7.646-.491a2.75 2.75 0 0 0 1.936-1.945A28.6 28.6 0 0 0 22 12a28.6 28.6 0 0 0-.418-5.814ZM9.75 15.5v-7l6 3.5-6 3.5Z" />
          </svg>
          Voir le Short YouTube
        </a>
      )}

      {article.image && (
        <div className="relative mt-7 aspect-[16/9] w-full overflow-hidden rounded-xl border border-brand-200 bg-white shadow-sm">
          <Image
            src={article.image}
            alt={article.imageAlt ?? ""}
            fill
            priority
            sizes="(min-width: 1024px) 760px, 100vw"
            className="object-contain p-3"
          />
        </div>
      )}
    </header>
  );
}
