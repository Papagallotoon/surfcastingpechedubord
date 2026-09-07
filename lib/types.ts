// Core types shared by every niche config. Edit config/niches/* to build a
// new site — these types should rarely need to change.
//
// CONTRAT DE TEMPLATE : tout ce qui est visible à l'écran et dépend du sujet
// traité doit avoir un champ ici. Si un composant a besoin d'un texte qui
// n'existe pas dans ces types, la bonne correction est d'ajouter le champ —
// jamais d'écrire le texte dans le composant.

export type Currency = "EUR" | "USD" | "GBP";

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  image: string;
  price: number;
  currency: Currency;
  /** Internal only. Never rendered to visitors. */
  netRevenuePerSale: number;
  /** Internal only. Never rendered to visitors. */
  commissionRate: number;
  /** Internal only. Never rendered to visitors. */
  checkoutConversion: number;
  /** Internal only. Never rendered to visitors. */
  refundRate: number;
  affiliateUrl: string;
  /** Optional Digistore24 campaign key, appended as a query param. */
  campaignKey?: string;
  /** Optional product video — YouTube/Vimeo URL or a direct .mp4/.webm file.
   *  Rendered under the product image when set; omitted entirely otherwise. */
  videoUrl?: string;
  /** Optional extra gallery images shown as thumbnails under the main
   *  `image`. Omit for a single-image card. */
  images?: string[];
  category: string;
  advantages: string[];
  disadvantages: string[];
  /** Result profile ids this product should be recommended for. */
  recommendedFor: string[];
  countryAvailability: string[];
  active: boolean;
}

export type QuestionType = "single" | "multiple" | "slider" | "number";

export interface AnswerOption {
  id: string;
  label: string;
  /** Dimension id -> points added when this option is selected.
   *  La clé "score" est réservée : c'est elle qui alimente le total 0-100. */
  scoreImpact?: Record<string, number>;
}

export interface SliderConfig {
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit?: string;
  /** Dimension id -> points per unit of slider value. */
  scoreImpactPerUnit?: Record<string, number>;
}

export interface NumberConfig {
  min: number;
  max: number;
  placeholder?: string;
  /** Dimension id -> points per unit of the entered number. */
  scoreImpactPerUnit?: Record<string, number>;
}

export interface QuizQuestion {
  id: string;
  order: number;
  prompt: string;
  helpText?: string;
  /** Optional key into components/ui/Icon.tsx's icon set, shown as a badge
   *  above the prompt. Purely visual — the engine ships a small generic set
   *  (shield, droplet, heart, ...); niches just pick whichever fits. */
  icon?: string;
  /** Libellé court de la dimension, affiché au-dessus de la question.
   *  Sans lui, le moteur affiche l'id de la question — lisible mais laid. */
  dimensionLabel?: string;
  type: QuestionType;
  options?: AnswerOption[];
  slider?: SliderConfig;
  number?: NumberConfig;
}

/** questionId -> selected answer (option id, option id[], or numeric value) */
export type Answers = Record<string, string | string[] | number>;

export interface ResultProfile {
  id: string;
  label: string;
  /** Inclusive score range on the normalized 0-100 scale. */
  minScore: number;
  maxScore: number;
  headline: string;
  description: string;
}

export interface DimensionMeta {
  id: string;
  label: string;
  /** Étiquette d'axe du diagramme radar : très court, 8 caractères max.
   *  Défaut : `label` en majuscules. */
  shortLabel?: string;
  /** Raw points at/above which this dimension counts as a "strength". */
  strengthThreshold: number;
}

export interface ScoringConfig {
  /** Highest raw score achievable by answering every question best-case. */
  maxRawScore: number;
  profiles: ResultProfile[];
  dimensions: DimensionMeta[];
}

export interface BrandPalette {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
  "950": string;
}

export interface HowItWorksStep {
  title: string;
  description: string;
}

