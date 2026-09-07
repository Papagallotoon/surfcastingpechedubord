"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { QUESTIONS, PRODUCTS, SCORING, SITE } from "@/config/active";
import type { Answers, QuizResult } from "@/lib/types";
import { computeResult, buildMatchReason } from "@/lib/scoring";
import { track } from "@/lib/analytics";
import { readUtmParams } from "@/lib/utm";
import { QUIZ_ANSWERS_STORAGE_KEY } from "@/components/quiz/QuizFlow";
import { ScoreDisplay } from "@/components/result/ScoreDisplay";
import { StrengthsGaps } from "@/components/result/StrengthsGaps";
import { ReadinessRadar } from "@/components/result/ReadinessRadar";
import { ProductCard } from "@/components/result/ProductCard";
import { FurtherTests } from "@/components/result/FurtherTests";
import { ProductVideo } from "@/components/result/ProductVideo";

export default function ResultPage() {
  const [result, setResult] = useState<QuizResult | null | undefined>(undefined);
  const [goParams, setGoParams] = useState("");

  useEffect(() => {
    let answers: Answers | null = null;
    try {
      const raw = sessionStorage.getItem(QUIZ_ANSWERS_STORAGE_KEY);
      answers = raw ? (JSON.parse(raw) as Answers) : null;
    } catch {
      answers = null;
    }

    if (!answers || Object.keys(answers).length === 0) {
      setResult(null);
      return;
    }

    const computed = computeResult(QUESTIONS, answers, SCORING, PRODUCTS);
    setResult(computed);

    const utm = readUtmParams(new URLSearchParams(window.location.search));
    const params = new URLSearchParams({
      profile: computed.profile.id,
      score: String(computed.score),
      ...utm,
    });
    setGoParams(params.toString());

    track("result_view", {
      profile: computed.profile.id,
      result_score: computed.score,
    });
  }, []);

  const matchReason = useMemo(() => {
    if (!result) return "";
    return buildMatchReason(
      result,
      SITE.resultCopy.matchReasonTemplate,
      SITE.resultCopy.matchReasonFallback
    );
  }, [result]);

  const primaryHref = useMemo(() => {
    if (!result || result.recommendations.length === 0) return null;
    const slug = result.recommendations[0]!.slug;
    return `/go/${slug}${goParams ? `?${goParams}` : ""}`;
  }, [result, goParams]);

  const primaryProduct = result?.recommendations[0] ?? null;

  if (result === undefined) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center font-mono text-[11px] uppercase tracking-ops text-brand-500">
        Calcul de votre indice…
      </div>
    );
  }

  if (result === null) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="text-brand-700">Aucune évaluation enregistrée pour cette session.</p>
        <Link
          href="/quiz"
          className="clip-bevel mt-6 inline-flex items-center justify-center bg-brand-600 px-8 py-4 font-condensed text-lg font-extrabold uppercase tracking-wider text-brand-50"
        >
          {SITE.hero.ctaLabel}
        </Link>
      </div>
    );
  }

  const hasRecommendations = result.recommendations.length > 0;

  return (
    <div className={`mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 ${hasRecommendations ? "pb-28 sm:pb-20" : ""}`}>
      <ScoreDisplay
        scoreLabel={SITE.resultCopy.scoreLabel}
        score={result.score}
        profile={result.profile}
      />

      <ReadinessRadar
        title={SITE.resultCopy.mapTitle}
        strengths={result.strengths}
        gaps={result.gaps}
      />

      <StrengthsGaps
        strengthsTitle={SITE.resultCopy.strengthsTitle}
        gapsTitle={SITE.resultCopy.gapsTitle}
        strengths={result.strengths}
        gaps={result.gaps}
      />

      {primaryProduct?.videoUrl && (
        <div className="mt-10">
          <ProductVideo videoUrl={primaryProduct.videoUrl} productName={primaryProduct.name} />
        </div>
      )}

      {hasRecommendations && (
        <div className="mt-11">
          <h2 className="border-b border-white/[0.09] pb-4 font-mono text-[11px] uppercase tracking-ops text-brand-500">
            {SITE.resultCopy.recommendationTitle}
          </h2>
          <div className="mt-5 flex flex-col gap-5">
            {result.recommendations.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                matchReason={matchReason}
                ctaLabel={SITE.resultCopy.productCtaLabel}
                href={`/go/${product.slug}${goParams ? `?${goParams}` : ""}`}
              />
            ))}
          </div>
        </div>
      )}

      <FurtherTests />

      <div className="mt-9">
        <Link
          href="/quiz"
          className="font-mono text-[11px] uppercase tracking-ops text-brand-500 hover:text-brand-600"
        >
          {SITE.resultCopy.rerunLabel}
        </Link>
      </div>

      {/* CTA collant mobile : la recommandation reste à un tap, sans devoir
          remonter au-dessus du score et des lacunes. */}
      {hasRecommendations && primaryHref && (
        <div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-600/25 bg-brand-50/95 px-4 pt-3 backdrop-blur sm:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <a
            href={primaryHref}
            className="clip-bevel block w-full bg-brand-600 px-6 py-4 text-center font-condensed text-lg font-extrabold uppercase tracking-wider text-brand-50 active:scale-[0.99]"
          >
            {SITE.resultCopy.productCtaLabel}
          </a>
        </div>
      )}
    </div>
  );
}
