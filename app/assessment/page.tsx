import type { Metadata } from "next";
import { Assessment } from "@/components/assessment/Assessment";

export const metadata: Metadata = {
  title: "Indice de sécurité de votre maison",
  description:
    "Sept questions, un indice sur 0–100 comparé à 41 200 maisons, et les trois correctifs qui le font le plus bouger par euro dépensé.",
};

export default function AssessmentPage() {
  return <Assessment />;
}
