import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AipoonGaji } from "@/components/aipoon-gaji";
import { AryanGaji } from "@/components/aryan-gaji";
import { ClaimPictures } from "@/components/add-picture";
import { SiteGate } from "@/components/site-gate";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { buildInsights, buildMskInsights } from "@/lib/domain";
import { useAsOf } from "@/lib/as-of";
import {
  loadSubClaimPacks,
  saveSubClaimPack,
  SUB_CLAIM_NAMES,
  type SubClaimName,
  type SubClaimPack,
} from "@/lib/sub-claim-pack";

export const Route = createFileRoute("/sub-claim")({ component: SubClaimPage });

function SubClaimPage() {
  return <SiteGate>{(site) => <SubClaimBody site={site} />}</SiteGate>;
}

function SubClaimBody({ site }: { site: Parameters<typeof buildInsights>[0] }) {
  const { asOf } = useAsOf();
  const msk = buildMskInsights(site, asOf);
  const ins = buildInsights(site, asOf);
  const pending = msk.pendingByCell.size + ins.pendingByCell.size;
  const [showGaji, setShowGaji] = useState(false);

  return (
    <div className="space-y-5">
      <div>
        <p className="font-display text-[11px] uppercase tracking-[0.2em] text-muted">More · not the client PC</p>
        <h1 className="mt-1 font-display text-3xl font-semibold uppercase tracking-wide">Sub claim</h1>
        <p className="mt-1 max-w-lg text-sm text-ink-soft">
          Aipoon, Aryan, Kolik only. Write a note, add or remove pictures, save. Client PC is{" "}
          <Link to="/eval-claim" className="uppercase tracking-[0.12em] text-accent">
            Evaluation claim
          </Link>
          .
        </p>
      </div>
      {pending > 0 ? (
        <p className="rounded-lg bg-stamp/10 px-3 py-2 text-sm text-stamp">{pending} waiting GM check — not on the lock yet.</p>
      ) : null}

      <div className="grid gap-4">
        {SUB_CLAIM_NAMES.map((name) => (
          <SubPackCard key={name} name={name} />
        ))}
      </div>

      <button type="button" className="text-sm text-accent underline-offset-4 hover:underline" onClick={() => setShowGaji((v) => !v)}>
        {showGaji ? "Hide gaji cards" : "Show Aipoon / Aryan gaji"}
      </button>
      {showGaji ? (
        <>
          <AipoonGaji site={site} />
          <AryanGaji site={site} />
        </>
      ) : null}
    </div>
  );
}

function SubPackCard({ name }: { name: SubClaimName }) {
  const [pack, setPack] = useState<SubClaimPack>(() => loadSubClaimPacks()[name]);

  function save() {
    saveSubClaimPack(pack);
    toast.success(`${name} saved`);
  }

  return (
    <article className="space-y-3 rounded-xl bg-panel p-4 shadow-docket sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-display text-2xl uppercase tracking-wide">{name}</h2>
        <Button size="sm" onClick={save}>
          Save
        </Button>
      </div>
      <Textarea
        rows={3}
        value={pack.note}
        placeholder="What this check covers"
        onChange={(e) => setPack({ ...pack, note: e.target.value })}
      />
      <ClaimPictures photos={pack.photos} onChange={(photos) => setPack({ ...pack, photos })} />
    </article>
  );
}
