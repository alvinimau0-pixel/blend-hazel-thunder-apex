import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SiteGate } from "@/components/site-gate";
import { Spinner } from "@/components/status-states";
import { Button } from "@/components/ui/button";
import { useAsOf } from "@/lib/as-of";
import { buildMskInsights, type SiteSnapshot } from "@/lib/domain";
import { TRADE_LABEL, TRADE_WEIGHT } from "@/lib/msk-seed";
import { useSite } from "@/lib/use-site";
import { formatStamp, todayIso } from "@/lib/utils";
import { formatPulled, useAutoReport } from "@/lib/use-auto-report";

export const Route = createFileRoute("/dash")({
  component: DashRoute,
  head: () => ({
    meta: [
      { title: "Charts · Gelaran Maju" },
      { name: "description", content: "Live MSK charts from the Capitol board." },
    ],
  }),
});

const INK = "#1c1916";
const ACCENT = "#2f445a";
const STAMP = "#6e2c22";
const DONE = "#14532d";
const MUTED = "#6f675d";
const LINE = "#d3cbbd";
const PAPER = "#fbf8f1";

function DashRoute() {
  return <SiteGate live>{(site) => <DashBody site={site} />}</SiteGate>;
}

function DashBody({ site }: { site: SiteSnapshot }) {
  const { asOf, setAsOf } = useAsOf();
  const live = useSite({ live: true });
  const auto = useAutoReport(asOf);
  const msk = buildMskInsights(site, asOf);

  useEffect(() => {
    const roll = () => {
      const today = todayIso();
      if (today !== asOf) setAsOf(today);
    };
    roll();
    const id = window.setInterval(roll, 30_000);
    return () => window.clearInterval(id);
  }, [asOf, setAsOf]);

  const pulled = live.dataUpdatedAt
    ? new Date(live.dataUpdatedAt).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Kuala_Lumpur",
      })
    : "—";

  const trades = [
    { name: "CW", label: TRADE_LABEL.CW, pct: msk.tradeAvg.CW, weight: Math.round(TRADE_WEIGHT.CW * 100) },
    { name: "SAN", label: TRADE_LABEL.SAN, pct: msk.tradeAvg.SAN, weight: Math.round(TRADE_WEIGHT.SAN * 100) },
    { name: "IRR", label: TRADE_LABEL.IRR, pct: msk.tradeAvg.IRR, weight: Math.round(TRADE_WEIGHT.IRR * 100) },
  ];

  const towers = [
    { name: "TA", pct: msk.towerAvg.A },
    { name: "TB", pct: msk.towerAvg.B },
  ];

  const floors = msk.levelRows.map((row) => ({
    floor: row.level.code.replace(/^L/, ""),
    TA: row.A,
    TB: row.B,
  }));

  const packs = msk.itemAvgs
    .slice()
    .sort((a, b) => b.avg - a.avg)
    .map((row) => ({
      name: row.item.shortName,
      pct: row.avg,
      trade: row.item.trade,
    }));

  let done = 0;
  let mid = 0;
  let zero = 0;
  let na = 0;
  for (const p of site.mskProgress) {
    if (p.na) na += 1;
    else if (p.pct >= 100) done += 1;
    else if (p.pct > 0) mid += 1;
    else zero += 1;
  }
  const buckets = [
    { name: "100%", value: done, fill: DONE },
    { name: "Moving", value: mid, fill: ACCENT },
    { name: "0%", value: zero, fill: STAMP },
    { name: "N/A", value: na, fill: LINE },
  ];

  const holes = msk.flags.filter((f) => f.kind === "hole").length;
  const next = msk.flags.filter((f) => f.kind === "risk").length;
  const lag = msk.flags.filter((f) => f.kind === "lag").length;

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-display text-[11px] uppercase tracking-[0.18em] text-muted">Dashboard</p>
          <h1 className="font-display text-3xl uppercase tracking-wide">Charts</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Live board · {formatStamp(asOf)} · lock is the same number as Today
          </p>
          <p className="mt-1 flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-muted">
            <span className={live.isFetching ? "size-2 animate-pulse rounded-full bg-stamp" : "size-2 rounded-full bg-cell-done-ink"} />
            Auto every 15s · pulled {pulled}
            <span className="mx-2">·</span>
            Reports {auto.on ? "auto" : "off"} · {formatPulled(auto.lastAt)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => void live.refetch()} disabled={live.isFetching}>
            {live.isFetching ? (
              <>
                <Spinner /> Updating…
              </>
            ) : (
              "Refresh now"
            )}
          </Button>
          <Link to="/msk" className="text-sm font-medium text-accent underline-offset-4 hover:underline">
            Open MSK board
          </Link>
        </div>
      </header>

      <section className="grid gap-3 sm:grid-cols-4">
        <Stat label="Tower lock" value={`${msk.weightedAvg}%`} hint="CW 40 · SAN 33 · IRR 8" />
        <Stat label="Tower A" value={`${msk.towerAvg.A}%`} />
        <Stat label="Tower B" value={`${msk.towerAvg.B}%`} />
        <Stat label="Skipped / next / lag" value={`${holes} / ${next} / ${lag}`} hint="Live holes only" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card title="Trades" hint="Mean of live cells, then one lock">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trades} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={LINE} vertical={false} />
                <XAxis dataKey="name" tick={{ fill: MUTED, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: MUTED, fontSize: 11 }} axisLine={false} tickLine={false} width={32} />
                <Tooltip content={<PctTip extra={(d) => `${d.label} · weight ${d.weight}%`} />} />
                <Bar dataKey="pct" radius={[6, 6, 0, 0]} maxBarSize={48}>
                  <Cell fill={ACCENT} />
                  <Cell fill={STAMP} />
                  <Cell fill={DONE} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Cells" hint="Every package × floor × tower">
          <div className="flex h-56 items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={buckets} dataKey="value" nameKey="name" innerRadius={52} outerRadius={78} paddingAngle={2} stroke={PAPER}>
                  {buckets.map((b) => (
                    <Cell key={b.name} fill={b.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CountTip />} />
                <Legend
                  verticalAlign="middle"
                  align="right"
                  layout="vertical"
                  iconType="circle"
                  formatter={(value) => <span className="text-xs text-ink-soft">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <Card title="Floors L13–31M" hint="Average of live packages on that floor">
        <div className="h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={floors} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={LINE} vertical={false} />
              <XAxis dataKey="floor" tick={{ fill: MUTED, fontSize: 10 }} axisLine={false} tickLine={false} interval={0} />
              <YAxis domain={[0, 100]} tick={{ fill: MUTED, fontSize: 11 }} axisLine={false} tickLine={false} width={32} />
              <Tooltip content={<PctTip />} />
              <Legend formatter={(v) => <span className="text-xs text-ink-soft">{v}</span>} />
              <Bar dataKey="TA" fill={ACCENT} radius={[3, 3, 0, 0]} maxBarSize={14} />
              <Bar dataKey="TB" fill={STAMP} radius={[3, 3, 0, 0]} maxBarSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="Packages" hint="Highest first · same cells as the board">
        <div className="h-[28rem]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={packs} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 0 }}>
              <CartesianGrid stroke={LINE} horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: MUTED, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                width={88}
                tick={{ fill: INK, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<PctTip extra={(d) => String(d.trade ?? "")} />} />
              <Bar dataKey="pct" radius={[0, 6, 6, 0]} maxBarSize={16}>
                {packs.map((p) => (
                  <Cell key={p.name} fill={p.trade === "CW" ? ACCENT : p.trade === "SAN" ? STAMP : DONE} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <p className="text-xs text-muted">
        Towers {towers.map((t) => `${t.name} ${t.pct}%`).join(" · ")}. Podium stays on the last certified claim — not in
        these bars.
      </p>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl bg-panel px-4 py-3 shadow-docket">
      <p className="font-display text-[11px] uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-1 font-display text-3xl uppercase tracking-wide tabular-nums">{value}</p>
      {hint ? <p className="mt-1 text-[11px] text-muted">{hint}</p> : null}
    </div>
  );
}

function Card({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="rounded-xl bg-panel p-4 shadow-docket sm:p-5">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-xl uppercase tracking-wide">{title}</h2>
        {hint ? <p className="text-[11px] uppercase tracking-[0.12em] text-muted">{hint}</p> : null}
      </div>
      {children}
    </section>
  );
}

type TipPayload = { name?: string; value?: number; payload?: Record<string, unknown> };

function PctTip({
  active,
  payload,
  extra,
}: {
  active?: boolean;
  payload?: TipPayload[];
  extra?: (d: Record<string, unknown>) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-line bg-sheet px-3 py-2 text-xs shadow-docket">
      {payload.map((row) => (
        <p key={String(row.name)}>
          <span className="font-semibold">{row.name}</span> {row.value}%
        </p>
      ))}
      {extra && payload[0]?.payload ? <p className="mt-1 text-muted">{extra(payload[0].payload)}</p> : null}
    </div>
  );
}

function CountTip({ active, payload }: { active?: boolean; payload?: TipPayload[] }) {
  if (!active || !payload?.length) return null;
  const row = payload[0];
  return (
    <div className="rounded-md border border-line bg-sheet px-3 py-2 text-xs shadow-docket">
      <p>
        <span className="font-semibold">{row.name}</span> {row.value} cells
      </p>
    </div>
  );
}
