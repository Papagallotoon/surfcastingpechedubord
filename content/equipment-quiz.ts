import { CATEGORIES, CATEGORY_ORDER, type CategoryKey } from "./articles";

// Quiz "quel équipement avez-vous déjà", propre à ce site. Volontairement
// distinct du moteur d'origine (lib/scoring.ts, config/niches/.../quiz.ts) :
// pas de score 0-100 unique ni de produit-funnel à recommander, seulement
// deux pourcentages (équipement minimum couvert / équipement haut de gamme
// couvert) calculés directement depuis les 5 catégories réelles du site.

export type EquipmentLevel = "none" | "basic" | "full" | "unknown";

export const EQUIPMENT_LEVEL_OPTIONS: { id: EquipmentLevel; label: string }[] = [
  { id: "none", label: "Rien ou presque" },
  { id: "basic", label: "L'essentiel, premier prix" },
  { id: "full", label: "Complet, plutôt haut de gamme" },
  { id: "unknown", label: "Je ne sais pas" },
];

export type EquipmentAnswers = Partial<Record<CategoryKey, EquipmentLevel>>;

export const EQUIPMENT_QUESTIONS = CATEGORY_ORDER.map((key) => ({
  category: key as CategoryKey,
  prompt: `Quel est votre niveau d'équipement en ${CATEGORIES[key]!.label.toLowerCase()} ?`,
}));

export type SpotType = "roche" | "plage" | "ponton" | "unknown";
export type BottomType = "sable" | "roche" | "mixte" | "unknown";

export const SPOT_QUESTION = {
  id: "spot" as const,
  prompt: "Quel type de pêche pratiquez-vous le plus souvent ?",
  options: [
    { id: "roche" as SpotType, label: "Pêche de roche" },
    { id: "plage" as SpotType, label: "Pêche de plage / sable" },
    { id: "ponton" as SpotType, label: "Depuis un ponton ou une jetée" },
    { id: "unknown" as SpotType, label: "Je ne sais pas encore" },
  ],
};

export const BOTTOM_QUESTION = {
  id: "bottom" as const,
  prompt: "Quel type de fond avez-vous généralement sous les pieds ?",
  options: [
    { id: "sable" as BottomType, label: "Sable" },
    { id: "roche" as BottomType, label: "Roches / rochers" },
    { id: "mixte" as BottomType, label: "Mixte (sable et roches)" },
    { id: "unknown" as BottomType, label: "Je ne sais pas" },
  ],
};

const SPOT_TIPS: Record<SpotType, string> = {
  roche:
    "En pêche de roche, misez d'abord sur un montage résistant à l'abrasion et une pince solide pour décrocher en terrain accidenté.",
  plage:
    "En pêche de plage, la distance de lancer prime : la canne et le moulinet font la plus grosse différence avant tout le reste.",
  ponton:
    "Depuis un ponton ou une jetée, la puissance de lancer compte moins : concentrez-vous sur les montages et les leurres adaptés à la profondeur.",
  unknown:
    "Si vous débutez, la pêche de plage reste la plus accessible pour se faire la main avant de tenter la roche ou le ponton.",
};

const BOTTOM_TIPS: Record<BottomType, string> = {
  sable: "Sur fond de sable, un montage classique à plomb simple suffit la plupart du temps.",
  roche: "Sur fond rocheux, prévoyez plus de plombs et de montages de rechange : les accrochages sont fréquents.",
  mixte: "Sur fond mixte, gardez les deux types de montages sous la main.",
  unknown: "",
};

export function getSpotTip(spot: SpotType): string {
  return SPOT_TIPS[spot];
}

export function getBottomTip(bottom: BottomType): string {
  return BOTTOM_TIPS[bottom];
}

export interface EquipmentResult {
  minimumPct: number;
  topPct: number;
  /** Catégories pas encore au niveau "complet" — pistes d'amélioration. */
  gaps: CategoryKey[];
  /** Catégories à traiter en priorité (rien, ou réponse "je ne sais pas"). */
  priority: CategoryKey[];
}

export function scoreEquipment(answers: EquipmentAnswers): EquipmentResult {
  const cats = CATEGORY_ORDER as readonly CategoryKey[];
  const atLeastBasic = cats.filter((c) => answers[c] === "basic" || answers[c] === "full").length;
  const full = cats.filter((c) => answers[c] === "full").length;

  return {
    minimumPct: Math.round((atLeastBasic / cats.length) * 100),
    topPct: Math.round((full / cats.length) * 100),
    gaps: cats.filter((c) => answers[c] !== "full"),
    priority: cats.filter((c) => !answers[c] || answers[c] === "none" || answers[c] === "unknown"),
  };
}
