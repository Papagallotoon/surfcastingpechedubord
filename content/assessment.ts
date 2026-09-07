// Barème de l'évaluation Sécurité Maison : questions, pondérations, correctifs.
//
// Version française, adaptée du barème Home-Secure original. Les
// recommandations pointent vers de vrais produits Amazon déjà vérifiés
// (mêmes données que la chaîne YouTube "Sécurité Maison"), pas vers des
// références fictives.

export type LayerKey = "perimeter" | "detection" | "response" | "resilience";

// Mêmes couleurs que CATEGORIES dans content/articles.ts, pour que le
// diagramme du questionnaire et les rubriques du site restent cohérents.
export const LAYERS: Record<LayerKey, { name: string; color: string; median: number; weight: number }> = {
  perimeter: { name: "Périmètre", color: "#3B6FA0", median: 58, weight: 0.3 },
  detection: { name: "Détection", color: "#B8863D", median: 64, weight: 0.3 },
  response: { name: "Réaction", color: "#B2542F", median: 41, weight: 0.22 },
  resilience: { name: "Résilience", color: "#6B5B95", median: 33, weight: 0.18 },
};

export type Question = {
  layer: LayerKey;
  title: string;
  help: string;
  options: { label: string; value: number }[];
};

export const QUESTIONS: Question[] = [
  {
    layer: "perimeter",
    title: "Comment vos encadrements de porte extérieurs sont-ils fixés ?",
    help: "C'est l'encadrement qui cède avant la serrure. Cette seule réponse fait bouger votre indice plus que toute autre.",
    options: [
      { label: "Chambranle renforcé, ou vis de 8 cm dans le montant derrière", value: 1 },
      { label: "Serrure trois points solide, mais vis et gâche d'origine", value: 0.35 },
      { label: "Pêne simple, ou une porte que je sais déjà fragile", value: 0 },
      { label: "Aucune idée de ce qu'il y a derrière la gâche", value: 0.18 },
    ],
  },
  {
    layer: "perimeter",
    title: "Vos fenêtres du rez-de-chaussée et votre baie coulissante",
    help: "Environ un tiers des effractions constatées dans notre échantillon passent par une fenêtre ou une baie, pas par une porte.",
    options: [
      { label: "Verrouillées, plus un film ou une barre secondaire sur la baie", value: 1 },
      { label: "Verrouillées, rien au-delà de la crémone d'origine", value: 0.5 },
      { label: "Certaines restent en position entrebâillée par beau temps", value: 0.12 },
    ],
  },
  {
    layer: "detection",
    title: "Qu'est-ce qui couvre l'approche de votre maison ?",
    help: "La couverture du cheminement compte plus que la résolution à la porte.",
    options: [
      { label: "Deux caméras ou plus, enregistrant localement et dans le cloud", value: 1 },
      { label: "Une sonnette caméra, cloud uniquement", value: 0.45 },
      { label: "Une fausse caméra, ou rien du tout", value: 0.05 },
    ],
  },
  {
    layer: "detection",
    title: "Détecteurs d'ouverture et mouvement intérieur",
    help: "Les caméras vous informent après coup. Les détecteurs sont ce qui déclenche une alerte pendant l'intrusion.",
    options: [
      { label: "Chaque ouverture du rez-de-chaussée, plus un détecteur de mouvement intérieur", value: 1 },
      { label: "Porte d'entrée et porte de derrière uniquement", value: 0.5 },
      { label: "Aucun détecteur installé", value: 0 },
    ],
  },
  {
    layer: "response",
    title: "Une alarme se déclenche à 3h du matin pendant votre absence. Qui agit ?",
    help: "Une sirène sans réponse arrête une intrusion à peu près aussi souvent qu'un chien qui aboie.",
    options: [
      { label: "Centre de télésurveillance avec envoi vérifié", value: 1 },
      { label: "Une notification sur mon téléphone, c'est tout", value: 0.4 },
      { label: "Personne. La sirène sonne, un point c'est tout", value: 0.1 },
    ],
  },
  {
    layer: "response",
    title: "Avez-vous un plan pour les 90 premières secondes ?",
    help: "Où vous allez, qui vous appelez, ce que vous ne faites pas. Écrit vaut mieux que mémorisé.",
    options: [
      { label: "Oui, écrit, et tout le monde à la maison l'a lu", value: 1 },
      { label: "Vaguement convenu, jamais écrit", value: 0.4 },
      { label: "Aucun plan", value: 0 },
    ],
  },
  {
    layer: "resilience",
    title: "Une coupure de courant et d'internet de 12 heures. Qu'est-ce qui tient ?",
    help: "C'est le scénario de panne contre lequel la plupart des systèmes ne sont jamais testés.",
    options: [
      { label: "Continue d'enregistrer et d'alerter : batterie plus relais cellulaire", value: 1 },
      { label: "Enregistre localement, mais aucune alerte ne sort", value: 0.5 },
      { label: "Tout s'éteint", value: 0 },
    ],
  },
];

