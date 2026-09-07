import type { ContentConfig } from "@/lib/types";

// Accroches pour les Shorts YouTube, une par angle de comparatif publié
// dans content/articles.ts. Pas de CTA quiz (ce site n'en a pas) : le CTA
// renvoie systématiquement vers le site pour voir le comparatif complet.
export const CONTENT: ContentConfig = {
  videoAngles: [
    { hook: "5 cannes à surfcasting testées, du premier prix à la canne de marque.", cta: "Le comparatif complet est sur le site en description." },
    { hook: "Voici ce qui différencie vraiment un moulinet à 30€ d'un moulinet à 140€.", cta: "Tous les prix et les liens sur le site en description." },
    { hook: "Le petit matériel qu'on rachète le plus en surfcasting (et où l'acheter au meilleur prix).", cta: "Le comparatif complet est sur le site en description." },
    { hook: "5 leurres et appâts pour la pêche du bord, du budget serré au premium.", cta: "Tous les liens produits sur le site en description." },
    { hook: "L'accessoire à 13€ qui change tout en surfcasting de nuit.", cta: "Le comparatif complet des 5 accessoires est sur le site." },
    { hook: "Ce qu'il faut vraiment dans sa boîte à pêche pour le surfcasting.", cta: "La liste complète et les prix sont sur le site en description." },
  ],
};
