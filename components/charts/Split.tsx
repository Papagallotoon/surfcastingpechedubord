import { TONE, type SplitSide } from "@/content/articles";
import { Figure } from "./Figure";

// Deux colonnes en vis-à-vis : avant / après, ou dépense / risque. Les hauteurs
// sont proportionnelles, donc l'écart se lit sans lire les chiffres.
export function Split({
  index,
  title,
  note,
  left,
  right,
}: {
  index?: string;
  title: string;
  note?: string;
  left: SplitSide;
  right: SplitSide;
}) {
  const ceiling = Math.max(left.value, right.value, 1);

  return (
    <Figure index={index} title={title} note={note}>
      <div className="grid grid-cols-2 gap-px">
        {[left, right].map((side) => (
          <div key={side.label} className="bg-brand-50/60 p-4">
            <div className="flex h-[130px] items-end">
              <div
                className="w-full"
                style={{
                  height: `${Math.max((side.value / ceiling) * 100, 4)}%`,
                  background: TONE[side.tone],
                }}
              />
            </div>
            <div
              className="mt-3.5 font-condensed text-[26px] font-extrabold uppercase leading-none"
              style={{ color: TONE[side.tone] }}
            >
              {side.display}
            </div>
            <div className="mt-1.5 font-mono text-[10px] uppercase tracking-ops text-brand-500">
              {side.label}
            </div>
            <p className="mt-2.5 font-serif text-[15px] leading-[1.5] text-brand-700">
              {side.caption}
            </p>
          </div>
        ))}
      </div>
    </Figure>
  );
}
