"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  DISTRIBUTION,
  FIXES,
  LAYERS,
  QUESTIONS,
  SAMPLE_SIZE,
  bandFor,
  verdictFor,
  type LayerKey,
} from "@/content/assessment";
import { Gauge } from "@/components/charts/Gauge";
import { Histogram } from "@/components/charts/Histogram";
import { Figure } from "@/components/charts/Figure";

// Évaluation en sept questions, rendue côté client : rien ne sort du navigateur
// tant que le lecteur ne demande pas le rapport par e-mail.
export function Assessment() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [done, setDone] = useState(false);

  const result = useMemo(() => {
    const grouped: Partial<Record<LayerKey, number[]>> = {};
    QUESTIONS.forEach((q, i) => {
      const v = answers[i];
      if (v == null) return;
      (grouped[q.layer] ??= []).push(v);
    });

    const layerScore = {} as Record<LayerKey, number>;
    (Object.keys(LAYERS) as LayerKey[]).forEach((key) => {
      const values = grouped[key] ?? [];
      layerScore[key] = values.length
        ? Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 100)
        : 0;
    });

    const score = Math.round(
      (Object.keys(LAYERS) as LayerKey[]).reduce(
        (total, key) => total + layerScore[key] * LAYERS[key].weight,
        0,
      ),
    );

    const bucket = Math.min(9, Math.floor(score / 10));
    const below = DISTRIBUTION.slice(0, bucket).reduce((a, b) => a + b, 0);
    const percentile = Math.max(1, Math.min(99, Math.round(below + (DISTRIBUTION[bucket] ?? 0) / 2)));

    const ranked = (Object.keys(LAYERS) as LayerKey[])
      .map((key) => ({ key, gap: layerScore[key] - LAYERS[key].median }))
      .sort((a, b) => a.gap - b.gap)
      .slice(0, 3);

    return { layerScore, score, bucket, percentile, ranked };
  }, [answers]);

  if (!done) {
    const question = QUESTIONS[step]!;

    return (
      <section className="mx-auto max-w-[860px] px-4 pt-[clamp(28px,5vw,56px)] sm:px-7">
        <div className="flex items-baseline justify-between gap-4 font-mono text-[10px] uppercase tracking-ops text-brand-500">
          <span className="text-brand-600">Indice de sécurité du foyer</span>
          <span>
            Question {step + 1} sur {QUESTIONS.length} · {LAYERS[question.layer].name}
          </span>
        </div>
        <div className="mt-3 h-[3px] bg-brand-950/15">
          <div
            className="h-[3px] bg-brand-600 transition-[width] duration-300"
            style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
          />
        </div>

        <h1 className="mt-7 font-condensed text-[clamp(30px,5.4vw,48px)] font-extrabold uppercase leading-[0.98] text-brand-950 [text-wrap:balance]">
          {question.title}
        </h1>
        <p className="mt-3.5 max-w-[56ch] font-serif text-[19px] leading-[1.6] text-brand-700">
          {question.help}
        </p>

        <div className="mt-7 flex flex-col gap-px">
          {question.options.map((option, i) => (
            <button
              key={option.label}
              type="button"
              onClick={() => {
                const next = { ...answers, [step]: option.value };
                setAnswers(next);
                if (step + 1 >= QUESTIONS.length) setDone(true);
                else setStep(step + 1);
              }}
              className="grid min-h-[60px] w-full grid-cols-[34px_1fr_18px] items-center gap-4 bg-brand-100 px-5 py-[19px] text-left shadow-[0_0_0_1px_rgb(var(--brand-300))] hover:bg-brand-600/[0.08] hover:shadow-[0_0_0_1px_#0E7C6E]"
            >
              <span className="font-mono text-[11px] tracking-[0.16em] text-brand-600">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="font-sans text-[17px] leading-[1.35] text-brand-900">
                {option.label}
              </span>
              <span className="font-mono text-[13px] text-brand-400">›</span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-[18px]">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="min-h-[44px] border border-brand-300 px-4 py-3 font-mono text-[10px] uppercase tracking-ops text-brand-800 hover:border-brand-600 hover:text-brand-600"
            >
              ← Retour
            </button>
          ) : (
            <Link
              href="/"
              className="min-h-[44px] border border-brand-300 px-4 py-3 font-mono text-[10px] uppercase tracking-ops text-brand-800 hover:border-brand-600 hover:text-brand-600"
            >
              ← Accueil
            </Link>
          )}
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-brand-500">
            Sans email · rien ne quitte votre navigateur
          </span>
        </div>
      </section>
    );
  }

  const band = bandFor(result.score);

  return (
    <section className="mx-auto max-w-[1200px] px-4 pb-16 pt-[clamp(28px,5vw,52px)] sm:px-7">
      <div className="font-mono text-[10px] uppercase tracking-ops text-brand-500">
        Évaluation › Votre résultat
      </div>

      <div className="mt-6 grid grid-cols-1 items-center gap-[clamp(28px,4vw,48px)] border-b border-brand-300 pb-[clamp(28px,4vw,40px)] sm:grid-cols-[250px_1fr]">
        <Gauge value={result.score} />
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-ops text-brand-600">Tranche</div>
          <h1 className="mt-2.5 font-condensed text-[clamp(32px,5.4vw,50px)] font-extrabold uppercase leading-[0.96] text-brand-950 [text-wrap:balance]">
            {band.title}
          </h1>
          <p className="mt-3.5 max-w-[52ch] font-serif text-[19px] leading-[1.6] text-brand-700">
            {band.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setStep(0);
                setDone(false);
              }}
              className="min-h-[44px] border border-brand-300 px-4 py-3 font-mono text-[10px] uppercase tracking-ops text-brand-800 hover:border-brand-600 hover:text-brand-600"
            >
              Refaire le test
            </button>
            <Link
              href="/detection/cameras-de-securite-connectees"
              className="min-h-[44px] border border-brand-300 px-4 py-3 font-mono text-[10px] uppercase tracking-ops text-brand-800 hover:border-brand-600 hover:text-brand-600"
            >
              Voir le matériel recommandé
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-[clamp(32px,4vw,44px)] flex flex-wrap items-start gap-[clamp(28px,4vw,48px)]">
        <div className="min-w-0 flex-1 basis-[460px]">
          <h2 className="m-0 font-condensed text-[clamp(22px,3vw,28px)] font-extrabold uppercase tracking-[0.03em] text-brand-950">
            Vos quatre couches
          </h2>
          <p className="mt-2.5 max-w-[56ch] font-serif text-[17px] leading-[1.6] text-brand-700">
            La barre, c'est vous. Le trait vertical est la médiane de {SAMPLE_SIZE} maisons évaluées.
            Une couche sous ce trait, c'est ce qu'un intrus choisira en premier.
          </p>

          <Figure index="Fig. A" title="Scores par couche vs. médiane">
            <div className="flex flex-col gap-5">
              {(Object.keys(LAYERS) as LayerKey[]).map((key) => {
                const layer = LAYERS[key];
                const value = result.layerScore[key];
                return (
                  <div key={key}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-condensed text-[19px] font-bold uppercase text-brand-900">
                        {layer.name}
                      </span>
                      <span className="font-mono text-[12px]" style={{ color: layer.color }}>
                        {value}
                      </span>
                    </div>
                    <div className="relative mt-2 h-[18px] bg-brand-950/10">
                      <div
                        className="h-[18px]"
                        style={{ width: `${value}%`, background: layer.color }}
                      />
                      <div
                        className="absolute -bottom-1 -top-1 w-[2px] bg-brand-900"
                        style={{ left: `${layer.median}%` }}
                      />
                    </div>
                    <div className="mt-1.5 font-sans text-[14px] text-brand-700">
                      {verdictFor(value - layer.median)}
                    </div>
                  </div>
                );
              })}
            </div>
          </Figure>

          <Figure
            index="Fig. B"
            title={`Votre position parmi ${SAMPLE_SIZE} maisons`}
            note={`Vous obtenez un score supérieur à ${result.percentile}% des maisons évaluées`}
          >
            <Histogram buckets={DISTRIBUTION} youIndex={result.bucket} />
          </Figure>

          <h2 className="mt-11 font-condensed text-[clamp(22px,3vw,28px)] font-extrabold uppercase tracking-[0.03em] text-brand-950">
            Comblez ces trois failles en premier
          </h2>
          <p className="mt-2.5 max-w-[56ch] font-serif text-[17px] leading-[1.6] text-brand-700">
            Classées selon l'impact sur votre indice par euro dépensé, pas par prix.
          </p>

          <div className="mt-5 flex flex-col gap-px">
            {result.ranked.map((entry, i) => {
              const layer = LAYERS[entry.key];
              const fix = FIXES[entry.key];
              return (
                <div
                  key={entry.key}
                  className="bg-brand-100 px-[22px] py-6 shadow-[0_0_0_1px_rgb(var(--brand-300))]"
                >
                  <div className="flex flex-wrap items-baseline gap-3.5">
                    <span className="font-mono text-[26px] leading-none" style={{ color: layer.color }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-mono text-[10px] uppercase tracking-ops"
                      style={{ color: layer.color }}
                    >
                      {layer.name} · {fix.gain}
                    </span>
                  </div>
                  <h3 className="mt-3 font-condensed text-[25px] font-extrabold uppercase leading-[1.04] text-brand-950">
                    {fix.title}
                  </h3>
                  <p className="mt-2.5 max-w-[60ch] font-serif text-[17px] leading-[1.62] text-brand-800">
                    {fix.why}
                  </p>
                  {fix.read && (
                    <Link
                      href={fix.read.href}
                      className="mt-3 inline-block font-mono text-[10px] uppercase tracking-ops text-brand-600"
                    >
                      Lire : {fix.read.label} →
                    </Link>
                  )}
                  <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-[18px] border-t border-brand-200 pt-4">
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-500">
                        Notre choix
                      </div>
                      <div className="mt-1 font-condensed text-[20px] font-bold uppercase text-brand-900">
                        {fix.product}
                      </div>
                    </div>
                    <a
                      href={fix.href}
                      rel="nofollow sponsored"
                      className="flex min-h-[44px] items-center whitespace-nowrap border border-brand-600 px-[15px] py-3 font-mono text-[10px] uppercase tracking-ops text-brand-600 hover:bg-brand-600 hover:text-white"
                    >
                      {fix.price} · Voir le prix
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-500">
            Nous touchons une commission sur ces liens. Les recommandations viennent du comparatif,
            pas de la commission.
          </p>
        </div>

        <aside className="sticky top-[92px] flex min-w-0 shrink grow-0 basis-[320px] flex-col gap-5 self-start">
          <div className="border border-brand-600/30 bg-brand-600/[0.08] px-[22px] py-6">
            <div className="font-mono text-[10px] uppercase tracking-ops text-brand-600">
              Rapport complet
            </div>
            <h3 className="mt-2.5 font-condensed text-[24px] font-extrabold uppercase leading-[1.02] text-brand-950">
              Recevez le détail sur 9 pages
            </h3>
            <p className="mt-2 font-serif text-[15px] leading-[1.55] text-brand-700">
              Chaque réponse notée, avec les chiffres mesurés derrière chaque correctif.
            </p>
            <form
              className="mt-3.5"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <input
                type="email"
                required
                placeholder="vous@email.com"
                className="min-h-[46px] w-full border border-brand-300 bg-brand-100 px-[15px] py-3.5 font-sans text-[16px] text-brand-900 outline-none focus:border-brand-600"
              />
              <button
                type="submit"
                className="clip-bevel mt-2.5 min-h-[46px] w-full bg-brand-600 px-[18px] py-3.5 font-condensed text-[16px] font-extrabold uppercase tracking-[0.06em] text-white hover:bg-brand-600/85"
              >
                Recevoir mon rapport
              </button>
            </form>
          </div>
        </aside>
      </div>
    </section>
  );
}
