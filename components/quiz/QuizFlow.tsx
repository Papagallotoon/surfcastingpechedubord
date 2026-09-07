"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "@/config/active";
import type { Answers } from "@/lib/types";
import { track } from "@/lib/analytics";
import { ProgressBar } from "./ProgressBar";
import { QuestionCard } from "./QuestionCard";

export const QUIZ_ANSWERS_STORAGE_KEY = "quiz_answers_v1";

const sortedQuestions = [...QUESTIONS].sort((a, b) => a.order - b.order);

export function QuizFlow() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  // Mirrors `answers` synchronously so the last question's answer is never
  // lost to a stale closure when we save-and-navigate in the same tick that
  // records it (React state updates are async; a ref isn't).
  const answersRef = useRef<Answers>({});

  useEffect(() => {
    track("quiz_start");
  }, []);

  const question = sortedQuestions[index];
  const total = sortedQuestions.length;

  function handleAnswer(value: string | string[] | number) {
    if (!question) return;
    const next = { ...answersRef.current, [question.id]: value };
    answersRef.current = next;
    setAnswers(next);
    track("quiz_answer", { question_id: question.id });
  }

  function handleNext() {
    const isLast = index === total - 1;

    if (isLast) {
      track("quiz_complete");
      try {
        sessionStorage.setItem(
          QUIZ_ANSWERS_STORAGE_KEY,
          JSON.stringify(answersRef.current)
        );
      } catch {
        // sessionStorage unavailable (e.g. private mode) — result page will
        // fall back to its empty state.
      }
      router.push("/result");
      return;
    }

    setIndex((i) => i + 1);
  }

  function handleBack() {
    setIndex((i) => Math.max(0, i - 1));
  }

  if (!question) return null;

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-xl flex-col justify-center px-4 py-10">
      <div className="mb-4 flex h-5 items-center">
        {index > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="text-sm font-medium text-brand-600 hover:text-brand-800"
          >
            ← Back
          </button>
        )}
      </div>
      <ProgressBar current={index + 1} total={total} />
      <div key={question.id} className="mt-8 quiz-question-enter">
        <QuestionCard
          question={question}
          value={answers[question.id]}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
