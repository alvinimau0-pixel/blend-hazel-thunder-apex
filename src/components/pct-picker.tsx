import { cn } from "@/lib/utils";
import { TENANT_OUTLETS } from "@/lib/msk-seed";

export function PctPicker({
  value,
  onChange,
  outlets,
}: {
  value: number;
  onChange: (n: number) => void;
  outlets?: number;
}) {
  const of = outlets ?? 0;
  const chips = of
    ? [
        { n: 0, label: "0" },
        { n: Math.round((4 / of) * 100), label: "4/12" },
        { n: 50, label: "6/12" },
        { n: Math.round((8 / of) * 100), label: "8/12" },
        { n: 100, label: "12/12" },
      ]
    : [
        { n: 0, label: "0" },
        { n: 25, label: "25" },
        { n: 50, label: "50" },
        { n: 75, label: "75" },
        { n: 100, label: "100" },
      ];

  function setRaw(raw: string) {
    const n = Number(raw);
    if (!Number.isFinite(n)) return;
    onChange(Math.max(0, Math.min(100, Math.round(n))));
  }

  return (
    <div className="space-y-2">
      <div className="flex items-end gap-2">
        <label className="min-w-0 flex-1">
          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Set %
          </span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            max={100}
            value={value}
            onChange={(e) => setRaw(e.target.value)}
            className="mt-1 h-12 w-full rounded-md border border-line bg-panel px-3 font-mono text-lg tabular-nums outline-none ring-ring focus:ring-2"
          />
        </label>
        <span className="mb-2 font-display text-sm uppercase text-muted">%</span>
      </div>
      {of > 0 ? (
        <p className="text-[12px] text-ink-soft">
          {Math.round((value / 100) * of)} of {of} outlets
          {value === 0 ? " · this floor is next" : null}
        </p>
      ) : null}
      <div className="grid grid-cols-5 gap-1.5">
        {chips.map((c) => (
          <button
            key={c.label}
            type="button"
            onClick={() => onChange(c.n)}
            className={cn(
              "min-h-11 rounded-md border text-sm tabular-nums",
              value === c.n ? "border-ink bg-ink text-paper" : "border-line bg-panel hover:bg-paper-2",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-accent"
      />
    </div>
  );
}

export function tenantOutlets(seq?: number) {
  return seq === 9 ? TENANT_OUTLETS : undefined;
}
