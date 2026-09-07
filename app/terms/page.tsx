import type { Metadata } from "next";
import { SITE } from "@/config/active";

export const metadata: Metadata = { title: "Conditions d'utilisation" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-sm leading-relaxed text-brand-800">
      <h1 className="text-2xl font-bold text-brand-950">Conditions d'utilisation</h1>
      <p className="mt-4 text-brand-700/60">Dernière mise à jour : {new Date().toISOString().slice(0, 10)}</p>

      <p className="mt-6">
        En utilisant {SITE.siteName}, vous acceptez ces conditions. Si vous
        n'êtes pas d'accord, merci de ne pas utiliser ce site.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-950">Ce qu'est ce site</h2>
      <p className="mt-2">
        {SITE.siteName} publie des comparatifs indépendants de matériel de
        pêche en surfcasting, avec des liens d'affiliation vers Amazon.fr. Ce
        n'est ni un conseil médical, juridique ou financier, et son
        utilisation ne crée aucune relation professionnelle.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-950">Aucune garantie</h2>
      <p className="mt-2">
        Les comparatifs et recommandations sont uniquement informatifs. Nous
        ne garantissons aucun résultat lié à l'achat d'un produit recommandé.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-950">Liens d'affiliation</h2>
      <p className="mt-2">
        Ce site contient des liens d'affiliation. Consultez notre{" "}
        <a href="/affiliate-disclosure" className="underline">page Affiliation</a>{" "}
        pour plus de détails.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-950">Responsabilité</h2>
      <p className="mt-2">
        Ce site est fourni « en l'état », sans garantie d'aucune sorte. Nous ne
        sommes pas responsables des décisions prises sur la base de votre
        résultat d'évaluation ou des produits achetés auprès de marchands tiers.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-950">Modifications</h2>
      <p className="mt-2">
        Nous pouvons mettre à jour ces conditions de temps à autre. Continuer
        à utiliser le site signifie que vous acceptez la version en vigueur.
      </p>
    </div>
  );
}
