import { SITE } from "@/config/active";

/**
 * Bloc passerelle en bas de la page résultat : les autres tests de la marque.
 * Rendu uniquement si la niche déclare `SITE.furtherTests` — une niche qui n'a
 * qu'un seul test omet le champ et le bloc disparaît, sans condition dans la page.
 */
export function FurtherTests() {
  const config = SITE.furtherTests;
  if (!config || config.tests.length === 0) return null;

  return (
    <section className="reticle mt-11 border border-brand-600/25 bg-gradient-to-b from-brand-600/[0.07] to-brand-100/70 p-5 sm:p-8">
      <div className="font-mono text-[11px] uppercase tracking-ops text-brand-600">
        {config.eyebrow}
      </div>
      <h2 className="mt-3 max-w-2xl font-condensed text-[28px] font-extrabold uppercase leading-[1.04] text-brand-950 sm:text-4xl">
        {config.title}
      </h2>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-brand-700">{config.subtitle}</p>

      <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {config.tests.map((test) => (
          <a
            key={test.title}
            href={test.href}
            className="border border-white/[0.12] bg-brand-50/50 p-5 transition hover:border-brand-600/60"
          >
            <div className="font-mono text-[10px] uppercase tracking-ops text-brand-500">
              {test.label}
            </div>
            <div className="mt-2 font-condensed text-[23px] font-bold uppercase text-brand-900">
              {test.title}
            </div>
            <div className="mt-1.5 text-sm leading-relaxed text-brand-700">{test.description}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
