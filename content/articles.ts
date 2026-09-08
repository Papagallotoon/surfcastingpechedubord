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
