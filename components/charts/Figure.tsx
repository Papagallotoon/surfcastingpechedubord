import type { ReactNode } from "react";

// Cadre commun à tous les graphiques : carte claire, filet, légende mono en
// haut, note de méthode en pied. Rien d'interactif — ces blocs sont rendus côté
// serveur et lisibles à l'impression.
export function Figure({
  index,
  title,
  note,
  legend,
  children,
}: {
  index?: string;
  title: string;
  note?: string;
  legend?: { label: string; color: string }[];
  children: ReactNode;
}) {
  return (
    <figure className="my-8 border border-brand-300 bg-brand-100 p-[22px]">
      <figcaption className="font-mono text-[10px] uppercase tracking-ops text-brand-500">
        {index ? `${index} · ` : ""}
        {title}
      </figcaption>
      <div className="mt-5">{children}</div>
      {legend && (
        <div className="mt-4 flex flex-wrap gap-4 border-t border-brand-200 pt-3.5 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-500">
          {legend.map((l) => (
            <span key={l.label} className="flex items-center gap-[7px]">
              <span className="block h-[9px] w-[9px]" style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      )}
      {note && (
        <div className="mt-4 border-t border-brand-200 pt-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-500">
          {note}
        </div>
      )}
    </figure>
  );
}
