import type { SiteConfig } from "@/lib/types";

// Pas de quiz/évaluation sur ce site : quizIntro/resultCopy restent
// renseignés (le type SiteConfig les exige) mais les pages /quiz,
// /assessment et /result ne sont plus liées nulle part dans l'interface
// (voir Header.tsx et app/page.tsx) — ce site est un pur comparatif
// affilié, sans produit unique à recommander via un funnel de quiz.
export const SITE: SiteConfig = {
  siteId: "surfcasting",
  siteName: "Surfcasting Pêche du Bord",
  siteDescription:
    "Comparatifs indépendants de matériel de pêche en surfcasting : cannes, moulinets, montages, leurres et accessoires, avec de vrais produits Amazon vérifiés.",
  niche: "pêche en surfcasting",
  locale: "fr",
  domain: "surfcastingpechedubord.vercel.app",
  analytics: { gaMeasurementId: "" },
  // Palette camouflage noir/blanc/gris (filet de camo) + bleu profond en
  // accent, sans reprendre le kaki turquoise de Sécurité Maison ni la
  // palette verte de Marius Dumas Home. Paliers clairs pour rester lisible.
  branding: {
    headingFont: "sans-bold",
    logoLetter: "S",
    colors: {
      "50": "#f7f7f6",
      "100": "#eeeeec",
      "200": "#d9d9d5",
      "300": "#a3a3a0",
      "400": "#6f8a97",
      "500": "#3d6470",
      "600": "#144d63",
      "700": "#123f52",
      "800": "#1b2b33",
      "900": "#141d22",
      "950": "#0d1418",
    },
  },
  headerTagline: "Comparatifs pêche du bord",
  headerStatus: "Sélection à jour",
  hero: {
    eyebrow: "Surfcasting & pêche du bord",
    title: "Le Bon Matériel Pour Pêcher Depuis La Plage",
    subtitle:
      "Cannes, moulinets, montages, leurres et accessoires : des comparatifs indépendants avec de vrais produits Amazon vérifiés, prix et disponibilité à jour.",
    ctaLabel: "Voir les comparatifs",
    benefits: ["25 produits comparés", "Prix vérifiés", "Aucun sponsoring de marque"],
  },
  howItWorksTitle: "Comment on choisit",
  howItWorks: [
    {
      title: "On compare ce qui se vend vraiment",
      description:
        "Produits sélectionnés parmi les meilleures ventes et les mieux notés de leur catégorie sur Amazon.fr.",
    },
    {
      title: "On vérifie en direct",
      description:
        "Prix, disponibilité et fiche produit vérifiés au moment de la rédaction — pas depuis une base figée.",
    },
    {
      title: "On reste indépendant",
      description:
        "Aucune marque ne paie pour être recommandée. Les liens sont des liens d'affiliation Amazon, déclarés en toute transparence.",
    },
  ],
  quizIntro: {
    title: "Évaluation de l'équipement de surfcasting",
  },
  quizStepLabel: "Étape",
  resultCopy: {
    scoreLabel: "Indice d'équipement",
    classificationLabel: "Classification",
    strengthsTitle: "Points forts confirmés",
    strengthsEmpty: "Aucun point fort confirmé pour l'instant.",
    gapsTitle: "Manques identifiés",
    gapsEmpty: "Aucun manque détecté.",
    mapTitle: "Carte de l'équipement",
    mapAllClear: "Aucune catégorie ne tombe dans la zone critique.",
    mapWeakestTemplate: "Votre équipement le plus faible est {dimension}.",
    recommendationTitle: "Recommandation",
    productCtaLabel: "Voir le comparatif",
    rerunLabel: "Refaire l'évaluation",
    matchReasonTemplate: "Recommandé car vos manques les plus importants sont {gaps}.",
    matchReasonFallback: "Vous couvrez déjà l'essentiel.",
  },
  legal: {
    affiliateDisclosure:
      "Certains liens de ce site sont des liens d'affiliation Amazon. Nous pouvons percevoir une commission si vous effectuez un achat via ces liens, sans coût supplémentaire pour vous.",
    footerNote: "Ce site ne vend aucun produit directement : les achats se font sur Amazon.fr.",
    links: [
      { label: "Confidentialité", href: "/privacy" },
      { label: "Conditions", href: "/terms" },
      { label: "Affiliation", href: "/affiliate-disclosure" },
    ],
  },
};
