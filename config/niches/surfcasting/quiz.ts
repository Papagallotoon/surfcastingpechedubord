import type { QuizQuestion } from "@/lib/types";

function opts(dimension: string) {
  return [
    { id: "none", label: "Pas du tout", scoreImpact: { score: 0, [dimension]: 0 } },
    { id: "basic", label: "Un peu", scoreImpact: { score: 1, [dimension]: 1 } },
    { id: "good", label: "Plutôt bien", scoreImpact: { score: 2, [dimension]: 2 } },
    { id: "excellent", label: "Entièrement couvert", scoreImpact: { score: 3, [dimension]: 3 } },
  ];
}

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "backup_power",
    order: 1,
    type: "single",
    icon: "power",
    dimensionLabel: "Alimentation & éclairage de secours",
    prompt: "Si l'électricité coupait ce soir, comment votre maison s'en sortirait-elle ?",
    helpText: "Pensez lampes torches, piles, groupe électrogène, batteries externes.",
    options: opts("backup_power"),
  },
  {
    id: "first_aid",
    order: 2,
    type: "single",
    icon: "heart",
    dimensionLabel: "Trousse de premiers secours",
    prompt: "Avez-vous une trousse de premiers secours bien fournie chez vous ?",
    options: opts("first_aid"),
  },
  {
    id: "water_storage",
    order: 3,
    type: "single",
    icon: "droplet",
    dimensionLabel: "Réserve d'eau",
    prompt: "Combien d'eau potable votre foyer pourrait-il utiliser sans passer par un magasin ?",
    options: opts("water_storage"),
  },
  {
    id: "food_supplies",
    order: 4,
    type: "single",
    icon: "basket",
    dimensionLabel: "Réserves alimentaires",
    prompt: "Combien de jours pourriez-vous nourrir votre foyer avec ce qu'il y a déjà chez vous ?",
    options: opts("food_supplies"),
  },
  {
    id: "communication",
    order: 5,
    type: "single",
    icon: "chat",
    dimensionLabel: "Plan de communication",
    prompt: "Pourriez-vous rester informé ou joindre de l'aide si le réseau mobile tombait ?",
    helpText: "Radios, chargeurs de secours, un plan de communication familial.",
    options: opts("communication"),
  },
  {
    id: "home_security",
    order: 6,
    type: "single",
    icon: "shield",
    dimensionLabel: "Sécurité du logement",
    prompt: "À quel point êtes-vous confiant dans la capacité de votre maison à rester sûre en cas de perturbation ?",
    helpText: "Serrures, éclairage, visibilité, dissuasion.",
    options: opts("home_security"),
  },
  {
    id: "emergency_plan",
    order: 7,
    type: "single",
    icon: "clipboard",
    dimensionLabel: "Plan d'urgence écrit",
    prompt: "Votre foyer a-t-il un plan d'urgence écrit, connu de tous ?",
    options: opts("emergency_plan"),
  },
];
