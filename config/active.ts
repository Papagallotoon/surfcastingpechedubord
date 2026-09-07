// Résout la niche active. C'EST LE SEUL POINT D'ENTRÉE que app/, components/
// et lib/ importent — ils ne connaissent jamais le nom d'une niche.
//
// Bascule :  NEXT_PUBLIC_NICHE=readyscore   (voir .env.example)
// Un déploiement Vercel par niche, même repo, même branche : seule la variable
// d'environnement change. Next remplace process.env.NEXT_PUBLIC_* à la
// compilation, donc la valeur est figée dans le bundle — pas de coût runtime.

import { DEFAULT_NICHE, NICHES, NICHE_SLUGS } from "./registry";
import { validateNiche } from "@/lib/validateNiche";

const requested = process.env.NEXT_PUBLIC_NICHE?.trim();

function resolveSlug(): string {
  if (!requested) {
    console.warn(
      `[niche] NEXT_PUBLIC_NICHE non définie — repli sur "${DEFAULT_NICHE}". ` +
        `Niches disponibles : ${NICHE_SLUGS.join(", ")}.`
    );
    return DEFAULT_NICHE;
  }
  if (!NICHES[requested]) {
    console.warn(
      `[niche] NEXT_PUBLIC_NICHE="${requested}" inconnue — repli sur ` +
        `"${DEFAULT_NICHE}". Niches disponibles : ${NICHE_SLUGS.join(", ")}.`
    );
    return DEFAULT_NICHE;
  }
  return requested;
}

/** Slug de la niche servie. Utile pour l'analytics et le débogage. */
export const ACTIVE_NICHE = resolveSlug();

const active = NICHES[ACTIVE_NICHE]!;

// En développement, une configuration incomplète échoue tout de suite avec le
// nom du champ fautif. En production, on journalise et on continue : un
// visiteur ne doit jamais voir un écran blanc pour une virgule manquante.
validateNiche(ACTIVE_NICHE, active);

export const SITE = active.SITE;
export const QUESTIONS = active.QUESTIONS;
export const PRODUCTS = active.PRODUCTS;
export const SCORING = active.SCORING;
export const CONTENT = active.CONTENT;
