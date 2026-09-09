import type { SiteSnapshot } from "@/lib/domain";
import { NOW_SCOPE } from "@/lib/work-scope";

export function TodayBoard({ who = "all" }: { site: SiteSnapshot; who?: "all" | "gm" | "sub" }) {
  const rows = NOW_SCOPE.filter((row) => (who === "sub" ? row.kind === "sub" : who === "gm" ? row.kind === "gm" : true));

  return (
    <div className="space-y-5">
      <section className="rounded-xl bg-panel p-4 shadow-docket sm:p-5">
        <h2 className="font-display text-xl uppercase tracking-wide">Now on site</h2>
        <p className="mt-1 text-[12px] text-muted">
          Current scope only. GM workers are on the board. Subs are listed, not auto-assigned.
        </p>
        <ul className="mt-3 divide-y divide-line">
          {rows.map((row) => (
            <li
              key={`${row.kind}-${row.who}-${row.work}`}
              className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
            >
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-wide">
                  {row.who}
                  <span className="ml-2 font-sans text-[11px] font-normal normal-case tracking-normal text-muted">
                    {row.kind === "sub" ? "Sub" : "GM"}
                  </span>
                </p>
                <p className="text-sm text-ink">{row.work}</p>
              </div>
              <p className="max-w-md text-[12px] text-ink-soft sm:text-right">{row.detail}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
