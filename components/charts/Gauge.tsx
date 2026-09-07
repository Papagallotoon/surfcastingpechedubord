// Jauge annulaire de l'index 0–100. Un seul arc, pas de dégradé : le chiffre
// porte l'information, l'anneau donne l'échelle d'un coup d'œil.
const R = 84;
const CIRC = 2 * Math.PI * R;

export function Gauge({ value, color = "#0E7C6E" }: { value: number; color?: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[250px]">
      <svg viewBox="0 0 200 200" className="block h-auto w-full" role="img" aria-label={`Indice ${value} sur 100`}>
        <circle cx="100" cy="100" r={R} fill="none" stroke="rgba(28,31,34,0.13)" strokeWidth="15" />
        <circle
          cx="100"
          cy="100"
          r={R}
          fill="none"
          stroke={color}
          strokeWidth="15"
          strokeDasharray={`${(value / 100) * CIRC} ${CIRC}`}
          transform="rotate(-90 100 100)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-condensed text-[64px] font-extrabold leading-[0.9] text-brand-950">
          {value}
        </span>
        <span className="mt-1.5 font-mono text-[10px] uppercase tracking-ops text-brand-500">
          sur 100
        </span>
      </div>
    </div>
  );
}
