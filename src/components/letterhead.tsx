import { COMPANY, siteLine } from "@/lib/company";
import { CompanyMark } from "@/components/company-mark";
import { formatStamp } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Letterhead({
  asOf,
  compact = false,
}: {
  asOf: string;
  compact?: boolean;
}) {
  return (
    <div className="min-w-0 w-full">
      <div className="flex min-w-0 items-center gap-2.5 sm:gap-3.5">
        <CompanyMark className={compact ? "size-10" : "size-12 sm:size-16"} />
        <div className="min-w-0 flex-1">
          <div className="w-fit max-w-full">
            <p
              className={cn(
                "truncate font-display font-extrabold uppercase leading-[0.95] text-ink",
                compact
                  ? "text-[14px] tracking-[0.04em] sm:text-[1.25rem] sm:tracking-[0.06em]"
                  : "text-[clamp(1.05rem,4.6vw,1.9rem)] tracking-[0.05em]",
              )}
            >
              {COMPANY.legal}
            </p>
            <p
              className={cn(
                "mt-0.5 text-right font-display font-medium leading-none text-ink",
                compact ? "text-[10px] tracking-wide" : "text-[11px] sm:text-sm",
              )}
            >
              ({COMPANY.registration})
            </p>
          </div>
        </div>
      </div>
      {compact ? null : (
        <>
          <div className="mt-2.5 h-px bg-ink" />
          <p className="mt-1.5 truncate text-[10px] uppercase tracking-[0.16em] text-muted sm:text-[11px]">
            {COMPANY.trade} · {siteLine()} · {formatStamp(asOf)}
          </p>
        </>
      )}
    </div>
  );
}
