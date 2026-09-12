// Registre éditorial Surfcasting Pêche du Bord (SPDB).
//
// Source de vérité unique : la home, les hubs de catégorie et les pages
// d'article lisent tous ce fichier. content/editorial.ts n'y ajoute que la
// mise en scène de la home.
//
// Chaque article compare de vrais produits Amazon.fr vérifiés en direct
// (nom, prix, ASIN, disponibilité) au moment de la rédaction : pas de banc
// d'essai fabriqué, pas de prix inventé. Un produit trouvé indisponible en
// cours de recherche (Trabucco Oceanic 8000 lot de 2) a été écarté au
// profit d'une alternative réellement en stock.

export type Category = {
  slug: string;
  label: string;
  color: string;
  blurb: string;
};

// Cinq teintes tirées d'une palette plage/océan, volontairement distinctes
// les unes des autres et de l'accent générique brand-600 utilisé pour les
// boutons/CTA du site.
export const CATEGORIES: Record<string, Category> = {
  cannes: {
    slug: "cannes",
    label: "Cannes à Surfcasting",
    color: "#8A6D4A",
    blurb: "La pièce qui décide de la distance de lancer et du confort sur une session de plusieurs heures.",
  },
  moulinets: {
    slug: "moulinets",
    label: "Moulinets",
    color: "#2E6E8E",
    blurb: "Contenance, résistance au sel et frein fiable : ce qui encaisse vraiment un poisson au bout d'un long lancer.",
  },
  montages: {
    slug: "montages",
    label: "Montages & Terminal Tackle",
    color: "#6B7280",
    blurb: "Bas de ligne, émerillons, plombs et hameçons : le petit matériel qu'on rachète le plus souvent.",
  },
  leurres: {
    slug: "leurres",
    label: "Leurres & Appâts",
    color: "#4A7A5E",
    blurb: "Ce qui déclenche la touche, du leurre articulé de marque au ver artificiel en boîte de rangement.",
  },
  accessoires: {
    slug: "accessoires",
    label: "Accessoires de Plage",
    color: "#C2542F",
    blurb: "Piquet, épuisette, sac étanche, lampe frontale : ce qui rend une session de nuit sur la plage vivable.",
  },
};

export const CATEGORY_ORDER = ["cannes", "moulinets", "montages", "leurres", "accessoires"] as const;

export type CategoryKey = keyof typeof CATEGORIES;

export type Tone = "good" | "ok" | "weak" | "bad";

export const TONE: Record<Tone, string> = {
  good: "#0E7C6E",
  ok: "#1F7E8C",
  weak: "#8A8F93",
  bad: "#B25B4A",
};

export type Block =
  | { k: "p"; text: string }
  | { k: "h2"; text: string }
  | { k: "bars"; title: string; note?: string; items: BarItem[]; max?: number }
  | { k: "scatter"; title: string; note?: string; points: Point[]; xTicks: string[]; xMin: number; xMax: number; yMin: number; yMax: number; yTicks: number[]; trend?: [number, number, number, number] }
  | { k: "split"; title: string; note?: string; left: SplitSide; right: SplitSide }
  | { k: "table"; title?: string; columns: string[]; rows: Row[] }
  | { k: "pick"; rank: string; name: string; price: string; badge: string; tone: Tone; verdict: string; pros: string[]; cons: string[]; href: string; image?: string; imageAlt?: string; imageDark?: boolean }
  | { k: "callout"; title: string; text: string }
  | { k: "steps"; title?: string; items: { title: string; text: string }[] }
  | { k: "quiz"; title: string; text: string }
  | { k: "method"; items: string[] }
  | { k: "video"; url: string; caption: string };

export type BarItem = { label: string; value: number; display: string; tone: Tone };
export type Point = { label: string; x: number; y: number; tone: Tone };
export type Row = { cells: string[]; tone?: Tone };
export type SplitSide = { label: string; value: number; display: string; caption: string; tone: Tone };

export type ArticleMeta = {
  slug: string;
  category: CategoryKey;
  kind: "comparison" | "guide" | "duel" | "checklist";
  kicker: string;
  title: string;
  excerpt: string;
  standfirst: string;
  meta: string;
  date: string;
  number: number;
  readingTime: string;
  updated: string;
  image?: string;
  imageAlt?: string;
  imageDark?: boolean;
  youtubeUrl?: string;
  facts: { value: string; label: string }[];
  blocks: Block[];
};

const METHOD_ITEMS = [
  "Produits sélectionnés parmi les meilleures ventes et les mieux notés de leur catégorie sur Amazon.fr.",
  "Prix, disponibilité et fiche produit vérifiés en direct au moment de la rédaction — pas depuis une base de données figée.",
  "Avantages et inconvénients tirés des caractéristiques réelles du produit, pas d'un test en mer que nous n'avons pas mené.",
  "Aucune marque n'a payé pour être recommandée ici. Les liens sont des liens d'affiliation Amazon : voir notre page Affiliation.",
];

