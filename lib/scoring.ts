import type {
  Answers,
  DimensionMeta,
  Product,
  QuizQuestion,
  QuizResult,
  ResultProfile,
  ScoringConfig,
} from "./types";

/** Adds `points` into `dimensionScores` for every dimension key present. */
function addPoints(
  dimensionScores: Record<string, number>,
  points: Record<string, number> | undefined
) {
  if (!points) return;
  for (const [dimension, value] of Object.entries(points)) {
    dimensionScores[dimension] = (dimensionScores[dimension] ?? 0) + value;
  }
}

/** Generic scoring engine: turns raw quiz answers into dimension totals. */
export function computeDimensionScores(
  questions: QuizQuestion[],
  answers: Answers
): Record<string, number> {
  const dimensionScores: Record<string, number> = {};

  for (const question of questions) {
    const answer = answers[question.id];
    if (answer === undefined) continue;

    if (question.type === "single" && typeof answer === "string") {
      const option = question.options?.find((o) => o.id === answer);
      addPoints(dimensionScores, option?.scoreImpact);
    }

    if (question.type === "multiple" && Array.isArray(answer)) {
      for (const optionId of answer) {
        const option = question.options?.find((o) => o.id === optionId);
        addPoints(dimensionScores, option?.scoreImpact);
      }
    }

    if (question.type === "slider" && typeof answer === "number" && question.slider) {
      const impactPerUnit = question.slider.scoreImpactPerUnit;
      if (impactPerUnit) {
        const scaled: Record<string, number> = {};
        for (const [dimension, perUnit] of Object.entries(impactPerUnit)) {
          scaled[dimension] = perUnit * answer;
        }
        addPoints(dimensionScores, scaled);
      }
    }

    if (question.type === "number" && typeof answer === "number" && question.number) {
      const impactPerUnit = question.number.scoreImpactPerUnit;
      if (impactPerUnit) {
        const scaled: Record<string, number> = {};
        for (const [dimension, perUnit] of Object.entries(impactPerUnit)) {
          scaled[dimension] = perUnit * answer;
        }
        addPoints(dimensionScores, scaled);
      }
    }
  }

  return dimensionScores;
}

function pickProfile(score: number, scoring: ScoringConfig): ResultProfile {
  const match = scoring.profiles.find(
    (p) => score >= p.minScore && score <= p.maxScore
  );
  if (match) return match;

  const fallback = scoring.profiles[scoring.profiles.length - 1];
  if (!fallback) {
    throw new Error("ScoringConfig.profiles must not be empty");
  }
  return fallback;
}

function splitStrengthsAndGaps(
  dimensionScores: Record<string, number>,
  dimensions: DimensionMeta[]
): { strengths: DimensionMeta[]; gaps: DimensionMeta[] } {
  const strengths: DimensionMeta[] = [];
  const gaps: DimensionMeta[] = [];

  for (const dimension of dimensions) {
    const value = dimensionScores[dimension.id] ?? 0;
    if (value >= dimension.strengthThreshold) {
      strengths.push(dimension);
    } else {
      gaps.push(dimension);
    }
  }

  return { strengths, gaps };
}

function rankRecommendations(
  profileId: string,
  products: Product[]
): Product[] {
  return products
    .filter((p) => p.active && p.recommendedFor.includes(profileId))
    .sort((a, b) => b.netRevenuePerSale - a.netRevenuePerSale)
    .slice(0, 3);
}

export function computeResult(
  questions: QuizQuestion[],
  answers: Answers,
  scoring: ScoringConfig,
  products: Product[]
): QuizResult {
  const dimensionScores = computeDimensionScores(questions, answers);

  // "score" is the reserved dimension id used for the overall 0-100 result.
  const rawScore = dimensionScores["score"] ?? 0;
  const normalized = Math.max(
    0,
    Math.min(100, Math.round((rawScore / scoring.maxRawScore) * 100))
  );

  const profile = pickProfile(normalized, scoring);
  const { strengths, gaps } = splitStrengthsAndGaps(
    dimensionScores,
    scoring.dimensions
  );
  const recommendations = rankRecommendations(profile.id, products);

  return {
    rawScore,
    score: normalized,
    profile,
    dimensionScores,
    strengths,
    gaps,
    recommendations,
  };
}

/**
 * Turns the visitor's actual gaps into a specific, honest reason the
 * recommendation matches them — e.g. "Chosen because your biggest gaps are
 * Backup power and Home security." Falls back to a generic line when there
 * are no gaps (a HIGH profile visitor). Never fabricates claims — it only
 * ever references dimensions the visitor's own answers produced.
 */
export function buildMatchReason(
  result: QuizResult,
  template: string,
  fallback: string
): string {
  if (result.gaps.length === 0) return fallback;

  const labels = result.gaps.slice(0, 2).map((g) => g.label);
  const first = labels[0] ?? "";
  const gapsText = labels.length === 2 ? `${first} and ${labels[1]}` : first;

  return template.replace("{gaps}", gapsText);
}
