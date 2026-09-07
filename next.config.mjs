// CSP construite depuis les seuls tiers réellement chargés (voir
// components/layout/AnalyticsScripts.tsx) : Google Fonts (chargées en <link>
// dans app/layout.tsx) et GA4, ce dernier seulement si un gaMeasurementId
// est renseigné dans config/niches/surfcasting/site.ts et après consentement
// cookies. Report-Only d'abord : voir la procédure de bascule en bloquant
// dans le commentaire ci-dessous avant de renommer l'en-tête.
const CSP =
  "default-src 'self'; " +
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; " +
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
  "img-src 'self' data:; " +
  "font-src 'self' https://fonts.gstatic.com; " +
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com; " +
  "base-uri 'self'; form-action 'self'; object-src 'none'; frame-ancestors 'self'";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: false },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Pas de "preload" : irréversible et s'appliquerait à tous les
          // sous-domaines, pour un gain marginal une fois HSTS actif.
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=(), interest-cohort=()" },
          // Passage en bloquant : renommer "Content-Security-Policy-Report-Only"
          // en "Content-Security-Policy" après 1-2 semaines sans violation
          // inattendue en console (F12) sur l'accueil et une page article.
          { key: "Content-Security-Policy-Report-Only", value: CSP },
        ],
      },
    ];
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
