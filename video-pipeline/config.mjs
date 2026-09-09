import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT_DIR = path.resolve(__dirname, "..");
// Contenu dédié au pipeline (JSON), distinct de content/articles.ts (le
// site lit un tableau TypeScript, pas un JSON par fichier) — voir
// video-pipeline/content/*.json, généré à la main depuis articles.ts.
export const ARTICLES_DIR = path.join(__dirname, "content");
export const PUBLIC_DIR = path.join(ROOT_DIR, "public");
export const STATE_PATH = path.join(__dirname, "state.json");
export const TMP_DIR = path.join(__dirname, "tmp");
export const OUT_DIR = path.join(__dirname, "out");

export const BRAND_NAME = "Surfcasting Pêche du Bord";
export const CHIME_PATH = path.join(__dirname, "assets", "chime.mp3");
// Pas de photo de produit à réutiliser en fond d'intro/outro (contrairement
// à securite-sas) : fond de marque uni, généré une fois (voir README de ce
// dossier pour la commande ffmpeg utilisée).
export const INTRO_BG_PATH = path.join(__dirname, "assets", "intro-bg.png");
// Pas de bumper de marque fixe pour l'instant (pas de logo dédié) — render.mjs
// saute cette étape proprement si le fichier n'existe pas.
export const TITLE_CARD_PATH = path.join(__dirname, "assets", "title-card.png");
// Teinte chaude/sable, cohérente avec la palette kaki du site (voir
// config/niches/surfcasting/site.ts), distincte du bleu froid de Sécurité
// Maison et du grade utilisé sur Marius Concept.
export const COLOR_GRADE = "eq=saturation=1.08:contrast=1.04,colorbalance=rm=0.04:gm=0.02:bh=-0.04";
// Voix masculine (demande explicite : "un homme avec une voix d'ancien mais
// dynamique"). HenriNeural (single-locale) sonnait trop robotique — passé à
// la génération "Multilingual", nettement plus naturelle (même famille de
// voix que Vivienne sur les 2 autres chaînes, voir leur config.mjs). Débit
// ramené à un niveau proche du naturel : un rate élevé donnait justement
// cet effet "voix robotisée" que l'utilisateur a signalé.
export const TTS_VOICE = "fr-FR-RemyMultilingualNeural";
export const TTS_PROSODY = { rate: "+2%", pitch: "-2%" };

// Pas de photo "en situation" par catégorie pour l'instant (contrairement à
// securite-sas) — build-script.mjs saute cette étape proprement pour toute
// catégorie absente d'ici.
export const SITUATION_IMAGES = {};

export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const FPS = 30;
