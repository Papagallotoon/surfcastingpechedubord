"use client";

// Minimal cookie-consent store: localStorage + a same-tab custom event so
// AnalyticsScripts can react immediately without a page reload. No cookie
// banner library, no server round-trip — analytics is opt-in and off by
// default until the visitor explicitly accepts.

export type ConsentValue = "accepted" | "rejected";

const KEY = "sm_cookie_consent";
export const CONSENT_EVENT = "cookie-consent-change";

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

export function setStoredConsent(value: ConsentValue) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, value);
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  } catch {
    // localStorage blocked (private mode, etc.) — the banner will just
    // reappear next visit, which is an acceptable fallback.
  }
}
