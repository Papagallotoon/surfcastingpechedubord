import type { NicheConfig } from "@/config/registry";

/**
 * Garde-fou de configuration. Attrape les erreurs qui, sinon, se traduisent par
 * un score toujours à 0 ou une page résultat vide — c'est-à-dire les erreurs
 * qu'on ne remarque qu'après avoir acheté du trafic.
 *
 * En développement : throw, avec le nom du champ fautif.
 * En production : console.error et on continue.
 */
export function validateNiche(slug: string, config: NicheConfig): void {
  const errors: string[] = [];
  const { SITE, QUESTIONS, PRODUCTS, SCORING } = config;

  if (!SITE?.siteName) errors.push("site.siteName est vide");
  if (!QUESTIONS?.length) errors.push("quiz.QUESTIONS est vide");
  if (!SCORING?.profiles?.length) errors.push("scoring.profiles est vide");
  if (!SCORING?.maxRawScore || SCORING.maxRawScore <= 0) {
    errors.push("scoring.maxRawScore doit être > 0");
  }

  const dimensionIds = new Set((SCORING?.dimensions ?? []).map((d) => d.id));
  if (dimensionIds.has("score")) {
    errors.push(
      'scoring.dimensions ne peut pas contenir la dimension "score" : ' +
        "cet identifiant est réservé au total 0-100 du moteur"
    );
  }

  // Toute dimension citée par une réponse doit exister dans le scoring, sinon
  // ses points partent dans le vide et la dimension n'apparaît jamais.
  for (const question of QUESTIONS ?? []) {
    const impacts: Record<string, number>[] = [];
    for (const option of question.options ?? []) {
      if (option.scoreImpact) impacts.push(option.scoreImpact);
    }
    if (question.slider?.scoreImpactPerUnit) impacts.push(question.slider.scoreImpactPerUnit);
    if (question.number?.scoreImpactPerUnit) impacts.push(question.number.scoreImpactPerUnit);

    if (impacts.length === 0) {
      errors.push(`question "${question.id}" n'attribue aucun point`);
    }

    const touchesScore = impacts.some((impact) => "score" in impact);
    if (!touchesScore) {
      errors.push(
        `question "${question.id}" ne renseigne pas la dimension "score" : ` +
          "elle ne comptera pas dans le total 0-100"
      );
    }

    for (const impact of impacts) {
      for (const dimension of Object.keys(impact)) {
        if (dimension !== "score" && !dimensionIds.has(dimension)) {
          errors.push(
            `question "${question.id}" cite la dimension "${dimension}", ` +
              "absente de scoring.dimensions"
          );
        }
      }
    }
  }

  // Les profils doivent couvrir 0 à 100 sans trou : un score qui ne tombe dans
  // aucun profil retomberait silencieusement sur le dernier.
  const profiles = [...(SCORING?.profiles ?? [])].sort((a, b) => a.minScore - b.minScore);
  if (profiles.length > 0) {
    if (profiles[0]!.minScore !== 0) errors.push("scoring.profiles ne commence pas à 0");
    if (profiles[profiles.length - 1]!.maxScore !== 100) {
      errors.push("scoring.profiles ne va pas jusqu'à 100");
    }
    for (let i = 1; i < profiles.length; i += 1) {
      const previous = profiles[i - 1]!;
      const current = profiles[i]!;
      if (current.minScore !== previous.maxScore + 1) {
        errors.push(
          `scoring.profiles : trou ou chevauchement entre "${previous.id}" ` +
            `(…${previous.maxScore}) et "${current.id}" (${current.minScore}…)`
        );
      }
    }
  }

  // Un produit qui ne cible aucun profil existant ne sera jamais recommandé.
  const profileIds = new Set(profiles.map((p) => p.id));
  for (const product of PRODUCTS ?? []) {
    if (!product.active) continue;
    if (!product.recommendedFor?.length) {
      errors.push(`produit "${product.id}" n'a aucun recommendedFor`);
    }
    for (const profileId of product.recommendedFor ?? []) {
      if (!profileIds.has(profileId)) {
        errors.push(
          `produit "${product.id}" cible le profil "${profileId}", ` +
            "absent de scoring.profiles"
        );
      }
    }
    if (!product.affiliateUrl || product.affiliateUrl.includes("PLACEHOLDER")) {
      errors.push(
        `produit "${product.id}" n'a pas de lien affilié réel ` +
          "(affiliateUrl est encore un placeholder)"
      );
    }
  }

  if (errors.length === 0) return;

  const message =
    `Configuration de la niche "${slug}" invalide :\n` +
    errors.map((e) => `  • ${e}`).join("\n");

  if (process.env.NODE_ENV === "production") {
    console.error(message);
    return;
  }
  throw new Error(message);
}
