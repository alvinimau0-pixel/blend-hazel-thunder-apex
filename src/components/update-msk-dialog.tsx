import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label, Textarea } from "@/components/ui/input";
import { AddPicture } from "@/components/add-picture";
import { PctPicker, tenantOutlets } from "@/components/pct-picker";
import { Spinner } from "@/components/status-states";
import { WhoDidThis, scopeFromTrade, withScopeNote, type JobScope } from "@/components/who-did";
import type { CrewMember, MskItem, MskLevel } from "@/lib/domain";
import { siteCrewGrouped } from "@/lib/domain";
import { TRADE_LABEL, SAN_TENANT_SEQ } from "@/lib/msk-seed";
import { useAsOf } from "@/lib/as-of";
import { useSiteMutations } from "@/lib/use-site";

export type MskCellTarget = {
  level: MskLevel;
  tower: "A" | "B";
  item: MskItem;
  pct: number;
  na?: boolean;
};

export function UpdateMskDialog({
  open,
  onOpenChange,
  target,
  crew,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  target: MskCellTarget | null;
  crew: CrewMember[];
}) {
  const { asOf } = useAsOf();
  const { updateMsk } = useSiteMutations();
  const [pct, setPct] = useState(0);
  const [crewId, setCrewId] = useState<number>(crew[0]?.id ?? 0);
  const [scope, setScope] = useState<JobScope>("SAN");
  const [note, setNote] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (target) {
      setPct(target.pct);
      setNote("");
      setPhoto(null);
      const listed = siteCrewGrouped(crew).all;
      const match =
        (target.item.seq === SAN_TENANT_SEQ && listed.find((c) => c.callsign === "Aipoon")) ||
        listed.find((c) =>
          c.trade.toLowerCase().includes(target.item.shortName.split(" ")[0]?.toLowerCase() ?? ""),
        ) ||
        listed[0];
      if (match) {
        setCrewId(match.id);
        setScope(scopeFromTrade(match.trade, target.item.trade));
      } else {
        setScope(scopeFromTrade("", target.item.trade));
      }
    }
  }, [target, crew]);

  const who = crew.find((c) => c.id === crewId);
  const sub = who?.contractor === "SUB";
  const warnings = useMemo(() => {
    if (!target) return [];
    const list: string[] = [];
    const jump = pct - target.pct;
    if (pct < target.pct) list.push("Progress went backwards. That will be flagged.");
    if ((jump >= 30 || pct >= 100) && !photo) {
      list.push(
        sub
          ? "Big jump with no photo. Sub update waits for GM check — not the client claim."
          : "Big jump with no photo. It still goes on the board — attach a photo so nobody can lie.",
      );
    }
    if (sub) list.push("Sub update: board will not move until GM checks it. This is not the PC claim to the client.");
    return list;
  }, [target, pct, photo, sub]);

  function submit() {
    if (!target) return;
    if (!crewId) {
      toast.error("Pick who did the work");
      return;
    }
    setBusy(true);
    updateMsk.mutate(
      {
        levelId: target.level.id,
        tower: target.tower,
        itemId: target.item.id,
        pct,
        crewId,
        note: withScopeNote(note, scope),
        photoData: photo || undefined,
        workDate: asOf,
      },
      {
        onSuccess: () => toast.success(sub ? "Saved. Waiting GM check — not the client claim." : "On the board."),
        onError: (err) => toast.error(err instanceof Error ? err.message : "Update failed"),
        onSettled: () => setBusy(false),
      },
    );
    onOpenChange(false);
  }

  if (!target) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Log MSK progress</DialogTitle>
        <DialogDescription>
          {target.level.code} Tower {target.tower} · {target.item.name}
        </DialogDescription>
        <div className="mt-4 grid gap-3">
          <div className="rounded-lg bg-paper-2 px-3 py-2 text-xs text-ink-soft">
            {TRADE_LABEL[target.item.trade]} · now {target.na ? "N/A" : `${target.pct}%`} · FFL {target.level.ffl}
            {target.na
              ? " · Sheet marked N/A. Save will put this cell on the lock."
              : target.pct === 0
                ? target.item.seq === SAN_TENANT_SEQ
                  ? " · This floor is open. Type any % — 33 is 4 of 12 outlets."
                  : " · This floor is open. Type any %."
                : null}
          </div>
          <PctPicker value={pct} onChange={setPct} outlets={tenantOutlets(target.item.seq)} />
          <WhoDidThis
            crew={crew}
            crewId={crewId}
            onCrewId={setCrewId}
            scope={scope}
            onScope={setScope}
            preferSubs={target.item.seq === SAN_TENANT_SEQ}
            idPrefix="msk-who"
          />
          {warnings.length > 0 ? (
            <ul className="space-y-1 rounded-lg bg-cell-risk/60 px-3 py-2 text-xs text-cell-risk-ink">
              {warnings.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          ) : null}
          <Button className="min-h-11" onClick={() => void submit()} disabled={busy}>
            {busy ? (
              <>
                <Spinner /> Saving…
              </>
            ) : (
              "Save progress"
            )}
          </Button>
          <div>
            <Label htmlFor="msk-note">What was done</Label>
            <Textarea
              id="msk-note"
              className="mt-1"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Short site note. Floor, package, what finished."
            />
          </div>
          <div>
            <Label>Photo evidence</Label>
            <div className="mt-1">
              <AddPicture value={photo} onChange={setPhoto} needed={(pct - (target?.pct ?? 0) >= 30 || pct >= 100) && !photo} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