/** Carte du bloc passerelle en bas de la page résultat. Vide = bloc masqué. */
export interface FurtherTest {
  /** Étiquette mono, ex. "Test 02 — 60 sec". */
  label: string;
  title: string;
  description: string;
  href: string;
}

export interface SiteConfig {
  siteId: string;
  siteName: string;
  siteDescription: string;
  niche: string;
  locale: "en" | "fr" | "ja";
  domain: string;
  branding: {
    colors: BrandPalette;
    /** "sans-bold": heavy uppercase sans headlines — confident, tactical,
     *  masculine-leaning (e.g. security/finance/trading niches).
     *  "serif": softer editorial serif headlines (e.g. wellness/lifestyle
     *  niches). Applied to the hero title, score headline, and question
     *  prompts — the few places the engine renders a "display" heading. */
    headingFont: "sans-bold" | "serif";
    /** Lettre du bloc logo. Défaut : première lettre de siteName. */
    logoLetter?: string;
  };
  /** Libellé mono à droite du nom dans l'en-tête. Omis = rien d'affiché. */
  headerTagline?: string;
  /** Voyant "en ligne" de l'en-tête. Omis = voyant masqué. */
  headerStatus?: string;
  hero: {
    /** Sur-titre mono au-dessus du titre. Omis = ligne masquée. */
    eyebrow?: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
    benefits: string[];
    /** Path or URL to a hero illustration/photo. Omit to show no visual. */
    image?: string;
    /** YouTube/Vimeo/Wistia URL or a direct video file. Takes priority over
     *  `image` when both are set. Omit until you have a real video. */
    videoUrl?: string;
  };
  /** Optional "how it works" steps on the landing page. Omit or leave empty
   *  to skip the section entirely. */
  howItWorks: HowItWorksStep[];
  /** Titre de la section "comment ça marche". Omis = section sans titre. */
  howItWorksTitle?: string;
  quizIntro: {
    title: string;
  };
  /** Libellé du compteur de progression du quiz, ex. "Phase". */
  quizStepLabel?: string;
  resultCopy: {
    scoreLabel: string;
    /** Étiquette du badge de profil, ex. "Classification". */
    classificationLabel: string;
    strengthsTitle: string;
    /** Affiché quand le visiteur n'a AUCUNE force confirmée. */
    strengthsEmpty: string;
    gapsTitle: string;
    /** Affiché quand le visiteur n'a AUCUNE lacune. */
    gapsEmpty: string;
    /** Titre du bloc diagramme (carte des dimensions). */
    mapTitle: string;
    /** Phrase de synthèse quand aucune dimension n'est critique. */
    mapAllClear: string;
    /** Synthèse du maillon faible. Utiliser "{dimension}" comme substitut. */
    mapWeakestTemplate: string;
    recommendationTitle: string;
    /** CTA label on the product card and sticky mobile bar. */
    productCtaLabel: string;
    /** Lien discret pour refaire le test. */
    rerunLabel: string;
    /** Match explanation shown above the CTA. Use "{gaps}" as a placeholder
     *  for up to two of the visitor's actual gap labels. */
    matchReasonTemplate: string;
    /** Shown instead of matchReasonTemplate when the visitor has no gaps. */
    matchReasonFallback: string;
  };
  /** Bloc passerelle vers les autres tests. Omis ou vide = bloc masqué. */
  furtherTests?: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tests: FurtherTest[];
  };
  /** Mentions légales. Obligatoire : l'affiliation doit être déclarée. */
  legal: {
    affiliateDisclosure: string;
    footerNote: string;
    links: { label: string; href: string }[];
  };
}

export interface VideoAngle {
  hook: string;
  cta: string;
}

export interface ContentConfig {
  videoAngles: VideoAngle[];
}

export interface QuizResult {
  rawScore: number;
  score: number; // normalized 0-100
  profile: ResultProfile;
  dimensionScores: Record<string, number>;
  strengths: DimensionMeta[];
  gaps: DimensionMeta[];
  recommendations: Product[];
}
