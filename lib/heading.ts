import type { SiteConfig } from "./types";

/** Classes Tailwind du style de titre de la niche active. */
export function headingClass(site: Pick<SiteConfig, "branding">): string {
  return site.branding.headingFont === "sans-bold"
    ? "font-condensed font-extrabold uppercase tracking-tight"
    : "font-serif font-semibold";
}

/** Libellé opérationnel monospace — eyebrows, compteurs, statuts. */
export const opsLabel =
  "font-mono text-[11px] uppercase tracking-ops text-brand-500";
