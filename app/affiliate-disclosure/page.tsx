import type { Metadata } from "next";
import { SITE } from "@/config/active";

export const metadata: Metadata = { title: "Affiliation" };

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-sm leading-relaxed text-brand-800">
      <h1 className="text-2xl font-bold text-brand-950">Affiliation</h1>

      <p className="mt-6">
        Certains liens de ce site sont des liens d'affiliation. Nous pouvons
        percevoir une commission si vous effectuez un achat, sans coût
        supplémentaire pour vous.
      </p>

      <p className="mt-4">
        {SITE.siteName} participe au Programme Partenaires d'Amazon EU, un
        programme d'affiliation conçu pour permettre à des sites de percevoir
        une rémunération grâce à la création de liens vers Amazon.fr. Lorsque
        vous cliquez sur un lien produit de ce site et effectuez un achat sur
        Amazon, nous pouvons recevoir une commission. Cela n'affecte pas le
        prix que vous payez.
      </p>

      <p className="mt-4">
        Les comparatifs de ce site portent sur de vrais produits vendus sur
        Amazon.fr, sélectionnés parmi les meilleures ventes et les mieux
        notés de leur catégorie. Nous n'acceptons aucun paiement en échange
        d'une recommandation spécifique, et nous ne publions ni faux avis, ni
        faux témoignages, ni faux compteurs de stock, ni fausses réductions.
      </p>

      <p className="mt-4">
        Les prix affichés sont indicatifs et peuvent varier : le prix en
        vigueur est celui affiché sur Amazon.fr au moment de l'achat.
      </p>
    </div>
  );
}
