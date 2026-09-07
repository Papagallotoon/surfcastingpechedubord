import type { Config } from "tailwindcss";

// Les couleurs de marque pointent vers des custom properties
// (--brand-50 ... --brand-950) définies par la niche active dans
// app/layout.tsx — changer de niche ne touche jamais ce fichier.
function brandShade(variableName: string) {
  return `rgb(var(${variableName}) / <alpha-value>)`;
}

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: brandShade("--brand-50"),
          100: brandShade("--brand-100"),
          200: brandShade("--brand-200"),
          300: brandShade("--brand-300"),
          400: brandShade("--brand-400"),
          500: brandShade("--brand-500"),
          600: brandShade("--brand-600"),
          700: brandShade("--brand-700"),
          800: brandShade("--brand-800"),
          900: brandShade("--brand-900"),
          950: brandShade("--brand-950"),
        },
      },
      fontFamily: {
        // Barlow : humaniste, lisible en petit, neutre. Le poids "militaire"
        // vient de la version condensée réservée aux titres, pas du corps.
        sans: ["Barlow", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        condensed: ["Barlow Condensed", "Oswald", "Impact", "sans-serif"],
        // Les libellés opérationnels (PHASE 03 / 07, READINESS INDEX...)
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        // Corps de texte éditorial : Newsreader à 19px sur les chapôs, 15px
        // sur les brèves. Le mono reste réservé aux étiquettes techniques.
        serif: ["Newsreader", "Iowan Old Style", "Palatino Linotype", "Georgia", "serif"],
      },
      letterSpacing: {
        ops: "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;
