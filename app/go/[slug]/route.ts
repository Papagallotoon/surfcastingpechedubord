import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "@/config/active";
import { buildAffiliateUrl, readUtmParams } from "@/lib/utm";
import { logServerEvent } from "@/lib/serverTrack";

export const dynamic = "force-dynamic";
export const runtime = 'edge';


export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const product = PRODUCTS.find((p) => p.slug === params.slug && p.active);

  if (!product) {
    return NextResponse.redirect(new URL("/", request.url), { status: 302 });
  }

  const searchParams = request.nextUrl.searchParams;
  const utm = readUtmParams(searchParams);
  const profile = searchParams.get("profile") ?? undefined;
  const score = searchParams.get("score") ?? undefined;

  await logServerEvent({
    event: "affiliate_click",
    product: product.slug,
    profile,
    result_score: score,
    ...utm,
    referer: request.headers.get("referer") ?? undefined,
  });

  const destination = buildAffiliateUrl(product, utm);

  const isValidAbsoluteUrl = /^https?:\/\//.test(destination);
  if (!isValidAbsoluteUrl) {
    // affiliateUrl is still a placeholder (e.g. AFFILIATE_URL_PLACEHOLDER) —
    // don't crash the redirect, send the visitor home instead and make the
    // misconfiguration obvious in the logs.
    console.warn(
      `[go/${product.slug}] affiliateUrl is not a valid absolute URL yet: "${destination}". Replace it in config/niches/*/products.ts.`
    );
    return NextResponse.redirect(new URL("/", request.url), { status: 302 });
  }

  return NextResponse.redirect(destination, { status: 302 });
}
