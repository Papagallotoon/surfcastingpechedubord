import type { Metadata } from "next";
import { EquipmentQuiz } from "@/components/quiz/EquipmentQuiz";

export const metadata: Metadata = {
  title: "Quel équipement de surfcasting vous manque ?",
  description:
    "7 questions sur votre équipement actuel et votre façon de pêcher, pour savoir où vous en êtes et quoi regarder en priorité.",
};

export default function AssessmentPage() {
  return <EquipmentQuiz />;
}
