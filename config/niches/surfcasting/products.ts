import type { Product } from "@/lib/types";

// Vide : ce site n'a pas de produit-funnel unique à recommander (pas de
// quiz actif, voir site.ts). Les vraies recommandations produits vivent
// dans content/articles.ts, sous forme de blocs "pick" par article — pas
// ici. Ne pas réutiliser les données Digistore24 de securitemaison-site :
// hors sujet et propres à cette autre offre.
export const PRODUCTS: Product[] = [];
