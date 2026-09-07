import type { Metadata } from "next";
import { SITE } from "@/config/active";
import { QuizFlow } from "@/components/quiz/QuizFlow";

export const metadata: Metadata = {
  title: SITE.quizIntro.title,
};

export default function QuizPage() {
  return <QuizFlow />;
}
