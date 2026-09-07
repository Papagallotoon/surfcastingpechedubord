"use client";

// Client-side analytics abstraction. Every call is a safe no-op when the
// corresponding env key isn't set, so the site never errors without
// Analytics configured.

export type TrackEvent =
  | "landing_view"
  | "quiz_start"
  | "quiz_answer"
  | "quiz_complete"
  | "result_view"
  | "affiliate_click";

export interface TrackProps {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  product?: string;
  profile?: string;
  result_score?: number;
  question_id?: string;
  [key: string]: string | number | undefined;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    posthog?: {
      capture: (event: string, props?: Record<string, unknown>) => void;
      init: (key: string, options?: Record<string, unknown>) => void;
      __loaded?: boolean;
    };
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";

export function track(event: TrackEvent, props: TrackProps = {}) {
  if (typeof window === "undefined") return;

  try {
    if (GA_ID && window.gtag) {
      window.gtag("event", event, props);
    }
    if (POSTHOG_KEY && window.posthog?.__loaded) {
      window.posthog.capture(event, props);
    }
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.debug("[track]", event, props);
    }
  } catch {
    // Analytics should never break the funnel.
  }
}

export const analyticsEnv = {
  hasGA: Boolean(GA_ID),
  hasPostHog: Boolean(POSTHOG_KEY),
  gaId: GA_ID,
  posthogKey: POSTHOG_KEY,
  posthogHost: POSTHOG_HOST,
};
