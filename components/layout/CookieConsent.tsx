"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStoredConsent, setStoredConsent } from "@/lib/consent";

// Bandeau RGPD : rien n'est chargé (analytics) tant que le visiteur n'a pas
// choisi. Le choix est mémorisé en local, jamais envoyé à un serveur tiers
// avant consentement.
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getStoredConsent() === null);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-300 bg-brand-50 px-4 py-4 shadow-[0_-8px_24px_rgba(0,0,0,0.12)] sm:px-7">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4">
        <p className="min-w-0 flex-1 basis-[280px] font-serif text-[14px] leading-[1.5] text-brand-800">
          Ce site utilise des cookies de mesure d'audience uniquement si vous
          l'autorisez. Aucun cookie n'est déposé sans votre accord.{" "}
          <Link href="/privacy" className="underline hover:text-brand-600">
            En savoir plus
          </Link>
        </p>
        <div className="flex flex-none gap-3">
          <button
            type="button"
            onClick={() => {
              setStoredConsent("rejected");
              setVisible(false);
            }}
            className="min-h-[44px] border border-brand-300 px-4 py-2.5 font-mono text-[10px] uppercase tracking-ops text-brand-800 hover:border-brand-600 hover:text-brand-600"
          >
            Ne pas autoriser
          </button>
          <button
            type="button"
            onClick={() => {
              setStoredConsent("accepted");
              setVisible(false);
            }}
            className="clip-bevel-sm min-h-[44px] bg-brand-600 px-5 py-2.5 font-mono text-[10px] uppercase tracking-ops text-white hover:bg-brand-600/85"
          >
            Autoriser
          </button>
        </div>
      </div>
    </div>
  );
}
