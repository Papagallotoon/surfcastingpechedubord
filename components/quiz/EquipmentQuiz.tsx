"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CATEGORIES, articleHref, byCategory } from "@/content/articles";
import {
  EQUIPMENT_QUESTIONS,
  EQUIPMENT_LEVEL_OPTIONS,
  SPOT_QUESTION,
  BOTTOM_QUESTION,
  scoreEquipment,
  getSpotTip,
  getBottomTip,
  type EquipmentAnswers,
  type SpotType,
  type BottomType,
} from "@/content/equipment-quiz";

type Step =
  | { kind: "equipment"; index: number }
  | { kind: "spot" }
  | { kind: "bottom" }
  | { kind: "result" };

const TOTAL_QUESTIONS = EQUIPMENT_QUESTIONS.length + 2;

function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-sm border px-4 py-3 text-left text-sm transition-colors ${
        selected
          ? "border-brand-600 bg-brand-600 text-white"
          : "border-brand-300 bg-white text-brand-800 hover:border-brand-600"
      }`}
    >
      {label}
    </button>
  );
}

function Bar({ label, pct }: { label: string; pct: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-ops text-brand-600">
        <span>{label}</span>
        <span className="text-xl font-extrabold text-brand-950">{pct}%</span>
      </div>
      <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-brand-200">
        <div className="h-full rounded-full bg-brand-600" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function EquipmentQuiz() {
  const [step, setStep] = useState<Step>({ kind: "equipment", index: 0 });
  const [answers, setAnswers] = useState<EquipmentAnswers>({});
  const [spot, setSpot] = useState<SpotType | null>(null);
  const [bottom, setBottom] = useState<BottomType | null>(null);

  const progress = useMemo(() => {
    if (step.kind === "equipment") return step.index + 1;
    if (step.kind === "spot") return EQUIPMENT_QUESTIONS.length + 1;
    if (step.kind === "bottom") return EQUIPMENT_QUESTIONS.length + 2;
    return TOTAL_QUESTIONS;
  }, [step]);

  function goNext() {
    if (step.kind === "equipment") {
      if (step.index + 1 < EQUIPMENT_QUESTIONS.length) {
        setStep({ kind: "equipment", index: step.index + 1 });
      } else {
        setStep({ kind: "spot" });
      }
    } else if (step.kind === "spot") {
      setStep({ kind: "bottom" });
    } else if (step.kind === "bottom") {
      setStep({ kind: "result" });
    }
  }

  function goBack() {
    if (step.kind === "equipment" && step.index > 0) {
      setStep({ kind: "equipment", index: step.index - 1 });
    } else if (step.kind === "spot") {
      setStep({ kind: "equipment", index: EQUIPMENT_QUESTIONS.length - 1 });
    } else if (step.kind === "bottom") {
      setStep({ kind: "spot" });
    }
  }

  if (step.kind === "result") {
    const result = scoreEquipment(answers);
    return (
      <div className="mx-auto max-w-xl px-4 py-10 sm:px-0">
        <span className="font-mono text-[10px] uppercase tracking-ops text-brand-500">Résultat</span>
        <h1 className="mt-2 font-condensed text-[clamp(26px,4vw,34px)] font-extrabold uppercase leading-tight text-brand-950">
          Votre équipement de surfcasting
        </h1>

        <div className="mt-8 flex flex-col gap-6 rounded-sm border border-brand-300 bg-white/60 p-6">
          <Bar label="Équipement minimum couvert" pct={result.minimumPct} />
          <Bar label="Équipement haut de gamme couvert" pct={result.topPct} />
        </div>

        {spot && (
          <p className="mt-6 font-serif text-[15px] leading-relaxed text-brand-800">{getSpotTip(spot)}</p>
        )}
        {bottom && getBottomTip(bottom) && (
          <p className="mt-2 font-serif text-[15px] leading-relaxed text-brand-800">{getBottomTip(bottom)}</p>
        )}

        {result.priority.length > 0 ? (
          <div className="mt-8">
            <h2 className="font-mono text-[11px] uppercase tracking-ops text-brand-500">
              À regarder en priorité
            </h2>
            <div className="mt-3 flex flex-col gap-2">
              {result.priority.map((key) => {
                const article = byCategory(key)[0];
                if (!article) return null;
                return (
                  <Link
                    key={key}
                    href={articleHref(article)}
                    className="flex items-center justify-between rounded-sm border px-4 py-3 text-sm hover:bg-brand-100"
                    style={{ borderColor: CATEGORIES[key]!.color }}
                  >
                    <span className="text-brand-900">{CATEGORIES[key]!.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-ops text-brand-500">
                      Voir le comparatif →
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="mt-8 font-serif text-[15px] text-brand-800">
            Vous couvrez déjà l'essentiel des cinq catégories — direction les comparatifs pour viser le haut de
            gamme là où il vous reste des lacunes.
          </p>
        )}

        <button
          type="button"
          onClick={() => {
            setAnswers({});
            setSpot(null);
            setBottom(null);
            setStep({ kind: "equipment", index: 0 });
          }}
          className="mt-8 font-mono text-[11px] uppercase tracking-ops text-brand-500 hover:text-brand-600"
        >
          Refaire le test
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col justify-center px-4 py-10 sm:px-0">
      <div className="mb-4 flex h-5 items-center">
        {(step.kind !== "equipment" || step.index > 0) && (
          <button type="button" onClick={goBack} className="text-sm font-medium text-brand-600 hover:text-brand-800">
            ← Retour
          </button>
        )}
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-200">
        <div
          className="h-full rounded-full bg-brand-600 transition-all"
          style={{ width: `${(progress / TOTAL_QUESTIONS) * 100}%` }}
        />
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-ops text-brand-500">
        Question {progress} / {TOTAL_QUESTIONS}
      </div>

      {step.kind === "equipment" && (
        <div className="mt-8">
          <h2 className="font-condensed text-2xl font-bold text-brand-950">
            {EQUIPMENT_QUESTIONS[step.index]!.prompt}
          </h2>
          <div className="mt-5 flex flex-col gap-2.5">
            {EQUIPMENT_LEVEL_OPTIONS.map((opt) => {
              const category = EQUIPMENT_QUESTIONS[step.index]!.category;
              return (
                <OptionButton
                  key={opt.id}
                  label={opt.label}
                  selected={answers[category] === opt.id}
                  onClick={() => {
                    setAnswers((prev) => ({ ...prev, [category]: opt.id }));
                    goNext();
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      {step.kind === "spot" && (
        <div className="mt-8">
          <h2 className="font-condensed text-2xl font-bold text-brand-950">{SPOT_QUESTION.prompt}</h2>
          <div className="mt-5 flex flex-col gap-2.5">
            {SPOT_QUESTION.options.map((opt) => (
              <OptionButton
                key={opt.id}
                label={opt.label}
                selected={spot === opt.id}
                onClick={() => {
                  setSpot(opt.id);
                  goNext();
                }}
              />
            ))}
          </div>
        </div>
      )}

      {step.kind === "bottom" && (
        <div className="mt-8">
          <h2 className="font-condensed text-2xl font-bold text-brand-950">{BOTTOM_QUESTION.prompt}</h2>
          <div className="mt-5 flex flex-col gap-2.5">
            {BOTTOM_QUESTION.options.map((opt) => (
              <OptionButton
                key={opt.id}
                label={opt.label}
                selected={bottom === opt.id}
                onClick={() => {
                  setBottom(opt.id);
                  goNext();
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
