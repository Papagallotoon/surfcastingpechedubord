import { TONE, type BarItem } from "@/content/articles";
import { Figure } from "./Figure";

// Barres horizontales : le format qui supporte le mieux un libellé long et une
// valeur lue de gauche à droite. Largeur en pourcentage du maximum de la série.
export function Bars({
  index,
  title,
  note,
  items,
  max,
}: {
  index?: string;
  title: string;
  note?: string;
  items: BarItem[];
  max?: number;
}) {
  const ceiling = max ?? Math.max(...items.map((i) => i.value), 1);

  return (
    <Figure index={index} title={title} note={note}>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[minmax(96px,132px)_1fr_58px] items-center gap-3.5"
          >
            <span className="font-sans text-[14px] font-medium text-brand-900">{item.label}</span>
            <span className="block h-4 bg-brand-950/10">
              <span
                className="block h-4"
                style={{
                  width: `${Math.max((item.value / ceiling) * 100, item.value > 0 ? 1.5 : 0)}%`,
                  background: TONE[item.tone],
                }}
              />
            </span>
            <span
              className="text-right font-mono text-[12px]"
              style={{ color: TONE[item.tone] }}
            >
              {item.display}
            </span>
          </div>
        ))}
      </div>
    </Figure>
  );
}
