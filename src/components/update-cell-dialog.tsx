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
import { PctPicker } from "@/components/pct-picker";
import { Spinner } from "@/components/status-states";
import { WhoDidThis, scopeFromTrade, withScopeNote, type JobScope } from "@/components/who-did";
import type { Activity, CrewMember, Floor, Toilet } from "@/lib/domain";
import { PREDECESSORS, siteCrewGrouped } from "@/lib/domain";
import { useAsOf } from "@/lib/as-of";
import { useSiteMutations } from "@/lib/use-site";

export type CellTarget = {
  floor: Floor;
  toilet: Toilet;
  activity: Activity;
  pct: number;
  dueOn: string;
};

export function UpdateCellDialog({
  open,
  onOpenChange,
  target,
  crew,
  activities,
  pctOf,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  target: CellTarget | null;
  crew: CrewMember[];
  activities: Activity[];
  pctOf: (seq: number) => number;
}) {
  const { asOf } = useAsOf();
  const { update } = useSiteMutations();
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
        listed.find(
          (c) =>
            target.activity.contractor.includes(c.contractor) ||
            (target.activity.gmTrade && c.contractor === "GM"),
        ) ?? listed[0];
      if (match) {
        setCrewId(match.id);
        setScope(scopeFromTrade(match.trade, /irrig/i.test(target.activity.name) ? "IRR" : undefined));
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
    const preds = PREDECESSORS[target.activity.seq] ?? [];
    for (const seq of preds) {
      const p = pctOf(seq);
      if (p < 80 && pct > p + 20) {
        const act = activities.find((a) => a.seq === seq);
        list.push(`Sequence: ${act?.name ?? seq} is only ${p}%. This looks skipped.`);
      }
    }
    return list;
  }, [target, pct, photo, activities, pctOf, sub]);

  function submit() {
    if (!target) return;
    if (!crewId) {
      toast.error("Pick who did the work");
      return;
    }
    setBusy(true);
    update.mutate(
      {
        floorId: target.floor.id,
        toiletId: target.toilet.id,
        activityId: target.activity.id,
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
        <DialogTitle>Log progress</DialogTitle>
        <DialogDescription>
          {target.floor.code} {target.toilet.tower} {target.toilet.code} · {target.activity.name}
        </DialogDescription>
        <div className="mt-4 grid gap-3">
          <div className="rounded-lg bg-paper-2 px-3 py-2 text-xs text-ink-soft">
            Contractor {target.activity.contractor} · dateline {target.dueOn} · now {target.pct}%
          </div>
          <WhoDidThis
            crew={crew}
            crewId={crewId}
            onCrewId={setCrewId}
            scope={scope}
            onScope={setScope}
            idPrefix="toilet-who"
          />
          <PctPicker value={pct} onChange={setPct} />
          <div>
            <Label htmlFor="note">What was done</Label>
            <Textarea
              id="note"
              className="mt-1"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Short site note. No story — just the work."
            />
          </div>
          <div>
            <Label>Photo evidence</Label>
            <div className="mt-1">
              <AddPicture value={photo} onChange={setPhoto} needed={(pct - (target?.pct ?? 0) >= 30 || pct >= 100) && !photo} />
            </div>
          </div>
          {warnings.length > 0 ? (
            <ul className="space-y-1 rounded-lg bg-cell-risk/60 px-3 py-2 text-xs text-cell-risk-ink">
              {warnings.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          ) : null}
          <Button onClick={() => void submit()} disabled={busy}>
            {busy ? (
              <>
                <Spinner /> Saving…
              </>
            ) : (
              "Post to board"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