export const ARTICLES: ArticleMeta[] = [
  {
    slug: "meilleures-cannes-surfcasting",
    category: "cannes",
    kind: "comparison",
    kicker: "Comparatif",
    title: "Les 5 meilleures cannes à surfcasting pour la pêche du bord",
    excerpt:
      "Du premier prix à 24 € au blank carbone PENN à 130 €, notre sélection de cannes à surfcasting pour lancer loin depuis la plage.",
    standfirst:
      "Entre 3,90 m et 4,50 m, avec une puissance de 100 à 250 g : voici cinq cannes de surfcasting qui couvrent le premier prix, le kit tout-en-un pour débuter, et la canne de marque pour qui pêche régulièrement.",
    meta: "5 produits comparés",
    date: "7 sept.",
    number: 101,
    readingTime: "6 min de lecture",
    updated: "Mis à jour le 7 septembre 2026",
    image: "/images/products/penn-wrath-ii-canne-surfcast.jpg",
    imageAlt: "Canne à pêche de surfcasting plantée sur un piquet à sable face à la mer",
    facts: [
      { value: "5", label: "cannes comparées" },
      { value: "24 € — 130 €", label: "fourchette de prix" },
      { value: "3,90 — 4,50 m", label: "longueurs courantes en surfcasting" },
    ],
    blocks: [
      {
        k: "p",
        text: "Une canne de surfcasting doit faire deux choses correctement : envoyer un plomb de 100 à 250 g le plus loin possible, et rester maniable pendant plusieurs heures plantée sur un piquet à sable. Au-delà de ces deux critères, le prix grimpe surtout avec la qualité du blank carbone et la finition des anneaux. Voici cinq cannes qui couvrent le débutant équipé pour moins de 30 € jusqu'à la canne de marque pensée pour durer.",
      },
      { k: "h2", text: "Notre sélection" },
      {
        k: "pick",
        rank: "01",
        name: "PENN Wrath II Canne à pêche Surfcast",
        price: "129,99 €",
        badge: "Meilleur Choix",
        tone: "good",
        verdict:
          "Blank réactif et composants de qualité chez une marque reconnue en pêche en mer — la valeur sûre pour qui pêche régulièrement depuis la plage.",
        pros: ["Blank solide et réactif, bon rapport qualité-prix pour la marque", "Composants de qualité (anneaux, porte-moulinet)"],
        cons: ["Plus cher que les cannes génériques du comparatif"],
        href: "https://www.amazon.fr/dp/B0CCDQKQJH?tag=surfpdb-21",
        image: "/images/products/penn-wrath-ii-canne-surfcast.jpg",
        imageAlt: "PENN Wrath II Canne à pêche Surfcast",
      },
      {
        k: "pick",
        rank: "02",
        name: "Shimano Angelrute Surfrute Sonora Surf 4,20 m",
        price: "65,00 €",
        badge: "Marque Fiable",
        tone: "good",
        verdict:
          "Shimano à un prix intermédiaire : une canne de 4,20 m qui reste dans une fourchette de prix raisonnable tout en venant d'un fabricant de référence en pêche.",
        pros: ["Marque de référence en matériel de pêche", "Longueur 4,20 m polyvalente pour la plage"],
        cons: ["Moins d'avis clients que les modèles PENN du comparatif"],
        href: "https://www.amazon.fr/dp/B07Z1R63Y1?tag=surfpdb-21",
        image: "/images/products/shimano-sonora-surf.jpg",
        imageAlt: "Shimano Sonora Surf 4,20 m",
      },
      {
        k: "pick",
        rank: "03",
        name: "Mitchell Adventure 2 Canne à pêche Surf",
        price: "24,49 €",
        badge: "Meilleur Premier Prix",
        tone: "ok",
        verdict:
          "Composite de verre résistant à l'eau salée avec guides en acier inoxydable — de quoi s'équiper pour moins de 25 € et voir si le surfcasting vous plaît avant d'investir plus.",
        pros: ["Prix d'entrée très accessible", "Composite de verre durable, guides inox résistants au sel"],
        cons: ["Moins réactive qu'un blank carbone haut de gamme"],
        href: "https://www.amazon.fr/dp/B09TTPSLZN?tag=surfpdb-21",
        image: "/images/products/mitchell-adventure-2-surf.jpg",
        imageAlt: "Mitchell Adventure 2 Canne à pêche Surf",
      },
      {
        k: "pick",
        rank: "04",
        name: "Goture Ensemble de Pêche Télescopique Complet",
        price: "59,49 €",
        badge: "Meilleur Kit Débutant",
        tone: "good",
        verdict:
          "Canne télescopique carbone 24T, moulinet, ligne et un kit d'accessoires complet dans le même carton — la manière la plus rapide de partir pêcher sans multiplier les achats séparés.",
        pros: ["Ensemble complet canne + moulinet + accessoires", "Format télescopique pratique à transporter"],
        cons: ["Moins spécialisé surfcasting qu'une canne dédiée longue distance"],
        href: "https://www.amazon.fr/dp/B0FG79GMQP?tag=surfpdb-21",
        image: "/images/products/goture-ensemble-telescopique.jpg",
        imageAlt: "Goture Ensemble de pêche télescopique complet",
      },
      {
        k: "pick",
        rank: "05",
        name: "Canne de Plage Ultimate Beachforce 100-250g",
        price: "41,95 €",
        badge: "Meilleure Distance de Lancer",
        tone: "ok",
        verdict:
          "Une puissance de lancer 100-250g pensée pour aller chercher les zones les plus profondes depuis le rivage, à un prix qui reste contenu.",
        pros: ["Puissance de lancer élevée (100-250g)", "Prix contenu pour cette gamme de puissance"],
        cons: ["Moins d'avis clients disponibles que les modèles de marque établie"],
        href: "https://www.amazon.fr/dp/B0H4ZN9NTC?tag=surfpdb-21",
        image: "/images/products/ultimate-beachforce-canne-plage.jpg",
        imageAlt: "Canne de plage Ultimate Beachforce",
      },
      {
        k: "quiz",
        title: "Vous ne savez pas par où commencer ?",
        text: "7 questions sur votre équipement actuel et votre façon de pêcher, pour savoir ce qu'il vous manque en priorité.",
      },
      { k: "h2", text: "Comment on choisit" },
      { k: "method", items: METHOD_ITEMS },
    ],
  },
  {
    slug: "meilleurs-moulinets-surfcasting",
    category: "moulinets",
    kind: "comparison",
    kicker: "Comparatif",
    title: "Les 5 meilleurs moulinets pour le surfcasting",
    excerpt:
      "PENN, Daiwa, Sakura : notre sélection de moulinets de surfcasting entre 33 € et 144 €, du premier prix au longue-distance de marque.",
    standfirst:
      "Un moulinet de surfcasting doit encaisser le sel, tenir une grande longueur de fil et lancer loin sans à-coups. Voici cinq modèles qui vont du premier prix accessible au moulinet longue distance des gammes PENN dédiées.",
    meta: "5 produits comparés",
    date: "7 sept.",
    number: 102,
    readingTime: "6 min de lecture",
    updated: "Mis à jour le 7 septembre 2026",
    image: "/images/products/penn-rival-moulinet.jpg",
    imageAlt: "Moulinet de pêche en mer monté sur une canne de surfcasting",
    facts: [
      { value: "5", label: "moulinets comparés" },
      { value: "34 € — 144 €", label: "fourchette de prix" },
      { value: "2", label: "modèles PENN dédiés long lancer" },
    ],
    blocks: [
      {
        k: "p",
        text: "En surfcasting, le moulinet encaisse à la fois le sable, le sel et des lancers répétés à pleine puissance. Une grande bobine pour loger 150 à 200 m de fil, un frein qui ne coince pas et un châssis qui ne rouille pas sont les trois points qui séparent un moulinet qui dure de celui qui grippe après une saison.",
      },
      { k: "h2", text: "Notre sélection" },
      {
        k: "pick",
        rank: "01",
        name: "PENN Rival Moulinet Spinning Long Cast",
        price: "97,03 €",
        badge: "Meilleur Choix",
        tone: "good",
        verdict:
          "Conçu spécifiquement pour le surfcasting et la pêche du bord — bobine longue distance, marque de référence, un choix qui coche toutes les cases sans exploser le budget.",
        pros: ["Conçu spécifiquement pour le long lancer en surfcasting", "Marque PENN reconnue en pêche en mer"],
        cons: ["Milieu de gamme, pas le modèle le plus premium de la marque"],
        href: "https://www.amazon.fr/dp/B08N64912R?tag=surfpdb-21",
        image: "/images/products/penn-rival-moulinet.jpg",
        imageAlt: "PENN Rival moulinet spinning long cast",
      },
      {
        k: "pick",
        rank: "02",
        name: "PENN Surfblaster III Moulinet Spinning Long Cast",
        price: "144,00 €",
        badge: "Choix Premium",
        tone: "good",
        verdict:
          "Le modèle haut de gamme de la même famille que le Rival, pensé pour le lancer longue distance répété — pour qui pêche souvent et veut du matériel qui suit sur la durée.",
        pros: ["Gamme supérieure dédiée au long lancer", "Robustesse pensée pour un usage intensif"],
        cons: ["Le plus cher du comparatif"],
        href: "https://www.amazon.fr/dp/B08MNZGVVW?tag=surfpdb-21",
        image: "/images/products/penn-surfblaster-iii-moulinet.jpg",
        imageAlt: "PENN Surfblaster III moulinet spinning long cast",
      },
      {
        k: "pick",
        rank: "03",
        name: "Sakura Alendo 201 Moulinet Baitcasting",
        price: "61,90 €",
        badge: "Meilleur Rapport Qualité-Prix",
        tone: "good",
        verdict:
          "Livré avec de la tresse, un rapport de récupération rapide et un frein correct — un moulinet baitcasting complet à un prix intermédiaire.",
        pros: ["Livré avec tresse incluse, prêt à pêcher", "Récupération rapide (7.1:1)"],
        cons: ["Le baitcasting demande un temps d'adaptation par rapport au spinning"],
        href: "https://www.amazon.fr/dp/B0DJMBQ3L4?tag=surfpdb-21",
        image: "/images/products/sakura-alendo-moulinet.jpg",
        imageAlt: "Sakura Alendo 201 moulinet baitcasting",
      },
      {
        k: "pick",
        rank: "04",
        name: "Daiwa Moulinet Leurres Crossfire 26 LT 5000",
        price: "44,90 €",
        badge: "Meilleur Premier Prix",
        tone: "ok",
        verdict:
          "Daiwa reste une marque de référence même sur son entrée de gamme — un moulinet léger et correct pour qui débute sans vouloir investir tout de suite dans du haut de gamme.",
        pros: ["Marque Daiwa reconnue, même en entrée de gamme", "Léger (290g)"],
        cons: ["Moins taillé pour le long lancer intensif que les modèles PENN dédiés"],
        href: "https://www.amazon.fr/dp/B0GPY4VG5R?tag=surfpdb-21",
        image: "/images/products/daiwa-crossfire-moulinet.jpg",
        imageAlt: "Daiwa Moulinet Leurres Crossfire 26 LT 5000",
      },
      {
        k: "pick",
        rank: "05",
        name: "Trabucco Moulinet Oceanic Surf 8000C",
        price: "33,61 €",
        badge: "Choix Éco",
        tone: "ok",
        verdict:
          "Le moins cher du comparatif chez une marque spécialisée pêche en mer — correct pour débuter le surfcasting sans gros investissement de départ.",
        pros: ["Prix le plus accessible du comparatif", "Marque Trabucco spécialisée pêche en mer"],
        cons: ["Moins de retours clients disponibles que les modèles plus vendus"],
        href: "https://www.amazon.fr/dp/B01CPP0R96?tag=surfpdb-21",
        image: "/images/products/trabucco-oceanic-surf-8000c.jpg",
        imageAlt: "Trabucco Moulinet Oceanic Surf 8000C",
      },
      {
        k: "quiz",
        title: "Votre moulinet suffit-il vraiment ?",
        text: "7 questions sur votre équipement actuel (cannes, moulinets, montages, leurres, accessoires) pour savoir où investir en premier.",
      },
      { k: "h2", text: "Comment on choisit" },
      { k: "method", items: METHOD_ITEMS },
    ],
  },
  {
    slug: "montages-terminal-tackle-surfcasting",
    category: "montages",
    kind: "comparison",
    kicker: "Comparatif",
    title: "Les 5 meilleurs kits de montages et terminal tackle pour la pêche en mer",
    excerpt:
      "Bas de ligne pré-noués, émerillons, plombs et hameçons : le petit matériel de surfcasting qui se perd et se rachète le plus souvent, entre 10 € et 17 €.",
    standfirst:
      "Le terminal tackle, c'est ce qu'on perd dans les rochers et qu'on rachète toute la saison. Voici cinq kits — montages pré-noués, émerillons, plombs et hameçons — pour reconstituer une boîte complète sans y passer des heures.",
    meta: "5 produits comparés",
    date: "7 sept.",
    number: 103,
    readingTime: "5 min de lecture",
    updated: "Mis à jour le 7 septembre 2026",
    image: "/images/products/bas-de-ligne-lot-de-6.jpg",
    imageAlt: "Montages de pêche pré-noués avec hameçons et émerillons",
    facts: [
      { value: "5", label: "kits comparés" },
      { value: "10 € — 17 €", label: "fourchette de prix" },
      { value: "300", label: "hameçons dans le plus grand assortiment" },
    ],
    blocks: [
      {
        k: "p",
        text: "En surfcasting, le terminal tackle (bas de ligne, émerillons, plombs, hameçons) est ce qui casse ou reste accroché dans les rochers en premier. Avoir une boîte bien fournie évite d'écourter une session parce qu'il ne reste plus de plomb ou d'hameçon de la bonne taille. Voici cinq kits qui couvrent l'essentiel pour reconstituer une boîte complète.",
      },
      { k: "h2", text: "Notre sélection" },
      {
        k: "pick",
        rank: "01",
        name: "Bas de Ligne Pêche en Mer Lot de 6, Montages Pré-noués",
        price: "10,99 €",
        badge: "Prêt à l'Emploi",
        tone: "good",
        verdict:
          "Six montages déjà noués aux tailles 1 et 2/0, prêts à accrocher directement au bas de ligne principal — le gain de temps sur la plage quand il faut regréer vite.",
        pros: ["Montages pré-noués, aucun nœud à faire sur place", "Deux tailles d'hameçon incluses (1 et 2/0)"],
        cons: ["Lot limité à 6 montages, à recompléter rapidement en session intensive"],
        href: "https://www.amazon.fr/dp/B0GXJ9CJGV?tag=surfpdb-21",
        image: "/images/products/bas-de-ligne-lot-de-6.jpg",
        imageAlt: "Bas de ligne pêche en mer lot de 6, montages pré-noués",
      },
      {
        k: "pick",
        rank: "02",
        name: "Realure 160 Pièces Kit Émerillons pour Surfcasting",
        price: "16,99 €",
        badge: "Meilleur Kit Complet",
        tone: "good",
        verdict:
          "160 émerillons et accessoires de montage dans une seule boîte — de quoi ne plus jamais tomber à court en pleine saison, en eau salée comme en eau douce.",
        pros: ["Grande quantité (160 pièces) pour un seul achat", "Convient eau salée et eau douce"],
        cons: ["Boîte de rangement plus volumineuse à transporter"],
        href: "https://www.amazon.fr/dp/B0BTPJ8L8M?tag=surfpdb-21",
        image: "/images/products/realure-kit-emerillons.jpg",
        imageAlt: "Realure 160 pièces kit émerillons pour surfcasting",
      },
      {
        k: "pick",
        rank: "03",
        name: "Annyswit 5 Pièces Flapper Rig Pêche en Mer",
        price: "10,99 €",
        badge: "Meilleur Double Hameçon",
        tone: "good",
        verdict:
          "Montage à double hameçon de 119 cm avec émerillon et mousqueton rapide — le format flapper rig classique pour multiplier les chances de touche par lancer.",
        pros: ["Double hameçon pour deux chances de touche par montage", "Mousqueton rapide, changement facile sur la plage"],
        cons: ["Tailles fixes (1 à 4/0), à choisir selon l'espèce visée"],
        href: "https://www.amazon.fr/dp/B0GSV93GHG?tag=surfpdb-21",
        image: "/images/products/annyswit-flapper-rig.jpg",
        imageAlt: "Annyswit 5 pièces flapper rig pêche en mer",
      },
      {
        k: "pick",
        rank: "04",
        name: "Angel Berger Lot de 5 Plombs de Surf 100g",
        price: "9,99 €",
        badge: "Meilleur Premier Prix",
        tone: "ok",
        verdict:
          "Cinq plombs de 100g au format surf classique — l'essentiel pour tenir le fond sans se ruiner, sachant que les plombs restent le poste qu'on perd le plus souvent.",
        pros: ["Prix le plus bas du comparatif", "Format 100g polyvalent pour la plupart des conditions de plage"],
        cons: ["Poids fixe à 100g, pas adapté aux courants très forts"],
        href: "https://www.amazon.fr/dp/B0DS68433W?tag=surfpdb-21",
        image: "/images/products/angel-berger-plombs-surf.jpg",
        imageAlt: "Angel Berger lot de 5 plombs de surf 100g",
      },
      {
        k: "pick",
        rank: "05",
        name: "9KM DWLIFE Lot de 300 Hameçons, 10 Tailles",
        price: "10,99 €",
        badge: "Meilleur Assortiment",
        tone: "good",
        verdict:
          "300 hameçons en acier haut carbone répartis sur 10 tailles dans une boîte de rangement compartimentée — de quoi couvrir toutes les espèces visées sans racheter pendant longtemps.",
        pros: ["300 hameçons pour un prix équivalent aux petits lots", "10 tailles différentes, boîte de rangement incluse"],
        cons: ["Qualité d'acier d'entrée de gamme par rapport à des hameçons de marque dédiée"],
        href: "https://www.amazon.fr/dp/B0FYPPF9W3?tag=surfpdb-21",
        image: "/images/products/9km-dwlife-hamecons.jpg",
        imageAlt: "9KM DWLIFE lot de 300 hameçons, 10 tailles",
      },
      {
        k: "quiz",
        title: "Votre boîte à pêche est-elle vraiment complète ?",
        text: "7 questions sur votre équipement actuel et votre façon de pêcher, pour savoir ce qu'il vous manque en priorité.",
      },
      { k: "h2", text: "Comment on choisit" },
      { k: "method", items: METHOD_ITEMS },
    ],
  },
  {
    slug: "meilleurs-leurres-appats-peche-du-bord",
    category: "leurres",
    kind: "comparison",
    kicker: "Comparatif",
    title: "Les 5 meilleurs leurres et appâts pour la pêche du bord",
    excerpt:
      "Du Rapala X-Rap Saltwater plébiscité par plus de 1 600 avis à la boîte de 350 vers artificiels, notre sélection de leurres et appâts pour pêcher depuis la plage.",
    standfirst:
      "Entre le leurre de marque testé par des milliers de pêcheurs et la boîte d'appâts artificiels en grande quantité pour varier les approches, voici cinq références pour la pêche du bord, du budget serré au leurre premium.",
    meta: "5 produits comparés",
    date: "7 sept.",
    number: 104,
    readingTime: "6 min de lecture",
    updated: "Mis à jour le 7 septembre 2026",
    image: "/images/products/rapala-x-rap-saltwater.jpg",
    imageAlt: "Leurres de pêche en mer de plusieurs couleurs posés sur du sable",
    facts: [
      { value: "5", label: "références comparées" },
      { value: "10 € — 20 €", label: "fourchette de prix" },
      { value: "1 600+", label: "avis clients sur le leurre le mieux noté" },
    ],
    blocks: [
      {
        k: "p",
        text: "Un bon leurre déclenche une touche qu'un appât mort n'aurait pas provoquée ; un appât en grande quantité permet de varier sans compter chaque pièce perdue dans les rochers. Voici cinq références qui couvrent le leurre de marque plébiscité par des milliers d'avis jusqu'à la boîte d'appâts artificiels en grand format pour les sessions longues.",
      },
      { k: "h2", text: "Notre sélection" },
      {
        k: "pick",
        rank: "01",
        name: "Rapala X-Rap Saltwater",
        price: "15,95 €",
        badge: "Meilleur Choix",
        tone: "good",
        verdict:
          "Plus de 1 600 avis et une note de 4,6/5 : le leurre coulant Rapala pensé pour les gros prédateurs en mer reste une valeur sûre quasi unanime chez les pêcheurs du bord.",
        pros: ["Marque Rapala, référence mondiale du leurre", "Plus de 1 600 avis clients, très bien noté"],
        cons: ["Modèle disponible en plusieurs couleurs, bien choisir la teinte adaptée aux conditions"],
        href: "https://www.amazon.fr/dp/B01JK7PS6E?tag=surfpdb-21",
        image: "/images/products/rapala-x-rap-saltwater.jpg",
        imageAlt: "Rapala X-Rap Saltwater",
      },
      {
        k: "pick",
        rank: "02",
        name: "TSURI Pack 3 Leurres Pêche en Mer",
        price: "19,99 €",
        badge: "Kit Polyvalent",
        tone: "good",
        verdict:
          "Un stickbait coulant et un jerkbait dans le même pack, pensés pour le bar aussi bien depuis le bord qu'en bateau — de quoi varier les animations sans multiplier les achats.",
        pros: ["Trois leurres de types différents dans un seul pack", "Spécial bar, polyvalent bord et bateau"],
        cons: ["Prix par leurre plus élevé qu'un lot en grande quantité"],
        href: "https://www.amazon.fr/dp/B0D5CYWK59?tag=surfpdb-21",
        image: "/images/products/tsuri-pack-3-leurres.jpg",
        imageAlt: "TSURI Pack 3 leurres pêche en mer",
      },
      {
        k: "pick",
        rank: "03",
        name: "HOTUT Leurres de Pêche Souples 5 pièces, T-Tail",
        price: "10,99 €",
        badge: "Meilleur Rapport Qualité-Prix",
        tone: "good",
        verdict:
          "Cinq leurres souples à queue en T pré-montés sur tête plombée, prêts à l'emploi pour le bar et la truite — le bon compromis prix/nombre de pièces.",
        pros: ["Pré-montés sur tête plombée, prêts à pêcher", "Prix accessible pour 5 leurres"],
        cons: ["Souple, donc plus fragile qu'un leurre dur après plusieurs touches"],
        href: "https://www.amazon.fr/dp/B0D83X2GYS?tag=surfpdb-21",
        image: "/images/products/hotut-leurres-5-pieces.jpg",
        imageAlt: "HOTUT leurres de pêche souples 5 pièces, T-Tail",
      },
      {
        k: "pick",
        rank: "04",
        name: "87 Pièces Leurre Souple Barracuda, Kit Complet",
        price: "14,99 €",
        badge: "Meilleur Assortiment",
        tone: "good",
        verdict:
          "87 pièces incluant têtes plombées et leurres souples en plusieurs tailles (6,3/9/12 cm) — l'option la plus complète pour qui veut tester plusieurs profils sans se ruiner.",
        pros: ["87 pièces pour moins de 15 €, très bon rapport quantité/prix", "Plusieurs tailles incluses dans le même kit"],
        cons: ["Qualité de plastique d'entrée de gamme par rapport à un leurre de marque"],
        href: "https://www.amazon.fr/dp/B0GDX497HT?tag=surfpdb-21",
        image: "/images/products/barracuda-87-pieces-leurres.jpg",
        imageAlt: "87 pièces leurre souple Barracuda, kit complet",
      },
      {
        k: "pick",
        rank: "05",
        name: "LIULINY 350 Pièces Ver Terre Artificiel",
        price: "11,99 €",
        badge: "Meilleur Premier Prix",
        tone: "ok",
        verdict:
          "350 vers artificiels réalistes rangés dans une boîte compartimentée — l'option la plus économique par pièce pour les sessions où l'on perd beaucoup d'appâts.",
        pros: ["350 pièces pour un prix très accessible", "Boîte de rangement compartimentée incluse"],
        cons: ["Appât artificiel générique, moins spécifique surfcasting que les autres picks"],
        href: "https://www.amazon.fr/dp/B0G1336843?tag=surfpdb-21",
        image: "/images/products/liuliny-vers-artificiels.jpg",
        imageAlt: "LIULINY 350 pièces ver terre artificiel",
      },
      {
        k: "quiz",
        title: "Quel leurre pour votre spot ?",
        text: "7 questions sur votre équipement actuel et votre façon de pêcher (roche, plage, ponton), pour savoir où investir en priorité.",
      },
      { k: "h2", text: "Comment on choisit" },
      { k: "method", items: METHOD_ITEMS },
    ],
  },
  {
    slug: "accessoires-indispensables-surfcasting",
    category: "accessoires",
    kind: "comparison",
    kicker: "Comparatif",
    title: "Les 5 accessoires indispensables pour la pêche en surfcasting",
    excerpt:
      "Piquet à sable, épuisette, sac étanche, lampe frontale et pince multifonction : le petit équipement qui change vraiment une session de surfcasting.",
    standfirst:
      "Au-delà de la canne et du moulinet, ce sont ces cinq accessoires qui rendent une session de plusieurs heures sur la plage — souvent de nuit — réellement confortable et efficace.",
    meta: "5 produits comparés",
    date: "7 sept.",
    number: 105,
    readingTime: "5 min de lecture",
    updated: "Mis à jour le 7 septembre 2026",
    image: "/images/products/matein-sac-peche.jpg",
    imageAlt: "Sac de pêche et accessoires posés sur le sable près d'une canne à surfcasting",
    facts: [
      { value: "5", label: "accessoires comparés" },
      { value: "13 € — 46 €", label: "fourchette de prix" },
      { value: "13,4k+", label: "avis clients sur la lampe frontale la mieux notée" },
    ],
    blocks: [
      {
        k: "p",
        text: "Le surfcasting se pratique souvent de nuit ou tôt le matin, avec plusieurs cannes plantées sur la plage pendant des heures. Ces cinq accessoires ne remplacent pas la canne et le moulinet, mais ce sont eux qui déterminent si la session reste confortable — ou si on rentre trempé, les mains pleines de sable, sans avoir pu décrocher un poisson proprement.",
      },
      { k: "h2", text: "Notre sélection" },
      {
        k: "pick",
        rank: "01",
        name: "Reggi Cannes Piquet Porte-canne Surfcasting de Plage",
        price: "13,91 €",
        badge: "Indispensable",
        tone: "good",
        verdict:
          "Disponible en 150, 100 et 75 cm pour s'adapter à la fermeté du sable — le premier achat pour planter une canne de surfcasting sans la tenir en main pendant des heures.",
        pros: ["Trois longueurs disponibles selon le type de sol", "Pointe adaptée à l'enfoncement dans le sable"],
        cons: ["Un seul piquet ; prévoir plusieurs unités pour plusieurs cannes"],
        href: "https://www.amazon.fr/dp/B0B6CSQPLH?tag=surfpdb-21",
        image: "/images/products/reggi-piquet-porte-canne.jpg",
        imageAlt: "Reggi Cannes piquet porte-canne surfcasting de plage",
      },
      {
        k: "pick",
        rank: "02",
        name: "Épuisette de Pêche Pliable Télescopique 130-205 cm",
        price: "15,99 €",
        badge: "Meilleur Premier Prix",
        tone: "ok",
        verdict:
          "Manche télescopique en acier inoxydable extensible jusqu'à 205 cm, pliable pour le transport — pratique pour sortir un poisson de l'eau sans s'approcher du bord mouillé.",
        pros: ["Manche extensible jusqu'à 205 cm", "Pliable, facile à transporter sur la plage"],
        cons: ["Peu d'avis clients disponibles sur ce modèle"],
        href: "https://www.amazon.fr/dp/B0DSFV3NDJ?tag=surfpdb-21",
        image: "/images/products/wangdefu-epuisette-telescopique.jpg",
        imageAlt: "Épuisette de pêche pliable télescopique",
      },
      {
        k: "pick",
        rank: "03",
        name: "MATEIN Sac de Pêche avec Porte-Canne, Étanche",
        price: "45,99 €",
        badge: "Meilleur Rangement",
        tone: "good",
        verdict:
          "Plus de 1 200 avis clients pour ce sac à dos étanche avec porte-canne et compartiment isotherme — le plus abouti du comparatif pour centraliser tout le matériel en un seul sac.",
        pros: ["Plus de 1 200 avis clients, très bien noté", "Étanche, avec porte-canne et compartiment isotherme intégrés"],
        cons: ["Le plus cher du comparatif accessoires"],
        href: "https://www.amazon.fr/dp/B0G397T9P2?tag=surfpdb-21",
        image: "/images/products/matein-sac-peche.jpg",
        imageAlt: "MATEIN sac de pêche avec porte-canne, étanche",
      },
      {
        k: "pick",
        rank: "04",
        name: "Blukar Lampe Frontale Rechargeable 2000 Lumens",
        price: "12,99 €",
        badge: "Indispensable Pêche de Nuit",
        tone: "good",
        verdict:
          "Plus de 13 000 avis clients, étanche IPX5 et 30h d'autonomie : la référence grand public pour monter un montage ou décrocher un poisson dans le noir, mains libres.",
        pros: ["Plus de 13 000 avis clients, très largement éprouvée", "Étanche IPX5, 30h d'autonomie, mains libres"],
        cons: ["Non spécifique pêche : pas de mode lumière rouge dédié à la préservation de la vision nocturne"],
        href: "https://www.amazon.fr/dp/B0CBPHGWJ2?tag=surfpdb-21",
        image: "/images/products/blukar-lampe-frontale.jpg",
        imageAlt: "Blukar lampe frontale rechargeable 2000 lumens",
      },
      {
        k: "pick",
        rank: "05",
        name: "FLISSA Pince de Pêche Multifonction 19 cm",
        price: "21,99 €",
        badge: "Choix Amazon",
        tone: "good",
        verdict:
          "Outil 6-en-1 (pince, ouvre-anneau, extracteur d'hameçon, coupe-ligne) en acier inoxydable avec étui et mousqueton — badge \"Choix d'Amazon\" et plus de 220 avis à l'appui.",
        pros: ["Badge Choix d'Amazon, plus de 220 avis clients", "6 fonctions en un seul outil, livré avec étui"],
        cons: ["Format 19 cm à ranger avec le reste du matériel, pas de clip ceinture inclus"],
        href: "https://www.amazon.fr/dp/B0DHRFRLFV?tag=surfpdb-21",
        image: "/images/products/flissa-pince-peche.jpg",
        imageAlt: "FLISSA pince de pêche multifonction 19 cm",
      },
      {
        k: "quiz",
        title: "Avez-vous vraiment tout ce qu'il faut ?",
        text: "7 questions sur votre équipement actuel et votre façon de pêcher, pour savoir ce qu'il vous manque en priorité.",
      },
      { k: "h2", text: "Comment on choisit" },
      { k: "method", items: METHOD_ITEMS },
    ],
  },

  {
    slug: "meilleurs-waders-cuissardes-peche-du-bord",
    category: "accessoires",
    kind: "comparison",
    kicker: "Comparatif",
    title: "Les 5 meilleurs waders et cuissardes pour la pêche du bord",
    excerpt:
      "Rester au sec plusieurs heures dans l'eau froide, c'est souvent ce qui change tout en pêche du bord : notre sélection de waders et cuissardes, du premier prix au modèle double couche.",
    standfirst:
      "Du caoutchouc premier prix au PVC double couche plus résistant aux rochers, cinq waders et cuissardes pour rester au sec en pêchant depuis la plage ou les rochers, de 27 € à 56 €.",
    meta: "5 produits comparés",
    date: "11 sept.",
    number: 106,
    readingTime: "5 min de lecture",
    updated: "Mis à jour le 11 septembre 2026",
    image: "/images/products/drfish-waders-pvc-double-couche.jpg",
    imageAlt: "Pêcheur équipé de waders en pêche du bord",
    facts: [
      { value: "5", label: "waders comparés" },
      { value: "27 € — 56 €", label: "fourchette de prix" },
      { value: "2/5", label: "avec bottes intégrées" },
    ],
    blocks: [
      {
        k: "p",
        text: "Le choix se fait surtout entre le caoutchouc (moins cher, plus lourd, résiste bien aux rochers) et le textile respirant (plus confortable en usage prolongé, mais moins résistant aux frottements). Le PVC double couche est le compromis le plus solide du comparatif.",
      },
      { k: "h2", text: "Notre sélection" },
      {
        k: "pick",
        rank: "01",
        name: "Omega Waders Taille 43-46",
        price: "26,99 €",
        badge: "Meilleur premier prix",
        tone: "ok",
        verdict: "Le prix le plus bas du comparatif, en caoutchouc avec semelle antidérapante incluse.",
        pros: ["Prix le plus bas du comparatif", "Semelle antidérapante incluse"],
        cons: ["Caoutchouc moins respirant que les modèles textile"],
        href: "https://www.amazon.fr/dp/B0F43GCZR9?tag=surfpdb-21",
        image: "/images/products/omega-waders-peche.jpg",
        imageAlt: "Omega Waders Taille 43-46",
      },
      {
        k: "pick",
        rank: "02",
        name: "QWORK Cuissardes Imperméables et Respirantes",
        price: "42,73 €",
        badge: "Meilleur confort",
        tone: "good",
        verdict: "Matière respirante, plus confortable en usage prolongé, avec une bonne note pour ce prix.",
        pros: ["Matière respirante, plus confortable en usage prolongé", "Bonne note sur ce prix"],
        cons: ["Moins robuste que le PVC double couche face aux rochers"],
        href: "https://www.amazon.fr/dp/B0DRK1R3G6?tag=surfpdb-21",
        image: "/images/products/qwork-cuissardes-peche.jpg",
        imageAlt: "QWORK Cuissardes Imperméables et Respirantes",
      },
      {
        k: "pick",
        rank: "03",
        name: "Dr.Fish Waders avec Bottes, PVC Double Couche",
        price: "55,99 €",
        badge: "Le plus résistant",
        tone: "good",
        verdict: "PVC double couche, le plus résistant aux rochers et coquillages, avec poche poitrine et sangles réglables.",
        pros: ["PVC double couche, plus résistant aux rochers et coquillages", "Poche poitrine et sangles réglables"],
        cons: ["Le plus cher du comparatif"],
        href: "https://www.amazon.fr/dp/B0DQW1Z32Y?tag=surfpdb-21",
        image: "/images/products/drfish-waders-pvc-double-couche.jpg",
        imageAlt: "Dr.Fish Waders avec Bottes, PVC Double Couche",
      },
      {
        k: "pick",
        rank: "04",
        name: "Night Cat Waders Poitrine Crosswater",
        price: "50,99 €",
        badge: "Bottes intégrées",
        tone: "good",
        verdict: "Matière respirante avec bottes intégrées et bonne tenue en eau froide.",
        pros: ["Matière respirante, bottes intégrées", "Bonne tenue en eau froide"],
        cons: ["Taille à bien vérifier avant achat"],
        href: "https://www.amazon.fr/dp/B0FPQT2LZP?tag=surfpdb-21",
        image: "/images/products/nightcat-waders-crosswater.jpg",
        imageAlt: "Night Cat Waders Poitrine Crosswater",
      },
      {
        k: "pick",
        rank: "05",
        name: "SWAWIS Cuissardes Waders Poitrine",
        price: "51,99 €",
        badge: "Protection maximale",
        tone: "ok",
        verdict: "Format poitrine pour une protection maximale, avec bretelles réglables.",
        pros: ["Format poitrine, protection maximale", "Bretelles réglables"],
        cons: ["Note un peu en retrait sur ce modèle"],
        href: "https://www.amazon.fr/dp/B0G2VVPDZN?tag=surfpdb-21",
        image: "/images/products/swawis-cuissardes-waders.jpg",
        imageAlt: "SWAWIS Cuissardes Waders Poitrine",
      },
      { k: "h2", text: "Comment on choisit" },
      { k: "method", items: METHOD_ITEMS },
    ],
  },

  {
    slug: "meilleurs-gilets-securite-peche-du-bord",
    category: "accessoires",
    kind: "comparison",
    kicker: "Comparatif",
    title: "Les 5 meilleurs gilets de sécurité et de flottaison pour la pêche du bord",
    excerpt:
      "Du gilet de flottaison certifié norme européenne à 46 € au gilet de sauvetage gonflable spécial pêche à 75 €, notre sélection pour pêcher en sécurité sur les rochers ou en wading.",
    standfirst:
      "Pêcher sur les rochers, en wading ou tard le soir augmente le risque de chute à l'eau. Voici cinq gilets, du modèle en mousse certifié norme européenne au gilet de sauvetage gonflable pensé spécifiquement pour la pêche, pour pêcher plus tranquille.",
    meta: "5 produits comparés",
    date: "12 sept.",
    number: 107,
    readingTime: "5 min de lecture",
    updated: "Mis à jour le 12 septembre 2026",
    image: "/images/products/leader-accessories-gilet-flottaison.jpg",
    imageAlt: "Gilet de flottaison porté par un pêcheur du bord près de l'eau",
    facts: [
      { value: "5", label: "gilets comparés" },
      { value: "46 € — 75 €", label: "fourchette de prix" },
      { value: "50N — 170N", label: "flottabilité selon les modèles" },
    ],
    blocks: [
      {
        k: "p",
        text: "Pêcher sur les rochers, en wading ou de nuit expose à un risque réel de chute à l'eau. Un gilet de flottaison ne remplace pas la prudence, mais il change tout en cas de problème. Entre le gilet en mousse classique, certifié norme européenne, et le gilet de sauvetage gonflable pensé spécifiquement pour la pêche, voici cinq références qui couvrent l'essentiel sans exploser le budget.",
      },
      { k: "h2", text: "Notre sélection" },
      {
        k: "pick",
        rank: "01",
        name: "Leader Accessories Gilet de Flottaison Adulte Certifié Sécurité Européenne",
        price: "45,99 €",
        badge: "Meilleur Premier Prix",
        tone: "ok",
        verdict:
          "Léger et compact, avec fixation à 3 points et bandes réfléchissantes, ce gilet certifié norme de sécurité européenne reste le moins cher du comparatif.",
        pros: ["Certifié norme de sécurité européenne", "Léger et compact, fixation à 3 points avec bandes réfléchissantes"],
        cons: ["Moins d'avis clients que les modèles plus vendus du comparatif"],
        href: "https://www.amazon.fr/dp/B015O2TP86?tag=surfpdb-21",
        image: "/images/products/leader-accessories-gilet-flottaison.jpg",
        imageAlt: "Leader Accessories Gilet de Flottaison Adulte Certifié Sécurité Européenne",
      },
      {
        k: "pick",
        rank: "02",
        name: "Mesle Gilet de Flottaison Pêche Fisherman avec Poches, 50N",
        price: "46,99 €",
        badge: "Pensé Pour la Pêche",
        tone: "good",
        verdict:
          "Une flottabilité de 50N adaptée de 40 à 150 kg et des poches intégrées pour ranger le petit matériel directement sur soi — un gilet conçu pour la pêche plutôt qu'adapté d'un usage nautique générique.",
        pros: ["Flottabilité 50N adaptée de 40 à 150 kg", "Poches intégrées pour ranger le petit matériel"],
        cons: ["Note moyenne un peu en retrait sur ce modèle"],
        href: "https://www.amazon.fr/dp/B0942XKXHC?tag=surfpdb-21",
        image: "/images/products/mesle-gilet-flottaison-peche.jpg",
        imageAlt: "Mesle Gilet de Flottaison Pêche Fisherman avec Poches",
      },
      {
        k: "pick",
        rank: "03",
        name: "Owntop Gilet de Flottaison en Mousse avec Sangle d'Entrejambe",
        price: "54,99 €",
        badge: "Le Plus Confortable",
        tone: "good",
        verdict:
          "La sangle d'entrejambe évite au gilet de remonter en cas de chute à l'eau, et la poche intérieure permet de garder un téléphone au sec — plus de 4,6/5 en moyenne sur ce modèle.",
        pros: ["Sangle d'entrejambe pour un maintien sûr", "Poche intérieure pratique, plus de 4,6/5 en moyenne"],
        cons: ["Milieu de gamme, ni le moins cher ni le plus technique du comparatif"],
        href: "https://www.amazon.fr/dp/B0DKTL3796?tag=surfpdb-21",
        image: "/images/products/owntop-gilet-flottaison-mousse.jpg",
        imageAlt: "Owntop Gilet de Flottaison en Mousse avec Sangle d'Entrejambe",
      },
      {
        k: "pick",
        rank: "04",
        name: "12skipper Gilet de Sauvetage Automatique Waistbelt 165N",
        price: "64,90 €",
        badge: "Déclenchement Automatique",
        tone: "good",
        verdict:
          "Ce gilet se déclenche automatiquement en cas de chute à l'eau, sans action de l'utilisateur, dans un format ceinture qui ne gêne pas les gestes de pêche.",
        pros: ["Déclenchement automatique en cas de chute à l'eau", "Format ceinture compact, peu encombrant pour pêcher"],
        cons: ["Plus cher qu'un simple gilet en mousse, cartouche à vérifier régulièrement"],
        href: "https://www.amazon.fr/dp/B08HH7YV2N?tag=surfpdb-21",
        image: "/images/products/12skipper-gilet-sauvetage-automatique.jpg",
        imageAlt: "12skipper Gilet de Sauvetage Automatique Waistbelt 165N",
      },
      {
        k: "pick",
        rank: "05",
        name: "Orange Marine Gilet de Sauvetage Gonflable Manuel 170N Spécial Pêche",
        price: "75,00 €",
        badge: "Spécial Pêche",
        tone: "good",
        verdict:
          "Conforme à la norme marine ISO 12402-3 avec une flottabilité de 170N, ce gilet gonflable réarmable est conçu spécifiquement pour la pêche — le plus cher du comparatif, mais aussi le plus complet.",
        pros: ["170N conforme à la norme marine ISO 12402-3", "Conçu spécifiquement pour la pêche, réarmable"],
        cons: ["Le plus cher du comparatif"],
        href: "https://www.amazon.fr/dp/B08NCS2Y6K?tag=surfpdb-21",
        image: "/images/products/orangemarine-gilet-sauvetage-gonflable.jpg",
        imageAlt: "Orange Marine Gilet de Sauvetage Gonflable Manuel 170N Spécial Pêche",
      },
      { k: "h2", text: "Comment on choisit" },
      { k: "method", items: METHOD_ITEMS },
    ],
  },

  {
    slug: "meilleurs-sacs-transport-peche-du-bord",
    category: "accessoires",
    kind: "comparison",
    kicker: "Comparatif",
    title: "Les 5 meilleurs sacs de transport pour la pêche du bord",
    excerpt:
      "Du sac à dos premier prix à 27 € au sac étanche Savage Gear à 99 €, notre sélection de sacs pour transporter cannes, boîtes et accessoires jusqu'au spot.",
    standfirst:
      "Entre le sac à dos compact pour une session courte et le sac étanche 45 litres pour partir à la journée, voici cinq sacs de pêche du bord qui couvrent le premier prix accessible jusqu'au modèle de marque spécialisée pêche en mer.",
    meta: "5 produits comparés",
    date: "12 sept.",
    number: 108,
    readingTime: "5 min de lecture",
    updated: "Mis à jour le 12 septembre 2026",
    image: "/images/products/rainsmore-sac-dos-peche-45l.jpg",
    imageAlt: "Sac à dos de pêche posé sur le sable avec une canne à surfcasting",
    facts: [
      { value: "5", label: "sacs comparés" },
      { value: "27 € — 99 €", label: "fourchette de prix" },
      { value: "23 — 45 L", label: "contenance selon les modèles" },
    ],
    blocks: [
      {
        k: "p",
        text: "Un bon sac de pêche du bord doit porter la canne, les boîtes et le reste du matériel sans tout renverser sur le sable au premier tour de bretelle. Voici cinq sacs à dos, du modèle premier prix avec simple support de canne jusqu'au sac étanche de marque spécialisée pêche en mer, pour transporter tout son équipement jusqu'au spot.",
      },
      { k: "h2", text: "Notre sélection" },
      {
        k: "pick",
        rank: "01",
        name: "MoKo Sac à Dos de Pêche avec Support pour Canne",
        price: "26,99 €",
        badge: "Meilleur Premier Prix",
        tone: "ok",
        verdict:
          "Un support intégré pour la canne et du nylon imperméable pour un prix d'entrée accessible — de quoi s'équiper sans gros budget pour commencer.",
        pros: ["Prix d'entrée le plus accessible du comparatif", "Support intégré pour la canne à pêche, nylon imperméable"],
        cons: ["Contenance plus limitée que les sacs 40-45 L du comparatif"],
        href: "https://www.amazon.fr/dp/B0DRFBLL92?tag=surfpdb-21",
        image: "/images/products/moko-sac-dos-peche.jpg",
        imageAlt: "MoKo Sac à Dos de Pêche avec Support pour Canne",
      },
      {
        k: "pick",
        rank: "02",
        name: "QKTYB Sac de Pêche Grande Taille avec Porte-Canne",
        price: "35,99 €",
        badge: "Grande Contenance",
        tone: "good",
        verdict:
          "Format 45 x 30 x 25 cm et tissu Oxford résistant avec de multiples poches — de la place pour répartir cannes, boîtes et vêtements de rechange.",
        pros: ["Grande contenance, format 45 x 30 x 25 cm", "Multi-poches en tissu Oxford résistant"],
        cons: ["Pas de housse de pluie incluse contrairement à d'autres modèles du comparatif"],
        href: "https://www.amazon.fr/dp/B0DWSTWV7D?tag=surfpdb-21",
        image: "/images/products/qktyb-sac-peche-porte-canne.jpg",
        imageAlt: "QKTYB Sac de Pêche Grande Taille avec Porte-Canne",
      },
      {
        k: "pick",
        rank: "03",
        name: "Rainsmore Sac à Dos de Pêche 45L avec Porte-Canne et Housse de Pluie",
        price: "46,86 €",
        badge: "Meilleur Rapport Qualité-Prix",
        tone: "good",
        verdict:
          "45 litres de contenance et une housse de pluie incluse pour un prix qui reste raisonnable — plus de 4,7/5 en moyenne sur ce modèle.",
        pros: ["45 litres de contenance, plus de 4,7/5 en moyenne", "Housse de pluie incluse"],
        cons: ["Milieu de gamme, moins spécialisé qu'un sac de marque pêche dédiée"],
        href: "https://www.amazon.fr/dp/B0GGRFH5MV?tag=surfpdb-21",
        image: "/images/products/rainsmore-sac-dos-peche-45l.jpg",
        imageAlt: "Rainsmore Sac à Dos de Pêche 45L avec Porte-Canne et Housse de Pluie",
      },
      {
        k: "pick",
        rank: "04",
        name: "Skysper Sac à Dos de Pêche 40L avec Porte-Cannes",
        price: "55,99 €",
        badge: "Le Plus Polyvalent",
        tone: "good",
        verdict:
          "40 litres répartis en compartiments réglables avec porte-cannes intégré — pratique pour organiser le matériel plutôt que tout entasser en vrac.",
        pros: ["40 litres, compartiment réglable pour le matériel", "Porte-cannes intégré"],
        cons: ["Plus cher que les sacs premier prix du comparatif"],
        href: "https://www.amazon.fr/dp/B0FGHKBKTQ?tag=surfpdb-21",
        image: "/images/products/skysper-sac-dos-peche-40l.jpg",
        imageAlt: "Skysper Sac à Dos de Pêche 40L avec Porte-Cannes",
      },
      {
        k: "pick",
        rank: "05",
        name: "Savage Gear Sac à Dos de Pêche Étanche 23L",
        price: "98,90 €",
        badge: "Le Plus Premium",
        tone: "good",
        verdict:
          "Savage Gear est une marque de référence en pêche en mer : ce sac étanche à compartiments multiples protégés contre les UV est le plus cher du comparatif, mais aussi le plus abouti.",
        pros: ["Marque de référence en pêche en mer", "Compartiments multiples protégés contre les UV"],
        cons: ["Le plus cher du comparatif, contenance plus réduite (23 L) que les sacs 40-45 L"],
        href: "https://www.amazon.fr/dp/B09KHFHQXV?tag=surfpdb-21",
        image: "/images/products/savage-gear-sac-dos-peche-etanche.jpg",
        imageAlt: "Savage Gear Sac à Dos de Pêche Étanche 23L",
      },
      { k: "h2", text: "Comment on choisit" },
      { k: "method", items: METHOD_ITEMS },
    ],
  },

  {
    slug: "meilleures-boites-rangement-peche-du-bord",
    category: "accessoires",
    kind: "comparison",
    kicker: "Comparatif",
    title: "Les 5 meilleures boîtes de rangement pour le matériel de pêche du bord",
    excerpt:
      "De la boîte Plano à moins de 10 € à la mallette hybride Plano Hip 3 à 85 €, notre sélection de boîtes pour ranger hameçons, leurres et montages sans tout perdre dans le sable.",
    standfirst:
      "Entre la simple boîte double face pour trier les hameçons et la mallette hybride complète pour tout centraliser, voici cinq boîtes de rangement, chez des marques reconnues du rangement de pêche, pour ne plus fouiller dans un sac en vrac sur la plage.",
    meta: "5 produits comparés",
    date: "12 sept.",
    number: 109,
    readingTime: "5 min de lecture",
    updated: "Mis à jour le 12 septembre 2026",
    image: "/images/products/plano-stowaway-3500-boite-rangement.jpg",
    imageAlt: "Boîte de rangement de pêche ouverte avec des leurres et hameçons triés",
    facts: [
      { value: "5", label: "boîtes comparées" },
      { value: "10 € — 85 €", label: "fourchette de prix" },
      { value: "4", label: "marques reconnues en pêche (Plano, Rapala, Meiho, Korda)" },
    ],
    blocks: [
      {
        k: "p",
        text: "Le petit matériel de pêche du bord (hameçons, émerillons, leurres, plombs) se perd vite quand il traîne en vrac au fond d'un sac. Une bonne boîte de rangement compartimentée évite d'y passer dix minutes à chaque changement de montage. Voici cinq boîtes, de la simple boîte double face premier prix jusqu'à la mallette hybride complète, chez des marques qui font référence dans le rangement de pêche.",
      },
      { k: "h2", text: "Notre sélection" },
      {
        k: "pick",
        rank: "01",
        name: "Plano Stowaway 3500 Boîte de Rangement Double Face",
        price: "9,99 €",
        badge: "Meilleur Premier Prix",
        tone: "ok",
        verdict:
          "Des compartiments transparents double face chez Plano, marque historique du rangement de pêche, pour moins de 10 € — la boîte la plus accessible du comparatif.",
        pros: ["Prix le plus bas du comparatif", "Compartiments transparents double face"],
        cons: ["Format simple, sans plateaux multiples ni poignée de transport"],
        href: "https://www.amazon.fr/dp/B000Y89C6G?tag=surfpdb-21",
        image: "/images/products/plano-stowaway-3500-boite-rangement.jpg",
        imageAlt: "Plano Stowaway 3500 Boîte de Rangement Double Face",
      },
      {
        k: "pick",
        rank: "02",
        name: "Rapala Tackle Tray 276 Boîte de Pêche Robuste",
        price: "12,99 €",
        badge: "Le Plus Robuste",
        tone: "good",
        verdict:
          "Fabriquée en Finlande par Rapala, référence mondiale de la pêche, cette boîte au format 27,6 x 18 cm est pensée pour encaisser les chocs sur le terrain.",
        pros: ["Marque Rapala, référence en pêche", "Fabriquée en Finlande, format robuste 27,6 x 18 cm"],
        cons: ["Un seul niveau de rangement, moins modulable qu'un système à tiroirs"],
        href: "https://www.amazon.fr/dp/B0BHL1JFKV?tag=surfpdb-21",
        image: "/images/products/rapala-tackle-tray-276.jpg",
        imageAlt: "Rapala Tackle Tray 276 Boîte de Pêche Robuste",
      },
      {
        k: "pick",
        rank: "03",
        name: "Meiho Tackle Box Versus VS-820 Boîte de Rangement",
        price: "13,90 €",
        badge: "Meilleure Qualité de Fabrication",
        tone: "good",
        verdict:
          "Meiho est une marque japonaise réputée pour la finition de ses boîtes de rangement — un format compact de 23 x 12 x 3 cm facile à glisser dans un sac.",
        pros: ["Marque japonaise Meiho, référence qualité", "Format compact 23 x 12 x 3 cm"],
        cons: ["Capacité réduite, pensée pour un montage ciblé plutôt que tout le matériel"],
        href: "https://www.amazon.fr/dp/B000B6EM3E?tag=surfpdb-21",
        image: "/images/products/meiho-tackle-box-vs820.jpg",
        imageAlt: "Meiho Tackle Box Versus VS-820 Boîte de Rangement",
      },
      {
        k: "pick",
        rank: "04",
        name: "Korda Basix Boîte de Rangement Transparente",
        price: "34,25 €",
        badge: "Mieux Notée",
        tone: "good",
        verdict:
          "Plus de 4,8/5 en note moyenne pour cette boîte transparente Korda, marque bien installée chez les pêcheurs à la carpe et en mer — facile de repérer le bon compartiment d'un coup d'œil.",
        pros: ["Plus de 4,8/5 en note moyenne", "Compartiments transparents pour repérer le matériel"],
        cons: ["Plus cher que les boîtes simples du comparatif"],
        href: "https://www.amazon.fr/dp/B09B2C45KN?tag=surfpdb-21",
        image: "/images/products/korda-basix-boite-rangement.jpg",
        imageAlt: "Korda Basix Boîte de Rangement Transparente",
      },
      {
        k: "pick",
        rank: "05",
        name: "Plano Tackle Systems Boîte de Rangement Hybride Hip 3",
        price: "85,01 €",
        badge: "Le Plus Complet",
        tone: "good",
        verdict:
          "Format hybride complet chez Plano, la référence historique du rangement de pêche — la boîte la plus chère du comparatif, mais celle qui centralise le plus de matériel en un seul contenant.",
        pros: ["Le plus cher du comparatif, format hybride complet", "Marque Plano, référence historique du rangement de pêche"],
        cons: ["Volumineux, pensé pour partir à la journée plutôt que pour une sortie rapide"],
        href: "https://www.amazon.fr/dp/B00OY9JSWO?tag=surfpdb-21",
        image: "/images/products/plano-hip3-boite-rangement-hybride.jpg",
        imageAlt: "Plano Tackle Systems Boîte de Rangement Hybride Hip 3",
      },
      { k: "h2", text: "Comment on choisit" },
      { k: "method", items: METHOD_ITEMS },
    ],
  },

  {
    slug: "top-livres-magazines-histoire-peche",
    category: "accessoires",
    kind: "comparison",
    kicker: "Comparatif",
    title: "Top 5 livres sur l'histoire de la pêche",
    excerpt:
      "De l'épopée de la sardine bretonne à cinq siècles de pêche à la morue à Terre-Neuve, cinq livres pour (re)découvrir l'histoire et les récits des pêcheurs, entre traditions oubliées et grandes épopées maritimes.",
    standfirst:
      "Entre les traditions insolites de la pêche en eau douce d'autrefois et les cinq siècles de pêche à la morue à Terre-Neuve, voici cinq livres qui racontent la pêche autrement : son histoire, ses récits et les communautés de pêcheurs qui l'ont façonnée.",
    meta: "5 produits comparés",
    date: "12 sept.",
    number: 110,
    readingTime: "5 min de lecture",
    updated: "Mis à jour le 12 septembre 2026",
    image: "/images/products/jean-claude-boulard-epopee-sardine.jpg",
    imageAlt: "Livres sur l'histoire de la pêche posés sur une table en bois",
    facts: [
      { value: "5", label: "livres comparés" },
      { value: "2,38 € — 14,99 €", label: "fourchette de prix" },
      { value: "4", label: "auteurs et historiens de la pêche (Juhel, Cazeils, Boulard, Whitelaw)" },
    ],
    blocks: [
      {
        k: "p",
        text: "La pêche du bord ne se résume pas au matériel : c'est aussi une histoire, faite de traditions régionales, de communautés de pêcheurs et de grandes épopées maritimes. De la sardine bretonne à la morue de Terre-Neuve en passant par les origines de la pêche à la mouche, voici cinq livres qui racontent la pêche autrement, entre récits d'historiens et témoignages de pêcheurs.",
      },
      { k: "h2", text: "Notre sélection" },
      {
        k: "pick",
        rank: "01",
        name: "L'Épopée de la Sardine, un Siècle d'Histoires de Pêches",
        price: "2,38 €",
        badge: "Meilleur Premier Prix",
        tone: "ok",
        verdict:
          "Jean-Claude Boulard raconte un siècle de vie des pêcheurs de sardine bretons, entre luttes sociales et civilisation sardinière aujourd'hui disparue — la meilleure note du comparatif, 4,8/5, pour un prix d'occasion très accessible.",
        pros: ["Meilleure note du comparatif, 4,8/5", "Raconte un siècle de vie des pêcheurs de sardine en Bretagne"],
        cons: ["Disponible d'occasion, couverture simple"],
        href: "https://www.amazon.fr/dp/2737326427?tag=surfpdb-21",
        image: "/images/products/jean-claude-boulard-epopee-sardine.jpg",
        imageAlt: "L'Épopée de la Sardine, un Siècle d'Histoires de Pêches",
      },
      {
        k: "pick",
        rank: "02",
        name: "Autrefois la Pêche en Eau Douce : Insolite, Histoires, Traditions et Savoir-Faire",
        price: "3,62 €",
        badge: "Le Plus Insolite",
        tone: "good",
        verdict:
          "Nelson Cazeils réunit une soixantaine d'anecdotes et de traditions de la pêche en eau douce à travers les siècles, du vairon artificiel de 1650 aux concours de pêche au coup qui rassemblaient des foules à Paris.",
        pros: ["Une soixantaine d'anecdotes et traditions de la pêche en eau douce", "Le prix le plus accessible du comparatif"],
        cons: ["Disponible d'occasion, un seul exemplaire au moment de la rédaction"],
        href: "https://www.amazon.fr/dp/2737331137?tag=surfpdb-21",
        image: "/images/products/nelson-cazeils-autrefois-peche-eau-douce.jpg",
        imageAlt: "Autrefois la Pêche en Eau Douce : Insolite, Histoires, Traditions et Savoir-Faire",
      },
      {
        k: "pick",
        rank: "03",
        name: "Cinq Siècles de Pêche à la Morue : Terre-Neuvas et Islandais",
        price: "4,59 €",
        badge: "Préfacé par un Capitaine Terre-Neuvas",
        tone: "good",
        verdict:
          "Préfacé par Jean Recher, ancien capitaine terre-neuvas, ce livre de Nelson Cazeils retrace cinq siècles de pêche à la morue à Terre-Neuve et en Islande — un témoignage direct sur l'une des pêches les plus rudes de l'histoire.",
        pros: ["Préfacé par Jean Recher, ancien capitaine terre-neuvas", "Retrace cinq siècles de pêche à la morue à Terre-Neuve et en Islande"],
        cons: ["Disponible d'occasion, stock limité"],
        href: "https://www.amazon.fr/dp/2737323045?tag=surfpdb-21",
        image: "/images/products/nelson-cazeils-cinq-siecles-peche-morue.jpg",
        imageAlt: "Cinq Siècles de Pêche à la Morue : Terre-Neuvas et Islandais",
      },
      {
        k: "pick",
        rank: "04",
        name: "Une Histoire de la Pêche à la Mouche en 50 Modèles",
        price: "12,05 €",
        badge: "Le Plus Illustré",
        tone: "good",
        verdict:
          "Ian Whitelaw retrace 500 ans de pêche à la mouche à travers 50 modèles emblématiques, croqués à l'aquarelle et accompagnés de documents d'archives sur l'évolution du matériel.",
        pros: ["500 ans d'histoire de la pêche à la mouche à travers 50 modèles emblématiques", "Illustrations à l'aquarelle et documents d'archives"],
        cons: ["Disponible d'occasion, stock limité"],
        href: "https://www.amazon.fr/dp/2351911709?tag=surfpdb-21",
        image: "/images/products/ian-whitelaw-histoire-peche-mouche.jpg",
        imageAlt: "Une Histoire de la Pêche à la Mouche en 50 Modèles",
      },
      {
        k: "pick",
        rank: "05",
        name: "Histoire de la Pêche à la Ligne : Au Fil de l'Eau et du Temps",
        price: "14,99 €",
        badge: "Le Plus Complet",
        tone: "good",
        verdict:
          "Pierre Juhel retrace la pêche à la ligne en eau douce depuis l'Antiquité jusqu'à 1930, mêlant écologie, biodiversité, histoire et littérature sur 277 pages richement illustrées — le plus complet des cinq, avec la meilleure note.",
        pros: ["Note de 4,8/5, 277 pages richement illustrées", "Retrace la pêche à la ligne de l'Antiquité à 1930"],
        cons: ["Disponible uniquement en version numérique Kindle"],
        href: "https://www.amazon.fr/dp/B01GJSRMR0?tag=surfpdb-21",
        image: "/images/products/pierre-juhel-histoire-peche-a-la-ligne.jpg",
        imageAlt: "Histoire de la Pêche à la Ligne : Au Fil de l'Eau et du Temps",
      },
      { k: "h2", text: "Comment on choisit" },
      { k: "method", items: METHOD_ITEMS },
    ],
  },
];

export function articleHref(a: Pick<ArticleMeta, "category" | "slug">) {
  return `/${a.category}/${a.slug}`;
}

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function byCategory(category: string) {
  return ARTICLES.filter((a) => a.category === category);
}

export function relatedArticles(current: ArticleMeta, limit = 3) {
  const sameCategory = ARTICLES.filter((a) => a.slug !== current.slug && a.category === current.category);
  const rest = ARTICLES.filter((a) => a.slug !== current.slug && a.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
