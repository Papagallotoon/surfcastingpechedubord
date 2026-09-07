// Ajoute le champ `analytics` à SiteConfig sans toucher à lib/types.ts.
// Fusion de déclaration : le champ est optionnel, aucun composant existant ne
// bouge, et le site.ts qui le remplit passe le typecheck.

export {};

declare module "@/lib/types" {
  interface SiteConfig {
    analytics?: {
      /** ID de flux Google Analytics 4, format G-XXXXXXXXXX. */
      gaMeasurementId?: string;
    };
  }
}
