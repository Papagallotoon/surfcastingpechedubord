"use client";

import { useEffect, useState } from "react";

interface ScoreGaugeProps {
  score: number; // 0-100
}

/**
 * Index linéaire gradué plutôt qu'anneau : lu comme un instrument de mesure,
 * et la position relative aux seuils (40 / 70) devient lisible d'un coup d'œil.
 * Purement une visualisation du score déjà calculé — aucun chiffre inventé.
 */
export function ScoreGauge({ score }: ScoreGaugeProps) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setAnimated(score));
    return () => cancelAnimationFrame(raf);
  }, [score]);

  return (
    <div className="w-full max-w-[280px]">
      <div className="flex items-baseline gap-1.5">
        <span className="font-condensed text-[104px] font-extrabold leading-[0.85] text-brand-950 sm:text-[128px]">
          {score}
        </span>
        <span className="font-mono text-xs text-brand-500">/100</span>
      </div>

      <div className="relative mt-5 h-2 w-full bg-brand-200">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-600/50 to-brand-600 transition-[width] duration-[900ms] ease-out"
          style={{ width: `${animated}%` }}
        />
        {/* Seuils de profil — les mêmes que scoring.ts */}
        {[40, 70].map((mark) => (
          <span
            key={mark}
            aria-hidden
            className="absolute inset-y-0 w-px bg-brand-50"
            style={{ left: `${mark}%` }}
          />
        ))}
      </div>

      <div className="mt-2 flex justify-between font-mono text-[10px] tracking-wider text-brand-400">
        <span>0</span>
        <span>40</span>
        <span>70</span>
        <span>100</span>
      </div>
    </div>
  );
}
