"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  href: string;
  matchReason: string;
  /** Toujours fourni depuis SITE.resultCopy.productCtaLabel. */
  ctaLabel: string;
}

const AUTOPLAY_MS = 4200;

/** Fiche "dossier" : carrousel a gauche, specifications a droite. */
export function ProductCard({ product, href, matchReason, ctaLabel }: ProductCardProps) {
  // L'image principale ouvre toujours la serie ; les doublons sont ecartes.
  const gallery = Array.from(new Set([product.image, ...(product.images ?? [])])).filter(Boolean);

  const [index, setIndex] = useState(0);
  // Toute interaction manuelle arrete definitivement la rotation : reprendre
  // la main et voir la vue repartir toute seule est desagreable.
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    if (stopped || gallery.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % gallery.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [stopped, gallery.length]);

  function goTo(next: number) {
    setStopped(true);
    setIndex((next + gallery.length) % gallery.length);
  }

  return (
    <div className="flex flex-wrap border border-brand-600/20 bg-brand-100/70">
      <div className="flex min-w-0 flex-1 basis-[300px] flex-col border-white/[0.08] bg-brand-50 lg:border-r">
        <div className="relative min-h-[228px] flex-1 overflow-hidden">
          {gallery.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={i === 0 ? product.name : ""}
              className="absolute inset-0 h-full w-full object-contain p-5 transition-opacity duration-300 sm:p-6"
              style={{ opacity: i === index ? 1 : 0 }}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}

          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Image précédente"
                className="absolute left-2.5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-brand-600/40 bg-brand-50/70 font-mono text-brand-600 transition hover:border-brand-600 hover:bg-brand-600/15"
              >
                &#8249;
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Image suivante"
                className="absolute right-2.5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-brand-600/40 bg-brand-50/70 font-mono text-brand-600 transition hover:border-brand-600 hover:bg-brand-600/15"
              >
                &#8250;
              </button>

              <div className="absolute inset-x-0 bottom-1.5 flex justify-center gap-1">
                {gallery.map((src, i) => (
                  <button
                    key={`dot-${src}`}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to image ${i + 1}`}
                    className="flex h-11 w-9 items-center justify-center"
                  >
                    <span
                      aria-hidden
                      className={`block h-[3px] w-full ${i === index ? "bg-brand-600" : "bg-brand-950/25"}`}
                    />
                  </button>
                ))}
              </div>

              <div className="absolute right-3 top-3 font-mono text-[10px] tracking-wider text-brand-400">
                {String(index + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
              </div>
            </>
          )}
        </div>

        {gallery.length > 1 && (
          <div
            className="grid gap-px border-t border-white/[0.08] bg-white/[0.08]"
            style={{ gridTemplateColumns: `repeat(${gallery.length}, minmax(0, 1fr))` }}
          >
            {gallery.map((src, i) => (
              <button
                key={`thumb-${src}`}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`View image ${i + 1}`}
                className={`box-border aspect-square w-full min-w-0 bg-brand-50 p-0 ${
                  i === index ? "border border-brand-600" : "border border-transparent"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-contain p-1.5 transition-opacity"
                  style={{ opacity: i === index ? 1 : 0.5 }}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 basis-[330px] p-5 sm:p-8">
        <div className="font-mono text-[11px] uppercase tracking-ops text-brand-600">
          {product.category.replace(/-/g, " ")}
        </div>
        <h3 className="mt-2.5 font-condensed text-[28px] font-extrabold uppercase leading-[1.02] text-brand-950 sm:text-4xl">
          {product.name}
        </h3>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-700">
          {product.shortDescription}
        </p>

        <ul className="mt-5 flex flex-col gap-3">
          {product.advantages.slice(0, 3).map((adv, i) => (
            <li key={adv} className="flex gap-3 text-[15px] leading-relaxed text-brand-800">
              <span aria-hidden className="pt-0.5 font-mono text-[11px] text-brand-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              {adv}
            </li>
          ))}
        </ul>

        <p className="mt-5 border-l-2 border-brand-600 bg-brand-600/[0.07] px-[18px] py-3.5 text-[15px] leading-relaxed text-brand-800">
          {matchReason}
        </p>

        <a
          href={href}
          className="clip-bevel mt-6 inline-flex w-full items-center justify-center bg-brand-600 px-8 py-4 font-condensed text-lg font-extrabold uppercase tracking-wider text-brand-50 transition hover:bg-brand-600/85 sm:w-auto"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}
