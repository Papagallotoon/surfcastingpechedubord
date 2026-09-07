import type { Product } from "./types";

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
}

/** Reads standard UTM params from a URLSearchParams instance. */
export function readUtmParams(searchParams: URLSearchParams): UtmParams {
  const utm: UtmParams = {};
  const keys: (keyof UtmParams)[] = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
  ];
  for (const key of keys) {
    const value = searchParams.get(key);
    if (value) utm[key] = value;
  }
  return utm;
}

/**
 * Builds the final affiliate redirect URL for a product without breaking
 * the destination URL's existing query string OR hash.
 *
 * Some vendors (Digistore24 funnels built on Leadpages, notably) track the
 * affiliate ID and campaign via a URL *fragment* instead of query params —
 * e.g. `https://vendor.com/main/#aff=YOUR_ID&cam=YOUR_TAG` — rather than
 * `?campaignKey=...`. If the pasted affiliateUrl already looks like that
 * (a hash containing `aff=`), we leave it untouched — it already has the
 * real affiliate ID — and only update the `cam` value if `campaignKey` is
 * set. Otherwise we fall back to the generic query-param behavior used by
 * most other Digistore24 / affiliate-network links.
 */
export function buildAffiliateUrl(product: Product, utm: UtmParams): string {
  let url: URL;
  try {
    url = new URL(product.affiliateUrl);
  } catch {
    // Placeholder or malformed URL (e.g. AFFILIATE_URL_PLACEHOLDER) — return as-is.
    return product.affiliateUrl;
  }

  const hashBody = url.hash.startsWith("#") ? url.hash.slice(1) : url.hash;
  const usesHashTracking = /(^|&)aff=/.test(hashBody);

  if (usesHashTracking) {
    if (product.campaignKey) {
      const hashParams = new URLSearchParams(hashBody);
      hashParams.set("cam", product.campaignKey);
      url.hash = hashParams.toString();
    }
  } else if (product.campaignKey) {
    url.searchParams.set("campaignKey", product.campaignKey);
  }

  for (const [key, value] of Object.entries(utm)) {
    if (value) url.searchParams.set(key, value);
  }

  return url.toString();
}
