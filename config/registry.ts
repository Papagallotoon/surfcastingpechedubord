// Table des niches disponibles. AJOUTER UNE NICHE = AJOUTER UNE LIGNE ICI.
//
// Ce dépôt est une version dédiée surfcasting, forkée depuis
// securitemaison-site (lui-même forké du moteur multi-niches
// readyscore-affiliate-engine) — une seule niche ici, volontairement.

import type {
  ContentConfig,
  Product,
  QuizQuestion,
  ScoringConfig,
  SiteConfig,
} from "@/lib/types";

import { SITE as surfcastingSite } from "./niches/surfcasting/site";
import { QUESTIONS as surfcastingQuestions } from "./niches/surfcasting/quiz";
import { PRODUCTS as surfcastingProducts } from "./niches/surfcasting/products";
import { SCORING as surfcastingScoring } from "./niches/surfcasting/scoring";
import { CONTENT as surfcastingContent } from "./niches/surfcasting/content";

/** Tout ce qu'une niche doit fournir pour que le moteur tourne. */
export interface NicheConfig {
  SITE: SiteConfig;
  QUESTIONS: QuizQuestion[];
  PRODUCTS: Product[];
  SCORING: ScoringConfig;
  CONTENT: ContentConfig;
}

export const NICHES: Record<string, NicheConfig> = {
  surfcasting: {
    SITE: surfcastingSite,
    QUESTIONS: surfcastingQuestions,
    PRODUCTS: surfcastingProducts,
    SCORING: surfcastingScoring,
    CONTENT: surfcastingContent,
  },
};

/** Niche servie quand NEXT_PUBLIC_NICHE est absente ou inconnue. */
export const DEFAULT_NICHE = "surfcasting";

export const NICHE_SLUGS = Object.keys(NICHES);
