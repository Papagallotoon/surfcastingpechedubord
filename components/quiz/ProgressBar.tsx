import { SITE } from "@/config/active";

interface ProgressBarProps {
  current: number;
  total: number;
}

/**
 * Barre segmentée : une case par question. Plus lisible qu'une barre continue
 * sur un parcours court — on voit combien de phases restent, pas un pourcentage.
 */
export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-ops text-brand-500">
        <span>
          {SITE.quizStepLabel ?? "Step"} {String(current).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
        <span>{percent}%</span>
      </div>
      <div
        className="flex w-full gap-1"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 transition-colors duration-300 ${
              i < current ? "bg-brand-600" : "bg-brand-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
