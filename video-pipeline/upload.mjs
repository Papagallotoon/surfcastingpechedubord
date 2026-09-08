import fs from "node:fs";
import { google } from "googleapis";
import { priceToNumber } from "./build-script.mjs";

function getAuthedClient() {
  const { YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN } = process.env;
  if (!YT_CLIENT_ID || !YT_CLIENT_SECRET || !YT_REFRESH_TOKEN) {
    throw new Error(
      "Missing YT_CLIENT_ID / YT_CLIENT_SECRET / YT_REFRESH_TOKEN env vars. " +
        "Run `node video-pipeline/get-youtube-token.mjs` once locally to obtain them."
    );
  }
  const oauth2Client = new google.auth.OAuth2(YT_CLIENT_ID, YT_CLIENT_SECRET);
  oauth2Client.setCredentials({ refresh_token: YT_REFRESH_TOKEN });
  return oauth2Client;
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

const HOOK_TEMPLATES = [
  (t) => `${t} 🎣`,
  (t) => `${t} — le n°1 va te surprendre`,
  (t) => `${t} ✅ (notre coup de cœur en dernier)`,
  (t) => `À voir avant d'acheter 👀 : ${t}`,
  (t) => `${t} 🌊 à shopper direct`,
];

function buildHookTitle(article) {
  const template = HOOK_TEMPLATES[hashString(article.slug) % HOOK_TEMPLATES.length];
  return `${template(article.title)} #Shorts`.slice(0, 100);
}

const RANK_EMOJIS = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];

const CATEGORY_TAGS = {
  cannes: ["canne surfcasting", "canne peche mer"],
  moulinets: ["moulinet surfcasting", "moulinet peche mer"],
  montages: ["montage surfcasting", "terminal tackle peche"],
  leurres: ["leurre peche mer", "appat peche"],
  accessoires: ["materiel surfcasting", "accessoire peche mer"],
};

function buildTags(article) {
  const base = ["surfcasting", "peche du bord", "peche en mer", "shorts"];
  const fromCategories = [...new Set(article.products.map((p) => p.category))]
    .flatMap((cat) => CATEGORY_TAGS[cat] || []);
  return [...new Set([...base, ...fromCategories])];
}

// slug (video-pipeline/content/*.json) -> article correspondant sur
// surfcastingpechedubord.vercel.app. Toute nouvelle vidéo doit avoir son
// article publié sur le site avant d'être ajoutée ici.
const SITE_ARTICLE_PATHS = {
  "meilleures-cannes-surfcasting": "/cannes/meilleures-cannes-surfcasting",
  "meilleurs-moulinets-surfcasting": "/moulinets/meilleurs-moulinets-surfcasting",
  "montages-terminal-tackle-surfcasting": "/montages/montages-terminal-tackle-surfcasting",
  "meilleurs-leurres-appats-peche-du-bord": "/leurres/meilleurs-leurres-appats-peche-du-bord",
  "accessoires-indispensables-surfcasting": "/accessoires/accessoires-indispensables-surfcasting",
};
const SITE_DOMAIN = "https://surfcastingpechedubord.vercel.app";

function buildDescription(article) {
  const links = [...article.products]
    .sort((a, b) => priceToNumber(a.price) - priceToNumber(b.price))
    .slice(0, 5)
    .map((p, i) => `${RANK_EMOJIS[i] || `${i + 1}.`} ${p.name} — ${p.price}\n🛒 ${p.affiliateUrl}`)
    .join("\n\n");

  const articlePath = SITE_ARTICLE_PATHS[article.slug];
  const siteLine = articlePath
    ? [`📖 Le comparatif complet : ${SITE_DOMAIN}${articlePath}`, ""]
    : [];

  return [
    article.excerpt,
    "",
    ...siteLine,
    "Les produits de la vidéo, dans l'ordre :",
    "",
    links,
    "",
    "Les prix sont ceux constatés au moment de la publication de cette vidéo et peuvent avoir changé depuis.",
    "",
    "Certains liens ci-dessus sont des liens d'affiliation Amazon : nous pouvons percevoir une commission sur un achat, sans coût supplémentaire pour vous.",
    "",
    "#surfcasting #pechedubord #shorts",
  ].join("\n");
}

// privacyStatus par défaut "unlisted" — les premières vidéos peuvent être
// vérifiées dans YouTube Studio avant de passer en public (YT_PRIVACY=public).
export async function uploadVideo({ videoPath, article }) {
  const auth = getAuthedClient();
  const youtube = google.youtube({ version: "v3", auth });

  const res = await youtube.videos.insert({
    part: ["snippet", "status"],
    requestBody: {
      snippet: {
        title: buildHookTitle(article),
        description: buildDescription(article),
        tags: buildTags(article),
        categoryId: "26", // Howto & Style
      },
      status: {
        privacyStatus: process.env.YT_PRIVACY || "unlisted",
        selfDeclaredMadeForKids: false,
      },
    },
    media: {
      body: fs.createReadStream(videoPath),
    },
  });

  return res.data;
}
