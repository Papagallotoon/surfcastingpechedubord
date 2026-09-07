import Link from "next/link";
import { SITE } from "@/config/active";
import { EDITORIAL, NAV } from "@/content/editorial";

// Deux étages : un bandeau mono qui porte la promesse d'indépendance, puis la
// barre de marque collante avec la navigation par catégorie et le CTA quiz.
export function Header() {
  return (
    <>
      <div className="border-b border-brand-200 bg-brand-200/70">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-2 font-mono text-[10px] uppercase tracking-ops text-brand-500 sm:px-7">
          <span>{EDITORIAL.topbarNote}</span>
          {SITE.headerStatus && <span className="hidden sm:inline">{SITE.headerStatus}</span>}
        </div>
      </div>

      <header className="sticky top-0 z-20 border-b border-brand-200 bg-brand-50/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-5 px-4 py-3.5 sm:px-7">
          <Link href="/" className="flex items-center gap-3">
            <span className="clip-bevel-sm flex h-[26px] w-[26px] items-center justify-center bg-brand-600 font-condensed text-[18px] font-extrabold leading-none text-white">
              {SITE.branding.logoLetter ?? SITE.siteName.charAt(0)}
            </span>
            <span className="font-condensed text-[23px] font-extrabold uppercase tracking-[0.05em] text-brand-950">
              {SITE.siteName}
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-x-[clamp(10px,2vw,18px)] gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em]">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-sm border px-2.5 py-1.5 text-brand-800 transition-colors hover:text-brand-950"
                style={{ borderColor: item.color }}
              >
                <span
                  className="mr-1.5 inline-block h-[7px] w-[7px] rounded-full align-middle"
                  style={{ backgroundColor: item.color }}
                />
                {item.label}
              </Link>
            ))}
            <Link
              href="/cannes"
              className="clip-bevel flex min-h-[44px] items-center bg-brand-600 px-4 py-3 text-white hover:bg-brand-600/85"
            >
              Voir les comparatifs
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
