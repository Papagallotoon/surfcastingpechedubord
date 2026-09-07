import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { SITE } from "@/config/active";
import {
  CATEGORIES,
  EDITORIAL,
  HUBS,
  LATEST,
  LEAD,
  SECONDARY,
} from "@/content/editorial";

export const metadata: Metadata = {
  title: SITE.siteName,
  description: SITE.siteDescription,
};

const SECTION = "mx-auto max-w-[1200px] px-4 sm:px-7";
const RULE = "flex items-baseline justify-between gap-4 border-b border-brand-300 pb-3.5";
const HEADING = "m-0 font-condensed text-[clamp(22px,3vw,28px)] font-extrabold uppercase tracking-[0.03em] text-brand-950";

export default function HomePage() {
  return (
    <div className="pb-16">
      {/* Une : ouverture pleine largeur à gauche, trois brèves illustrées à droite */}
      <section className={`${SECTION} pt-[clamp(28px,5vw,52px)]`}>
        <div className="grid grid-cols-1 items-start gap-[clamp(24px,3vw,40px)] lg:grid-cols-2">
          <article className="min-w-0">
            {LEAD.image && (
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-brand-200 bg-white shadow-sm">
                <Image
                  src={LEAD.image}
                  alt={LEAD.imageAlt ?? ""}
                  fill
                  priority
                  sizes="(min-width: 1024px) 580px, 100vw"
                  className="object-contain p-3"
                />
              </div>
            )}
            <div className="mt-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-ops">
              <span
                className="px-2 py-1 text-white"
                style={{ backgroundColor: CATEGORIES[LEAD.category]!.color }}
              >
                {LEAD.kicker}
              </span>
              <span className="text-brand-500">{LEAD.meta}</span>
            </div>
            <h2 className="mt-3.5 font-condensed text-[clamp(30px,5.2vw,46px)] font-extrabold uppercase leading-[0.96] text-brand-950 [text-wrap:balance]">
              <Link href={LEAD.href} className="text-inherit hover:text-brand-600">
                {LEAD.title}
              </Link>
            </h2>
            <p className="mt-3.5 max-w-[58ch] font-serif text-[19px] leading-[1.6] text-brand-700">
              {LEAD.excerpt}
            </p>
          </article>

          <div className="flex min-w-0 flex-col gap-[22px]">
            {SECONDARY.map((article, index) => (
              <div key={article.title} className="flex flex-col gap-[22px]">
                {index > 0 && <div className="h-px bg-brand-200" />}
                <article className="grid grid-cols-[104px_1fr] items-start gap-4">
                  {article.image && (
                    <div className="relative aspect-square overflow-hidden rounded-lg border border-brand-200 bg-white shadow-sm">
                      <Image
                        src={article.image}
                        alt={article.imageAlt ?? ""}
                        fill
                        sizes="104px"
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div
                      className="font-mono text-[10px] uppercase tracking-ops"
                      style={{ color: CATEGORIES[article.category]!.color }}
                    >
                      {article.kicker}
                    </div>
                    <h3 className="mt-2 font-condensed text-[21px] font-bold uppercase leading-[1.06] text-brand-900">
                      <Link href={article.href} className="text-inherit hover:text-brand-600">
                        {article.title}
                      </Link>
                    </h3>
                    <p className="mt-1.5 font-serif text-[15px] leading-[1.55] text-brand-700">
                      {article.excerpt}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hubs : quatre piliers, filets portés par les cartes */}
      <section className={`${SECTION} pt-[clamp(40px,6vw,68px)]`}>
        <div className={RULE}>
          <h2 className={HEADING}>{EDITORIAL.hubsTitle}</h2>
          <span className="font-mono text-[10px] uppercase tracking-ops text-brand-500">
            {EDITORIAL.hubsLabel}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
          {HUBS.map((hub) => (
            <Link
              key={hub.title}
              href={hub.href}
              className="block bg-brand-100 px-[22px] pb-[26px] pt-5 text-inherit shadow-[0_0_0_1px_rgb(var(--brand-200))] hover:bg-brand-200/60"
              style={{ borderTop: `3px solid ${CATEGORIES[hub.category]!.color}` }}
            >
              <div
                className="font-mono text-[11px] tracking-ops"
                style={{ color: CATEGORIES[hub.category]!.color }}
              >
                {hub.index}
              </div>
              <h3
                className="mt-3 font-condensed text-[24px] font-bold uppercase"
                style={{ color: CATEGORIES[hub.category]!.color }}
              >
                {hub.title}
              </h3>
              <p className="mt-2 font-serif text-[15px] leading-[1.55] text-brand-700">
                {hub.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Derniers articles + colonne latérale (CTA quiz, emplacement display) */}
      <section className={`${SECTION} pt-[clamp(40px,6vw,68px)]`}>
        <div className="flex flex-wrap items-start gap-[clamp(28px,4vw,48px)]">
          <div className="min-w-0 flex-1 basis-[440px]">
            <div className={RULE}>
              <h2 className={HEADING}>{EDITORIAL.latestTitle}</h2>
              <Link
                href={EDITORIAL.latestAllHref}
                className="font-mono text-[10px] uppercase tracking-ops text-brand-600"
              >
                {EDITORIAL.latestAllLabel}
              </Link>
            </div>
            <div className="flex flex-col">
              {LATEST.map((article) => (
                <Link
                  key={article.number}
                  href={article.href}
                  className="grid grid-cols-[52px_1fr_auto] items-baseline gap-[18px] border-b border-brand-200 py-[18px] text-inherit hover:bg-brand-600/[0.07]"
                >
                  <span className="font-mono text-[11px] tracking-[0.16em] text-brand-500">
                    {article.number}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-condensed text-[20px] font-bold uppercase leading-[1.1] text-brand-900">
                      {article.title}
                    </span>
                    <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-brand-500">
                      {article.meta}
                    </span>
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-brand-500">
                    {article.date}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <aside className="flex min-w-0 shrink grow-0 basis-[320px] flex-col gap-5">
            <div className="border border-brand-600/30 bg-brand-600/[0.08] px-[22px] py-6">
              <div className="font-mono text-[10px] uppercase tracking-ops text-brand-600">
                {EDITORIAL.quizCard.eyebrow}
              </div>
              <h3 className="mt-3 font-condensed text-[26px] font-extrabold uppercase leading-[1.02] text-brand-950">
                {EDITORIAL.quizCard.title}
              </h3>
              <p className="mt-2.5 font-serif text-[15px] leading-[1.55] text-brand-700">
                {EDITORIAL.quizCard.body}
              </p>
              <Link
                href="/montages/montages-terminal-tackle-surfcasting"
                className="clip-bevel mt-4 flex min-h-[48px] items-center justify-center bg-brand-600 px-5 py-3.5 font-condensed text-[17px] font-extrabold uppercase tracking-[0.06em] text-white hover:bg-brand-600/85"
              >
                {EDITORIAL.quizCard.cta}
              </Link>
              <div className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-brand-500">
                {EDITORIAL.quizCard.note}
              </div>
            </div>

            {EDITORIAL.showAdSlots && (
              <div className="flex h-[250px] items-center justify-center border border-dashed border-brand-300 bg-brand-100 font-mono text-[10px] uppercase tracking-ops text-brand-400">
                Display slot
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
