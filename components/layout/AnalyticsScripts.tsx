"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { analyticsEnv } from "@/lib/analytics";
import { CONSENT_EVENT, getStoredConsent } from "@/lib/consent";

/** Loads GA4/PostHog only if the corresponding env key is set AND the
 * visitor has accepted cookies via the consent banner. Reacts live to the
 * banner's choice, no page reload needed. */
export function AnalyticsScripts() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(getStoredConsent() === "accepted");
    function onChange(event: Event) {
      setConsented((event as CustomEvent<string>).detail === "accepted");
    }
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!consented) return null;

  return (
    <>
      {analyticsEnv.hasGA && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${analyticsEnv.gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${analyticsEnv.gaId}');
              window.gtag = gtag;
            `}
          </Script>
        </>
      )}

      {analyticsEnv.hasPostHog && (
        <Script
          src={`${analyticsEnv.posthogHost}/static/array.js`}
          strategy="afterInteractive"
          onLoad={() => {
            if (window.posthog) {
              window.posthog.init(analyticsEnv.posthogKey as string, {
                api_host: analyticsEnv.posthogHost,
              });
              window.posthog.__loaded = true;
            }
          }}
        />
      )}
    </>
  );
}