export type Fix = {
  gain: string;
  title: string;
  why: string;
  product: string;
  price: string;
  href: string;
  read?: { label: string; href: string };
};

export const FIXES: Record<LayerKey, Fix> = {
  perimeter: {
    gain: "+14 pts",
    title: "Passez à une serrure connectée plutôt qu'un simple verrou",
    why: "Une serrure connectée pilotable à distance élimine le risque de porte mal verrouillée en partant précipitamment, et se pose sur le cylindre existant sans perçage.",
    product: "Nuki Smart Lock Pro (4ème génération)",
    price: "149,00 €",
    href: "https://www.amazon.fr/dp/B0CK4W99Y7?tag=secure012de-21",
    read: { label: "Notre comparatif serrures et alarmes connectées", href: "/perimeter/serrures-et-alarmes-connectees" },
  },
  detection: {
    gain: "+11 pts",
    title: "Ajoutez une caméra qui enregistre sans dépendre du cloud",
    why: "Une caméra qui écrit sur sa propre carte reste utile même quand le routeur tombe — les caméras cloud uniquement s'arrêtent net à la coupure.",
    product: "TP-Link Tapo C210",
    price: "21,99 €",
    href: "https://www.amazon.fr/dp/B095CLQ1PT?tag=secure012de-21",
    read: {
      label: "Notre sélection des meilleures caméras connectées",
      href: "/detection/cameras-de-securite-connectees",
    },
  },
  response: {
    gain: "+9 pts",
    title: "Mettez un humain au bout de l'alarme",
    why: "Un envoi vérifié transforme un bruit en intervention. Les foyers avec télésurveillance voient les intrus repartir nettement plus tôt.",
    product: "Kit Ring Alarm - S",
    price: "188,99 €",
    href: "https://www.amazon.fr/dp/B08L5TWL9D?tag=secure012de-21",
    read: {
      label: "Notre comparatif serrures et alarmes connectées",
      href: "/perimeter/serrures-et-alarmes-connectees",
    },
  },
  resilience: {
    gain: "+8 pts",
    title: "Donnez à votre système sa propre autonomie",
    why: "Une caméra à panneau solaire intégré continue de fonctionner même en cas de coupure prolongée — la différence entre un système qui note une panne et un système qui continue de veiller pendant celle-ci.",
    product: "eufy Security SoloCam S340",
    price: "125,59 €",
    href: "https://www.amazon.fr/dp/B0CF8R2P24?tag=secure012de-21",
    read: { label: "Notre sélection des meilleures caméras connectées", href: "/detection/cameras-de-securite-connectees" },
  },
};

export const DISTRIBUTION = [3, 6, 11, 17, 19, 16, 12, 9, 5, 2];

export const SAMPLE_SIZE = "41 200";

export function bandFor(score: number) {
  if (score >= 85)
    return {
      title: "Blindée",
      summary:
        "Très peu de maisons obtiennent ce score. Votre risque restant tient à l'entretien et aux habitudes, pas au matériel — gardez la checklist à jour et refaites ce test chaque printemps.",
    };
  if (score >= 70)
    return {
      title: "Solide, avec un point faible",
      summary:
        "La structure est saine et un opportuniste passera son chemin. Une couche fait moins bien que les autres, c'est là qu'investir en priorité.",
    };
  if (score >= 50)
    return {
      title: "Exposée par endroits",
      summary:
        "Vous avez une vraie dissuasion sur certains axes et aucune sur d'autres, exactement le motif qu'un intrus repère le plus vite. Les failles ci-dessous méritent d'être comblées ce mois-ci.",
    };
  return {
    title: "Cible facile",
    summary:
      "En l'état, entrer ne demande ni outil ni compétence particulière. Bonne nouvelle : les deux premiers correctifs ci-dessous coûtent moins de 150 € à eux deux et vous sortent de cette tranche.",
  };
}

export function verdictFor(delta: number) {
  if (delta >= 12) return "Nettement au-dessus de la médiane — cette couche porte les autres.";
  if (delta >= 0) return "À la médiane ou juste au-dessus. Correct, sans plus.";
  if (delta >= -20) return "Sous la médiane. Un point faible qu'un intrus repère depuis le trottoir.";
  return "Très en dessous de la médiane. C'est votre point d'entrée.";
}
