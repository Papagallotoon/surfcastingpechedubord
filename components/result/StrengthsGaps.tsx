import type { DimensionMeta } from "@/lib/types";
import { SITE } from "@/config/active";

interface StrengthsGapsProps {
  strengthsTitle: string;
  gapsTitle: string;
  strengths: DimensionMeta[];
  gaps: DimensionMeta[];
}

// Vert et orange sont les deux seules couleurs hors palette du système :
// des signaux d'état, pas des couleurs de marque. Volontairement désaturés
// pour ne pas concurrencer l'accent de la niche, quelle qu'elle soit.
const OK = "#7fb069";
const ALERT = "#d4763a";

export function StrengthsGaps({
  strengthsTitle,
  gapsTitle,
  strengths,
  gaps,
}: StrengthsGapsProps) {
  return (
    <div className="mt-5 grid gap-5 sm:grid-cols-2">
      <div className="border border-white/[0.1] bg-brand-100/60 p-5 sm:p-6">
        <h3 className="font-mono text-[11px] uppercase tracking-ops" style={{ color: OK }}>
          {strengthsTitle}
        </h3>
        <ul className="mt-4 flex flex-col gap-2.5">
          {strengths.length === 0 && (
            <li className="text-[15px] text-brand-400">{SITE.resultCopy.strengthsEmpty}</li>
          )}
          {strengths.map((s) => (
            <li key={s.id} className="flex items-center gap-3 text-base text-brand-800">
              <span aria-hidden className="h-2 w-2 flex-none" style={{ background: OK }} />
              {s.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="border border-brand-600/25 bg-brand-100/60 p-5 sm:p-6">
        <h3 className="font-mono text-[11px] uppercase tracking-ops" style={{ color: ALERT }}>
          {gapsTitle}
        </h3>
        <ul className="mt-4 flex flex-col gap-2.5">
          {gaps.length === 0 && (
            <li className="text-[15px] text-brand-400">{SITE.resultCopy.gapsEmpty}</li>
          )}
          {gaps.map((g) => (
            <li key={g.id} className="flex items-center gap-3 text-base text-brand-800">
              <span
                aria-hidden
                className="h-2 w-2 flex-none rotate-45"
                style={{ background: ALERT }}
              />
              {g.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
