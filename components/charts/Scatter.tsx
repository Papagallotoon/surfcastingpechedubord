import { TONE, type Point } from "@/content/articles";
import { Figure } from "./Figure";

// Nuage de points prix / score, avec ligne de tendance en pointillé. SVG pur,
// viewBox fixe : la figure reste lisible de 320 px à 900 px de large.
const X0 = 34;
const X1 = 302;
const Y0 = 175;
const Y1 = 25;

export function Scatter({
  index,
  title,
  note,
  points,
  xTicks,
  xMin,
  xMax,
  yMin,
  yMax,
  yTicks,
  trend,
}: {
  index?: string;
  title: string;
  note?: string;
  points: Point[];
  xTicks: string[];
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  yTicks: number[];
  trend?: [number, number, number, number];
}) {
  const px = (x: number) => X0 + ((x - xMin) / (xMax - xMin)) * (X1 - X0);
  const py = (y: number) => Y0 - ((y - yMin) / (yMax - yMin)) * (Y0 - Y1);

  return (
    <Figure
      index={index}
      title={title}
      note={note}
      legend={[
        { label: "Recommandé", color: TONE.good },
        { label: "Bon rapport qualité-prix", color: TONE.ok },
        { label: "Cher pour le score", color: TONE.bad },
      ]}
    >
      <svg
        viewBox="0 0 320 200"
        className="block h-auto w-full overflow-visible"
        role="img"
        aria-label={title}
      >
        {yTicks.map((t) => (
          <g key={t}>
            <line
              x1={X0}
              y1={py(t)}
              x2={X1}
              y2={py(t)}
              stroke="rgba(28,31,34,0.10)"
              strokeWidth="1"
            />
            <text
              x={X0 - 6}
              y={py(t) + 3}
              textAnchor="end"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="8"
              fill="#6B7074"
            >
              {t}
            </text>
          </g>
        ))}
        <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke="rgba(28,31,34,0.24)" strokeWidth="1" />
        <line x1={X0} y1={Y1} x2={X0} y2={Y0} stroke="rgba(28,31,34,0.24)" strokeWidth="1" />
        {xTicks.map((label, i) => (
          <text
            key={label}
            x={X0 + (i / (xTicks.length - 1)) * (X1 - X0)}
            y={192}
            textAnchor={i === 0 ? "start" : i === xTicks.length - 1 ? "end" : "middle"}
            fontFamily="IBM Plex Mono, monospace"
            fontSize="8"
            fill="#6B7074"
          >
            {label}
          </text>
        ))}
        {trend && (
          <line
            x1={px(trend[0])}
            y1={py(trend[1])}
            x2={px(trend[2])}
            y2={py(trend[3])}
            stroke="#8A8F93"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        )}
        {points.map((p) => (
          <g key={p.label}>
            <circle cx={px(p.x)} cy={py(p.y)} r="5" fill={TONE[p.tone]} />
            <text
              x={px(p.x)}
              y={py(p.y) - 11}
              textAnchor="middle"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="8"
              fill="#33383C"
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </Figure>
  );
}
