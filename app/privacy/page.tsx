import type { Metadata } from "next";
import { SITE } from "@/config/active";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-sm leading-relaxed text-brand-800">
      <h1 className="text-2xl font-bold text-brand-950">Politique de confidentialité</h1>
      <p className="mt-4 text-brand-700/60">Dernière mise à jour : {new Date().toISOString().slice(0, 10)}</p>

      <p className="mt-6">
        {SITE.siteName} (« nous ») exploite ce site. Cette politique explique
        quelles informations nous collectons lorsque vous l'utilisez et comment
        elles sont utilisées.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-950">Informations collectées</h2>
      <p className="mt-2">
        Nous collectons des données d'analyse standard (pages consultées,
        localisation approximative via l'IP, type d'appareil/navigateur), et
        des données d'attribution marketing (paramètres UTM) si vous êtes
        arrivé via un lien de campagne. Nous ne vous demandons pas de créer un
        compte ni de fournir votre nom, email ou coordonnées bancaires pour
        utiliser ce site.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-950">Utilisation des données</h2>
      <p className="mt-2">
        Pour comprendre quels contenus sont utiles aux visiteurs et améliorer
        ce site.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-950">Tiers</h2>
      <p className="mt-2">
        Nous pouvons utiliser des outils d'analyse (comme Google Analytics)
        pour comprendre l'usage du site, uniquement après votre consentement
        via le bandeau cookies. Lorsque vous cliquez vers un produit
        recommandé, vous quittez ce site et êtes soumis à la politique de
        confidentialité d'Amazon.fr, notre seul partenaire d'affiliation.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-950">Vos choix</h2>
      <p className="mt-2">
        Vous pouvez utiliser ce site sans fournir d'information personnelle
        identifiable. Si votre navigateur bloque les scripts d'analyse, le site
        continue de fonctionner normalement.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-brand-950">Contact</h2>
      <p className="mt-2">
        Les questions concernant cette politique peuvent être envoyées à
        l'adresse de contact indiquée là où ce site est publié.
      </p>
    </div>
  );
}
