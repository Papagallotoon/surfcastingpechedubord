import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { SITE } from "@/config/active";
import { hexToRgbChannels } from "@/lib/color";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnalyticsScripts } from "@/components/layout/AnalyticsScripts";
import { CookieConsent } from "@/components/layout/CookieConsent";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: {
    default: SITE.siteName,
    template: `%s — ${SITE.siteName}`,
  },
  description: SITE.siteDescription,
  openGraph: {
    title: SITE.siteName,
    description: SITE.siteDescription,
    type: "website",
    locale: SITE.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.siteName,
    description: SITE.siteDescription,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  // Pas de token Search Console pour ce domaine pour l'instant — celui de
  // securitemaison-site ne s'applique qu'à son propre domaine, le copier
  // ici ne vérifierait rien. À ajouter une fois Search Console configuré
  // sur surfcastingpechedubord (méthode balise HTML, propriété URL-prefix).
};

// Chaque niche définit sa propre palette (config/niches/<niche>/site.ts).
// On la transforme en custom properties pour qu'aucun composant ni
// tailwind.config.ts ne change quand la niche active change.
const brandStyle = Object.fromEntries(
  Object.entries(SITE.branding.colors).map(([shade, hex]) => [
    `--brand-${shade}`,
    hexToRgbChannels(hex),
  ])
) as CSSProperties;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.locale} style={brandStyle}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="camo-page flex min-h-screen flex-col bg-brand-50 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <AnalyticsScripts />
        <CookieConsent />
      </body>
    </html>
  );
}
