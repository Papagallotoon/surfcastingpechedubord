import Image from "next/image";
import Link from "next/link";
import { TONE, type Block } from "@/content/articles";
import { Bars } from "@/components/charts/Bars";
import { Scatter } from "@/components/charts/Scatter";
import { Split } from "@/components/charts/Split";
import { resolveVideoEmbed } from "@/lib/video";

// Rend le corps d'un article depuis la liste de blocs typés du registre.
// Les figures sont numérotées automatiquement dans l'ordre d'apparition, comme
// dans une publication imprimée.

const PROSE = "mt-6 max-w-[68ch] font-serif text-[19px] leading-[1.72] text-brand-800";
const H2 =
  "mt-14 border-b-2 pb-3.5 font-condensed text-[clamp(24px,3.4vw,32px)] font-extrabold uppercase tracking-[0.02em] text-brand-950";

function figureLabel(i: number) {
  return `Fig. ${String.fromCharCode(64 + i)}`;
}

// La couleur de catégorie de l'article (passée par ArticleHeader/la page)
// accentue les titres, le prix et le liseré des fiches produit — c'est ce
// qui rend chaque rubrique visuellement reconnaissable, plutôt que le
// turquoise générique partout.
export function ArticleBody({ blocks, categoryColor }: { blocks: Block[]; categoryColor: string }) {
  let figures = 0;

  return (
    <div>
      {blocks.map((block, i) => {
        switch (block.k) {
          case "p":
            return (
              <p key={i} className={PROSE}>
                {block.text}
              </p>
            );

          case "h2":
            return (
              <h2 key={i} className={H2} style={{ borderColor: categoryColor }}>
                {block.text}
              </h2>
            );

          case "bars":
            figures += 1;
            return (
              <Bars
                key={i}
                index={figureLabel(figures)}
                title={block.title}
                note={block.note}
                items={block.items}
                max={block.max}
              />
            );

          case "scatter":
            figures += 1;
            return (
              <Scatter
                key={i}
                index={figureLabel(figures)}
                title={block.title}
                note={block.note}
                points={block.points}
                xTicks={block.xTicks}
                xMin={block.xMin}
                xMax={block.xMax}
                yMin={block.yMin}
                yMax={block.yMax}
                yTicks={block.yTicks}
                trend={block.trend}
              />
            );

          case "split":
            figures += 1;
            return (
              <Split
                key={i}
                index={figureLabel(figures)}
                title={block.title}
                note={block.note}
                left={block.left}
                right={block.right}
              />
            );

          case "table":
            return (
              <div key={i} className="my-8 overflow-x-auto border border-brand-300 bg-brand-100">
                {block.title && (
                  <div className="border-b border-brand-200 px-[18px] py-3.5 font-mono text-[10px] uppercase tracking-ops text-brand-500">
                    {block.title}
                  </div>
                )}
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr>
                      {block.columns.map((c, ci) => (
                        <th
                          key={c}
                          className={`border-b border-brand-300 px-[14px] py-3 font-mono text-[10px] font-normal uppercase tracking-[0.16em] text-brand-500 ${
                            ci === 0 ? "" : "whitespace-nowrap"
                          }`}
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row) => (
                      <tr key={row.cells[0]}>
                        {row.cells.map((cell, ci) => (
                          <td
                            key={ci}
                            className={`border-b border-brand-200 px-[14px] py-[13px] ${
                              ci === 0
                                ? "font-condensed text-[18px] font-bold uppercase text-brand-900"
                                : ci === row.cells.length - 1
                                  ? "font-mono text-[13px]"
                                  : "font-sans text-[15px] text-brand-800"
                            }`}
                            style={
                              ci === row.cells.length - 1 && row.tone
                                ? { color: TONE[row.tone] }
                                : undefined
                            }
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "pick":
            return (
              <div
                key={i}
                className="my-6 bg-brand-100 p-[26px] shadow-[0_0_0_1px_rgb(var(--brand-300))]"
                style={{ borderLeft: `4px solid ${categoryColor}` }}
              >
                <div className="flex flex-wrap items-baseline gap-3.5">
                  <span
                    className="font-mono text-[26px] leading-none"
                    style={{ color: TONE[block.tone] }}
                  >
                    {block.rank}
                  </span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-ops"
                    style={{ color: TONE[block.tone] }}
                  >
                    {block.badge}
                  </span>
                </div>
                <div className="mt-3.5 grid grid-cols-1 gap-5 sm:grid-cols-[1fr_150px]">
                  <div className="min-w-0">
                    <h3 className="font-condensed text-[27px] font-extrabold uppercase leading-[1.04] text-brand-950">
                      {block.name}
                    </h3>
                    <p className="mt-2.5 max-w-[60ch] font-serif text-[17px] leading-[1.62] text-brand-800">
                      {block.verdict}
                    </p>
                  </div>
                  {block.image && (
                    <div className="relative order-first aspect-square w-full overflow-hidden rounded-lg border border-brand-200 bg-white shadow-sm sm:order-none">
                      <Image
                        src={block.image}
                        alt={block.imageAlt ?? block.name}
                        fill
                        sizes="150px"
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                </div>
                <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2 border-t border-brand-200 pt-4 sm:grid-cols-2">
                  <ul className="m-0 list-none p-0">
                    {block.pros.map((p) => (
                      <li
                        key={p}
                        className="grid grid-cols-[16px_1fr] gap-2.5 py-1 font-sans text-[15px] leading-[1.45] text-brand-800"
                      >
                        <span className="font-mono text-[13px] text-brand-600">+</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <ul className="m-0 list-none p-0">
                    {block.cons.map((c) => (
                      <li
                        key={c}
                        className="grid grid-cols-[16px_1fr] gap-2.5 py-1 font-sans text-[15px] leading-[1.45] text-brand-700"
                      >
                        <span className="font-mono text-[13px] text-brand-400">−</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-brand-200 pt-4">
                  <span
                    className="font-condensed text-[30px] font-extrabold uppercase"
                    style={{ color: categoryColor }}
                  >
                    {block.price}
                  </span>
                  <a
                    href={block.href}
                    rel="nofollow sponsored"
                    className="flex min-h-[46px] items-center text-white px-[18px] py-3 font-mono text-[10px] uppercase tracking-ops hover:opacity-85"
                    style={{ backgroundColor: categoryColor }}
                  >
                    Voir le prix
                  </a>
                </div>
              </div>
            );

          case "callout":
            return (
              <aside key={i} className="my-8 border-y border-brand-600/40 bg-brand-600/[0.07] px-[22px] py-6">
                <div className="font-mono text-[10px] uppercase tracking-ops text-brand-600">
                  {block.title}
                </div>
                <p className="mt-2.5 max-w-[62ch] font-serif text-[18px] leading-[1.62] text-brand-900">
                  {block.text}
                </p>
              </aside>
            );

          case "steps":
            return (
              <div key={i} className="my-8">
                {block.title && (
                  <div className="border-b border-brand-300 pb-3 font-mono text-[10px] uppercase tracking-ops text-brand-500">
                    {block.title}
                  </div>
                )}
                <ol className="m-0 flex list-none flex-col p-0">
                  {block.items.map((step, si) => (
                    <li
                      key={step.title}
                      className="grid grid-cols-[40px_1fr] gap-4 border-b border-brand-200 py-5"
                    >
                      <span className="font-mono text-[13px] tracking-[0.14em] text-brand-600">
                        {String(si + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-condensed text-[21px] font-bold uppercase leading-[1.08] text-brand-950">
                          {step.title}
                        </span>
                        <span className="mt-2 block max-w-[62ch] font-serif text-[17px] leading-[1.62] text-brand-800">
                          {step.text}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            );

          case "quiz":
            return (
              <div
                key={i}
                className="my-9 flex flex-wrap items-center justify-between gap-5 border border-brand-600/30 bg-brand-600/[0.08] px-[22px] py-6"
              >
                <div className="min-w-0 flex-1 basis-[280px]">
                  <div className="font-mono text-[10px] uppercase tracking-ops text-brand-600">
                    Testez votre équipement
                  </div>
                  <h3 className="mt-2.5 font-condensed text-[25px] font-extrabold uppercase leading-[1.04] text-brand-950">
                    {block.title}
                  </h3>
                  <p className="mt-2 max-w-[52ch] font-serif text-[16px] leading-[1.55] text-brand-800">
                    {block.text}
                  </p>
                </div>
                <Link
                  href="/assessment"
                  className="clip-bevel flex min-h-[48px] items-center bg-brand-600 px-6 py-3.5 font-condensed text-[17px] font-extrabold uppercase tracking-[0.06em] text-white hover:bg-brand-600/85"
                >
                  Faire le test
                </Link>
              </div>
            );

          case "method":
            return (
              <ul key={i} className="m-0 my-6 list-none p-0">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="grid max-w-[68ch] grid-cols-[22px_1fr] gap-2.5 border-b border-brand-200 py-3.5 font-serif text-[17px] leading-[1.6] text-brand-800"
                  >
                    <span className="font-mono text-[12px] text-brand-500">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "video": {
            const video = resolveVideoEmbed(block.url);
            if (!video) return null;
            return (
              <figure key={i} className="my-9">
                <div className="aspect-video w-full overflow-hidden border border-brand-200 bg-black">
                  {video.kind === "iframe" ? (
                    <iframe
                      src={video.src}
                      title={block.caption}
                      className="h-full w-full"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video src={video.src} controls className="h-full w-full" preload="metadata" />
                  )}
                </div>
                <figcaption className="mt-2.5 font-mono text-[10px] uppercase tracking-ops text-brand-500">
                  {block.caption}
                </figcaption>
              </figure>
            );
          }
        }
      })}
    </div>
  );
}
