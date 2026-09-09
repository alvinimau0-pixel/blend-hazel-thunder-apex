import { SIGN_OFF } from "@/lib/company";

export function SignOff({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      <p className="font-display text-[11px] uppercase tracking-[0.18em] text-muted">Sign-off</p>
      <div className={compact ? "mt-2 space-y-2" : "mt-3 grid gap-3 sm:grid-cols-3"}>
        {SIGN_OFF.map((row) => (
          <div key={row.role} className="min-w-0">
            <p className="font-display text-[10px] uppercase tracking-[0.16em] text-muted">{row.role}</p>
            <p className="mt-1 font-display text-base font-semibold uppercase leading-tight tracking-wide">
              {row.names}
            </p>
            <p className="text-[11px] text-ink-soft">{row.title}</p>
            <div className="mt-4 border-b border-ink/70" />
          </div>
        ))}
      </div>
    </div>
  );
}
