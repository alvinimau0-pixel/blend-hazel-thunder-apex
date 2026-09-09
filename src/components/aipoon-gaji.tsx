import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AIPOON_GAJI, buildAipoonGaji } from "@/lib/aipoon";
import { formatRm, hasRealPhoto, photoList, type SiteSnapshot } from "@/lib/domain";
import { cn, formatStamp } from "@/lib/utils";
import { AddPicture } from "@/components/add-picture";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Letterhead } from "@/components/letterhead";
import { useSiteMutations } from "@/lib/use-site";

export function AipoonGaji({ site }: { site: SiteSnapshot }) {
  const gaji = buildAipoonGaji(site);

  return (
    <section className="print-sheet space-y-4 rounded-xl bg-panel p-4 shadow-docket sm:p-5">
      <div className="mb-3 hidden print-only">
        <Letterhead asOf={AIPOON_GAJI.dated} />
      </div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-display text-[11px] uppercase tracking-[0.16em] text-muted">
            Sub gaji · {formatStamp(AIPOON_GAJI.dated)} · {AIPOON_GAJI.po}
          </p>
          <h2 className="mt-1 font-display text-2xl uppercase tracking-wide">Aipoon</h2>
          <p className="mt-1 max-w-md text-sm text-ink-soft">{AIPOON_GAJI.title}. Labour from the point sheet. Not the client PC.</p>
        </div>
        <div className="text-right">
          <p className="font-display text-4xl font-semibold tabular-nums">
            {formatRm(gaji.earned)}
            <span className="text-lg text-muted"> RM</span>
          </p>
          <p className="text-[12px] text-muted">
            of RM {formatRm(gaji.labourTotal)} · {gaji.pct}%
          </p>
          <Button size="sm" variant="outline" className="mt-2 no-print" onClick={() => window.print()}>
            Print
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {gaji.packages.map((pkg) => (
          <article key={pkg.id} className="rounded-lg bg-paper-2 p-3">
            <div className="flex items-baseline justify-between gap-2">
              <p className="font-display text-sm uppercase tracking-wide">{pkg.label}</p>
              <Badge tone={pkg.earned >= pkg.labourTotal ? "done" : pkg.earned > 0 ? "risk" : "track"}>
                {pkg.doneFloors}/{pkg.floorCount}
              </Badge>
            </div>
            <p className="mt-0.5 text-[11px] text-muted">{pkg.points}</p>
            <p className="mt-2 font-display text-xl font-semibold tabular-nums">
              RM {formatRm(pkg.earned)}
              <span className="text-sm font-normal text-muted"> / {formatRm(pkg.labourTotal)}</span>
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1">
              <li className="text-[10px] uppercase tracking-[0.12em] text-muted">TA</li>
              <li className="text-[10px] uppercase tracking-[0.12em] text-muted">TB</li>
              {AIPOON_GAJI.floors.map((code) => {
                const a = pkg.cells.find((c) => c.level === code && c.tower === "A");
                const b = pkg.cells.find((c) => c.level === code && c.tower === "B");
                return (
                  <li key={code} className="col-span-2 grid grid-cols-[2.2rem_1fr_1fr] items-center gap-1">
                    <span className="font-display text-[11px] uppercase">{code}</span>
                    <FloorPct pct={a?.pct ?? 0} />
                    <FloorPct pct={b?.pct ?? 0} />
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>

      <AipoonPictures site={site} />

      <p className="text-[12px] text-ink-soft">
        Official sheet grand RM {formatRm(AIPOON_GAJI.grandTotal)} · toilet RM {formatRm(AIPOON_GAJI.toiletFinal)} · tenant
        RM {formatRm(AIPOON_GAJI.tenantFinal)}. Work is L24–L30 both towers. L13–L23 and L31 are not Aipoon. Pay the live board %.
      </p>
    </section>
  );
}

const PHOTO_SLOTS = [
  { level: "L24", tower: "A" as const, label: "L24 TA" },
  { level: "L24", tower: "B" as const, label: "L24 TB" },
  { level: "L25", tower: "A" as const, label: "L25 TA" },
  { level: "L25", tower: "B" as const, label: "L25 TB" },
  { level: "L26", tower: "A" as const, label: "L26 TA" },
  { level: "L26", tower: "B" as const, label: "L26 TB" },
  { level: "L27", tower: "A" as const, label: "L27 TA" },
  { level: "L27", tower: "B" as const, label: "L27 TB" },
  { level: "L28", tower: "A" as const, label: "L28 TA" },
  { level: "L28", tower: "B" as const, label: "L28 TB" },
  { level: "L29", tower: "A" as const, label: "L29 TA" },
  { level: "L29", tower: "B" as const, label: "L29 TB" },
  { level: "L30", tower: "A" as const, label: "L30 TA" },
  { level: "L30", tower: "B" as const, label: "L30 TB" },
];

function AipoonPictures({ site }: { site: SiteSnapshot }) {
  const { attachPhoto } = useSiteMutations();
  const [slot, setSlot] = useState("L27A");
  const [photo, setPhoto] = useState<string | null>(null);
  const aipoon = site.crew.find((c) => c.callsign === "Aipoon");
  const item = site.mskItems.find((i) => i.seq === 9);
  const levelByCode = useMemo(() => new Map(site.mskLevels.map((l) => [l.code, l])), [site.mskLevels]);

  const shots = site.mskAssignments.flatMap((a) => {
    if (a.crewId !== aipoon?.id || !hasRealPhoto(a.photoData)) return [];
    const urls = photoList(a.photoData);
    const level = site.mskLevels.find((l) => l.id === a.levelId);
    return urls.map((src, i) => ({
      src,
      key: `${a.id}-${i}`,
      label:
        level?.code === "L27" && a.tower === "A"
          ? `L27 TA · ${i === 0 ? "1st" : i === 1 ? "2nd" : `${i + 1}th`} outlet`
          : `${level?.code ?? ""} T${a.tower}`,
    }));
  });

  function savePhoto() {
    if (!photo || !aipoon || !item) return;
    const picked = PHOTO_SLOTS.find((s) => `${s.level}${s.tower}` === slot) ?? PHOTO_SLOTS[2];
    const level = levelByCode.get(picked.level);
    if (!level) return;
    const row = site.mskAssignments
      .filter((a) => a.crewId === aipoon.id && a.levelId === level.id && a.tower === picked.tower && a.itemId === item.id)
      .sort((a, b) => b.id - a.id)[0];
    if (!row) {
      toast.error(`No Aipoon ticket on ${picked.label} yet`);
      return;
    }
    attachPhoto.mutate(
      { assignmentId: row.id, photoData: photo, kind: "msk" },
      {
        onSuccess: () => {
          setPhoto(null);
          toast.success(`Picture saved on ${picked.label}`);
        },
        onError: (err) => toast.error(err instanceof Error ? err.message : "Could not save picture"),
      },
    );
  }

  return (
    <div className="rounded-lg bg-paper-2 p-3 no-print">
      <p className="font-display text-sm uppercase tracking-wide">Pictures</p>
      <p className="mt-0.5 text-[12px] text-muted">L27 TA 1st & 2nd outlet on file. Add a picture on the floor you just moved. Still need L24–L25 TB and L27 TB.</p>
      <div className="mt-3 grid grid-cols-3 gap-1.5 sm:grid-cols-6">
        {PHOTO_SLOTS.map((s) => {
          const id = `${s.level}${s.tower}`;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setSlot(id)}
              className={cn(
                "min-h-11 rounded-md border px-2 text-sm",
                slot === id ? "border-ink bg-panel" : "border-line bg-panel text-muted",
              )}
            >
              {s.label}
            </button>
          );
        })}
      </div>
      <div className="mt-3">
        <AddPicture value={photo} onChange={setPhoto} needed />
      </div>
      <Button size="sm" className="mt-2 min-h-11 w-full sm:w-auto" disabled={!photo || attachPhoto.isPending} onClick={() => void savePhoto()}>
        Save picture
      </Button>
      {shots.length > 0 ? (
        <ul className="mt-3 grid grid-cols-2 gap-2">
          {shots.map((s) => (
            <li key={s.key}>
              <img src={s.src} alt={s.label} loading="lazy" decoding="async" className="h-28 w-full rounded-md object-cover" />
              <p className="mt-1 text-[11px] uppercase text-muted">{s.label}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-[12px] text-stamp">No pictures yet — L24–L25 100% and L27 jump still need a photo.</p>
      )}
    </div>
  );
}

function FloorPct({ pct }: { pct: number }) {
  const tone = pct >= 100 ? "done" : pct > 0 ? "risk" : "track";
  return (
    <span
      className={cn(
        "flex h-7 items-center justify-center rounded-sm font-mono text-[11px] tabular-nums",
        tone === "done" && "bg-cell-done text-cell-done-ink",
        tone === "risk" && "bg-cell-risk text-cell-risk-ink",
        tone === "track" && "border border-line bg-panel text-muted",
      )}
    >
      {pct}%
    </span>
  );
}
