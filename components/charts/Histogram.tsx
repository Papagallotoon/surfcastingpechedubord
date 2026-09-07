// Distribution des index de tous les foyers évalués, avec la colonne de
// l'utilisateur en accent. Sert uniquement dans le résultat d'évaluation.
export function Histogram({
  buckets,
  youIndex,
}: {
  buckets: number[];
  youIndex: number;
}) {
  const max = Math.max(...buckets, 1);

  return (
    <>
      <div className="mt-1 flex h-[150px] items-end gap-1.5">
        {buckets.map((n, i) => (
          <div key={i} className="flex h-[150px] flex-1 flex-col items-center justify-end">
            {i === youIndex && (
              <span className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-brand-600">
                You
              </span>
            )}
            <div
              className="w-full"
              style={{
                height: `${(n / max) * 118}px`,
                background: i === youIndex ? "#0E7C6E" : "rgba(28,31,34,0.16)",
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[9px] tracking-[0.12em] text-brand-500">
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>
    </>
  );
}
