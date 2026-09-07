import type { ScoringConfig } from "@/lib/types";

export const SCORING: ScoringConfig = {
  maxRawScore: 21,
  profiles: [
    {
      id: "low",
      label: "Préparation faible",
      minScore: 0,
      maxScore: 40,
      headline: "Votre maison n'est pas bien préparée pour une urgence de 72 heures.",
      description:
        "Il vous manque plusieurs éléments essentiels recommandés par la plupart des guides de préparation. Quelques ajouts ciblés changeraient vraiment la donne en cas de perturbation réelle.",
    },
    {
      id: "medium",
      label: "Préparation moyenne",
      minScore: 41,
      maxScore: 70,
      headline: "Votre maison est moyennement préparée.",
      description:
        "Vous couvrez déjà certaines bases, mais quelques failles pourraient transformer une perturbation gérable en situation stressante. Les combler est simple.",
    },
    {
      id: "high",
      label: "Préparation élevée",
      minScore: 71,
      maxScore: 100,
      headline: "Votre maison est bien préparée pour une urgence de 72 heures.",
      description:
        "Vous couvrez la plupart des essentiels. Quelques améliorations vous feraient passer de bien préparé à totalement autonome pour les premiers jours critiques.",
    },
  ],
  dimensions: [
    { id: "backup_power", label: "Alimentation & éclairage de secours", shortLabel: "Énergie", strengthThreshold: 2 },
    { id: "first_aid", label: "Premiers secours", shortLabel: "Secours", strengthThreshold: 2 },
    { id: "water_storage", label: "Réserve d'eau", shortLabel: "Eau", strengthThreshold: 2 },
    { id: "food_supplies", label: "Réserves alimentaires", shortLabel: "Nourr.", strengthThreshold: 2 },
    { id: "communication", label: "Plan de communication", shortLabel: "Comm.", strengthThreshold: 2 },
    { id: "home_security", label: "Sécurité du logement", shortLabel: "Sécu.", strengthThreshold: 2 },
    { id: "emergency_plan", label: "Plan d'urgence écrit", shortLabel: "Plan", strengthThreshold: 2 },
  ],
};
