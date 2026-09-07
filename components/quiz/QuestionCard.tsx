"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { SITE } from "@/config/active";
import { headingClass } from "@/lib/heading";

interface QuestionCardProps {
  question: QuizQuestion;
  value: string | string[] | number | undefined;
  onAnswer: (value: string | string[] | number) => void;
  onNext: () => void;
}

const OPTION_BASE =
  "flex min-h-[54px] w-full items-center gap-3.5 border px-4 py-4 text-left text-[17px] font-medium transition sm:gap-4 sm:px-5";
const OPTION_ON = "border-brand-600 bg-brand-600/10 text-brand-950";
const OPTION_OFF =
  "border-white/[0.12] bg-white/[0.02] text-brand-800 hover:border-brand-600 hover:bg-brand-600/[0.06]";

/** Repère de saisie : A, B, C, D — le clavier physique du parcours. */
function optionKey(i: number) {
  return String.fromCharCode(65 + i);
}

export function QuestionCard({ question, value, onAnswer, onNext }: QuestionCardProps) {
  const [localSlider, setLocalSlider] = useState<number>(
    typeof value === "number" ? value : question.slider?.defaultValue ?? question.number?.min ?? 0
  );

  return (
    <div className="reticle w-full border border-brand-600/20 bg-brand-100/70 p-5 sm:p-8">
      <div className="flex items-center gap-3">
        {question.icon && (
          <span className="text-brand-600">
            <Icon name={question.icon} className="h-6 w-6" />
          </span>
        )}
        <span className="font-mono text-[11px] uppercase tracking-ops text-brand-500">
          {question.dimensionLabel ?? question.id.replace(/_/g, " ")}
        </span>
      </div>

      <h2 className={`${headingClass(SITE)} mt-4 text-[27px] leading-[1.08] text-brand-950 sm:text-[34px]`}>
        {question.prompt}
      </h2>
      {question.helpText && (
        <p className="mt-2.5 text-[15px] leading-relaxed text-brand-500">{question.helpText}</p>
      )}

      <div className="mt-7 flex flex-col gap-2.5">
        {question.type === "single" &&
          question.options?.map((option, i) => {
            const selected = value === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onAnswer(option.id);
                  // Court délai pour que l'état sélectionné soit visible avant
                  // d'avancer — sans ça, le tap semble ne pas avoir été pris.
                  window.setTimeout(onNext, 180);
                }}
                aria-pressed={selected}
                className={`${OPTION_BASE} ${selected ? OPTION_ON : OPTION_OFF}`}
              >
                <span className="w-4 font-mono text-[11px] tracking-wider text-brand-600">
                  {optionKey(i)}
                </span>
                <span
                  aria-hidden
                  className={`h-2.5 w-2.5 flex-none border border-brand-600 ${
                    selected ? "bg-brand-600" : "bg-transparent"
                  }`}
                />
                {option.label}
              </button>
            );
          })}

        {question.type === "multiple" && question.options && (
          <MultipleChoice
            options={question.options}
            value={Array.isArray(value) ? value : []}
            onChange={(next) => onAnswer(next)}
          />
        )}

        {question.type === "slider" && question.slider && (
          <div className="pt-2">
            <input
              type="range"
              min={question.slider.min}
              max={question.slider.max}
              step={question.slider.step}
              value={localSlider}
              onChange={(e) => {
                const next = Number(e.target.value);
                setLocalSlider(next);
                onAnswer(next);
              }}
              className="w-full accent-brand-600"
              aria-label={question.prompt}
            />
            <div className="mt-2 text-center font-condensed text-2xl font-bold text-brand-950">
              {localSlider}
              {question.slider.unit ?? ""}
            </div>
          </div>
        )}

        {question.type === "number" && question.number && (
          <input
            type="number"
            min={question.number.min}
            max={question.number.max}
            placeholder={question.number.placeholder}
            defaultValue={typeof value === "number" ? value : undefined}
            onChange={(e) => onAnswer(Number(e.target.value))}
            className="w-full border border-white/[0.12] bg-white/[0.02] px-5 py-4 text-base text-brand-950 focus:border-brand-600 focus:outline-none"
          />
        )}
      </div>

      {(question.type === "multiple" ||
        question.type === "slider" ||
        question.type === "number") && (
        <button
          type="button"
          onClick={onNext}
          disabled={value === undefined}
          className="clip-bevel mt-7 w-full bg-brand-600 px-6 py-4 font-condensed text-lg font-extrabold uppercase tracking-wider text-brand-50 transition hover:bg-brand-600/85 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue
        </button>
      )}
    </div>
  );
}

function MultipleChoice({
  options,
  value,
  onChange,
}: {
  options: NonNullable<QuizQuestion["options"]>;
  value: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <>
      {options.map((option, i) => {
        const selected = value.includes(option.id);
        return (
          <button
            key={option.id}
            type="button"
            onClick={() =>
              onChange(
                selected ? value.filter((id) => id !== option.id) : [...value, option.id]
              )
            }
            aria-pressed={selected}
            className={`${OPTION_BASE} ${selected ? OPTION_ON : OPTION_OFF}`}
          >
            <span className="w-4 font-mono text-[11px] tracking-wider text-brand-600">
              {optionKey(i)}
            </span>
            <span
              aria-hidden
              className={`h-2.5 w-2.5 flex-none border border-brand-600 ${
                selected ? "bg-brand-600" : "bg-transparent"
              }`}
            />
            {option.label}
          </button>
        );
      })}
    </>
  );
}
