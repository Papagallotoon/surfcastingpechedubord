import type { ResultProfile } from "@/lib/types";
import { SITE } from "@/config/active";
import { headingClass } from "@/lib/heading";
import { ScoreGauge } from "./ScoreGauge";

interface ScoreDisplayProps {
  scoreLabel: string;
  score: number;
  profile: ResultProfile;
}

export function ScoreDisplay({ scoreLabel, score, profile }: ScoreDisplayProps) {
  return (
    <div className="reticle border border-brand-600/20 bg-brand-100/70 p-5 sm:p-10">
      <div className="grid gap-10 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-11">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-ops text-brand-600">
            {scoreLabel}
          </p>
          <div className="mt-1.5">
            <ScoreGauge score={score} />
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-2.5 border border-brand-600/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-ops text-brand-600">
            <span aria-hidden className="h-1.5 w-1.5 bg-brand-600" />
            {SITE.resultCopy.classificationLabel} — {profile.label}
          </div>
          <h2 className={`${headingClass(SITE)} mt-4 text-[30px] leading-[1.02] text-brand-950 sm:text-[44px]`}>
            {profile.headline}
          </h2>
          <p className="mt-3.5 max-w-lg text-base leading-relaxed text-brand-700">
            {profile.description}
          </p>
        </div>
      </div>
    </div>
  );
}
