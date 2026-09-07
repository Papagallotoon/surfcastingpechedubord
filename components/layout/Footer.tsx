import Link from "next/link";
import { SITE } from "@/config/active";

// Portfolio du même éditeur (Papagallotoon) : liens croisés entre les trois
// sites, présents à l'identique (à l'URL courante près) dans le footer de
// chacun.
const OTHER_SITES = [
  { label: "Marius Dumas Home — déco", href: "https://marius-home.com" },
  { label: "Sécurité Maison — sécurité domestique", href: "https://securitemaison-site.vercel.app" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-brand-200 py-8">
      <div className="mx-auto max-w-6xl px-6">
        <p className="max-w-xl text-[13px] leading-relaxed text-brand-500">
          {SITE.legal.affiliateDisclosure}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-ops text-brand-500">
          {SITE.legal.links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-600">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mt-5 border-t border-brand-200 pt-4">
          <div className="font-mono text-[10px] uppercase tracking-ops text-brand-400">Nos autres sites</div>
          <div className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-ops text-brand-500">
            {OTHER_SITES.map((site) => (
              <a key={site.href} href={site.href} className="hover:text-brand-600">
                {site.label}
              </a>
            ))}
          </div>
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-ops text-brand-400">
          © {new Date().getFullYear()} {SITE.siteName} — {SITE.legal.footerNote}
        </p>
      </div>
    </footer>
  );
}
