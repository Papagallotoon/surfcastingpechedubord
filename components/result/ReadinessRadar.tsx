import type { DimensionMeta } from "@/lib/types";
import { SITE } from "@/config/active";

interface ReadinessRadarProps {
  title: string;
  strengths: DimensionMeta[];
  gaps: DimensionMeta[];
  /** Optionnel : score 0–1 par dimension si le scoring l'expose un jour.
   *  Sans lui, on déduit 1.0 pour une force et 0.32 pour une lacune. */
  dimensionScores?: Record<string, number>;
}

// L'accent vient de la palette de la niche via la custom property Tailwind.
const ACCENT = "rgb(var(--brand-600))";
const ALERT = "#d4763a";
const STRONG = 1;
const WEAK = 0.32;

const SIZE = 400;
const C = SIZE / 2;
const R = 132;

export function ReadinessRadar({
  title,
  strengths,
  gaps,
  dimensionScores,
}: ReadinessRadarProps) {
  const axes = [
    ...gaps.map((d) => ({ meta: d, weak: true })),
    ...strengths.map((d) => ({ meta: d, weak: false })),
  ]
    .map(({ meta, weak }) => ({
      id: meta.id,
      label: meta.label,
      shortLabel: meta.shortLabel,
      value: dimensionScores?.[meta.id] ?? (weak ? WEAK : STRONG),
      weak: (dimensionScores?.[meta.id] ?? (weak ? WEAK : STRONG)) < 0.5,
    }))
    // Ordre stable : on repart de l'ordre des dimensions du quiz.
    .sort((a, b) => a.id.localeCompare(b.id));

  // Sous trois axes, un radar ne veut plus rien dire — on ne l'affiche pas.
  if (axes.length < 3) return null;

  const step = (Math.PI * 2) / axes.length;
  const pt = (i: number, ratio: number) => {
    const a = -Math.PI / 2 + i * step;
    return [C + Math.cos(a) * R * ratio, C + Math.sin(a) * R * ratio] as const;
  };

  const shape = axes
    .map((ax, i) => {
      const [x, y] = pt(i, Math.max(0.12, ax.value));
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const weakest = axes.filter((a) => a.weak).slice(0, 3);

  return (
    <section className="mt-5 border border-white/[0.1] bg-brand-100/60">
      <h2 className="border-b border-white/[0.09] px-5 py-4 sm:px-6 font-mono text-[11px] uppercase tracking-ops text-brand-500">
        {title}
      </h2>

      <div className="grid gap-7 p-4 sm:p-6 md:grid-cols-[minmax(0,340px)_1fr] md:items-center">
        <svg viewBox={`-46 -20 ${SIZE + 92} ${SIZE + 40}`} className="w-full" role="img" aria-label={title}>
          {[0.25, 0.5, 0.75, 1].map((ring) => (
            <polygon
              key={ring}
              points={axes
                .map((_, i) => {
                  const [x, y] = pt(i, ring);
                  return `${x.toFixed(1)},${y.toFixed(1)}`;
                })
                .join(" ")}
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
            />
          ))}

          {axes.map((ax, i) => {
            const [x, y] = pt(i, 1);
            return (
              <line
                key={`axis-${ax.id}`}
                x1={C}
                y1={C}
                x2={x}
                y2={y}
                stroke="rgba(255,255,255,0.09)"
                strokeWidth="1"
              />
            );
          })}

          <polygon
            points={shape}
            fill="rgb(var(--brand-600) / 0.2)"
            stroke={ACCENT}
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {axes.map((ax, i) => {
            const [x, y] = pt(i, Math.max(0.12, ax.value));
            return (
              <rect
                key={`pt-${ax.id}`}
                x={x - 3.5}
                y={y - 3.5}
                width="7"
                height="7"
                fill={ax.weak ? ALERT : ACCENT}
              />
            );
          })}

          {axes.map((ax, i) => {
            const [x, y] = pt(i, 1.2);
            const anchor = x < C - 8 ? "end" : x > C + 8 ? "start" : "middle";
            return (
              <text
                key={`label-${ax.id}`}
                x={x}
                y={y + 4}
                textAnchor={anchor}
                fontFamily="IBM Plex Mono, monospace"
                fontSize="11"
                letterSpacing="1.6"
                fill={ax.weak ? ALERT : "rgb(var(--brand-500))"}
              >
                {(ax.shortLabel ?? ax.label).toUpperCase()}
              </text>
            );
          })}
        </svg>

        <div>
          <div className="flex flex-col gap-4">
            {weakest.length === 0 && (
              <p className="text-[15px] leading-relaxed text-brand-700">{SITE.resultCopy.mapAllClear}</p>
            )}
            {weakest.map((ax, i) => (
              <div key={`gauge-${ax.id}`}>
                <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-ops">
                  <span className="text-brand-700">
                    {String(i + 1).padStart(2, "0")} — {ax.label}
                  </span>
                  <span style={{ color: ALERT }}>{Math.round(ax.value * 100)}%</span>
                </div>
                <div className="mt-2 h-1.5 bg-brand-200">
                  <div
                    className="h-full"
                    style={{
                      width: `${Math.max(6, ax.value * 100)}%`,
                      background: ALERT,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {weakest.length > 0 && (
            <p className="mt-6 text-sm leading-relaxed text-brand-700">
              {SITE.resultCopy.mapWeakestTemplate.replace("{dimension}", weakest[0]!.label)}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
