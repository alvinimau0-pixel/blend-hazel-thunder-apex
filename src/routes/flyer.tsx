import { createFileRoute } from "@tanstack/react-router";
import { Phone, Printer } from "lucide-react";
import { Letterhead } from "@/components/letterhead";
import { Button } from "@/components/ui/button";
import { CALL_DESK, COMPANY, SIGN_OFF, siteLine } from "@/lib/company";
import { useAsOf } from "@/lib/as-of";

export const Route = createFileRoute("/flyer")({ component: FlyerPage });

const TEL = "0358808766";
const TEL_SHOW = COMPANY.phone;

function FlyerPage() {
  const { asOf } = useAsOf();

  return (
    <div className="space-y-5">
      <div className="no-print flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-ink-soft">One page for the client or Khairul. Print landscape.</p>
        <div className="flex gap-2">
          <Button size="sm" asChild>
            <a href={`tel:+6${TEL}`}>
              <Phone /> Call office
            </a>
          </Button>
          <Button size="sm" variant="outline" onClick={() => window.print()}>
            <Printer /> Print
          </Button>
        </div>
      </div>

      <article className="print-sheet overflow-hidden rounded-xl bg-panel shadow-docket">
        <div className="border-b border-ink bg-sheet px-5 py-4 sm:px-8">
          <Letterhead asOf={asOf} />
        </div>

        <header className="border-b border-line bg-accent px-5 py-8 text-accent-fg sm:px-8 sm:py-10">
          <p className="font-display text-[11px] uppercase tracking-[0.22em] text-accent-fg/70">
            {COMPANY.trade} · {COMPANY.registration}
          </p>
          <h1 className="mt-2 max-w-xl font-display text-4xl font-semibold uppercase leading-[0.95] tracking-wide sm:text-5xl">
            MSK plumbing for The Capitol
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-accent-fg/85">
            Gelaran Maju installs and records cold water, sanitary and irrigation on Towers A and B,
            levels 13 to 31M. Progress is written from the cells — not from a story.
          </p>
        </header>

        <section className="grid gap-0 md:grid-cols-2">
          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <p className="font-display text-[11px] uppercase tracking-[0.18em] text-muted">What we do</p>
            <h2 className="mt-1 font-display text-2xl uppercase tracking-wide">Three trades. One lock.</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Cold water 40%, sanitary 33%, irrigation 8%. The tower lock on the board is the same
              number Khairul sees. Podium sits on the last certified claim (PC36).
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="font-display uppercase text-muted">CW</span>
                Sleeve, pump, transfer, backshaft, tenant cold water.
              </li>
              <li className="flex gap-2">
                <span className="font-display uppercase text-muted">SAN</span>
                Tenant outlets, toilet distribution, sanitary toilets and wares.
              </li>
              <li className="flex gap-2">
                <span className="font-display uppercase text-muted">IRR</span>
                Outlet, inlet, wiring and panel.
              </li>
            </ul>
          </div>
          <figure className="min-h-56 bg-ink">
            <img
              src="/site-photos/l27-ta-outlet-1.jpg"
              alt="L27 Tower A sanitary tenant outlet"
              className="h-full w-full object-cover"
            />
          </figure>
        </section>

        <section className="grid gap-px bg-line md:grid-cols-3">
          <Block
            kicker="Towers"
            title="TA and TB"
            body="Same packages on both towers. A hole on one floor while a higher floor has started is flagged. Work is not skipped quietly."
          />
          <Block
            kicker="Evidence"
            title="Photo on the jump"
            body="A big jump or a finish needs a picture. L27 TA first and second tenant outlets are already on file. Sub updates wait for a GM check."
          />
          <Block
            kicker="Claim"
            title="Two different claims"
            body="Sub gaji is Aipoon, Aryan, Kolik. Evaluation claim is the client PC. They are not mixed."
          />
        </section>

        <section className="grid items-stretch md:grid-cols-2">
          <figure className="min-h-52 bg-paper-2">
            <img src="/plans/section.jpg" alt="The Capitol section — basement to helipad" className="h-full w-full object-cover" />
          </figure>
          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <p className="font-display text-[11px] uppercase tracking-[0.18em] text-muted">The building</p>
            <h2 className="mt-1 font-display text-2xl uppercase tracking-wide">The Capitol</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {siteLine()}. Basement to helipad on the section. Our live board is L13–31M only.
              Layouts and POs sit under Drawings & PO.
            </p>
          </div>
        </section>

        <section className="border-t border-line px-5 py-6 sm:px-8 sm:py-8">
          <p className="font-display text-[11px] uppercase tracking-[0.18em] text-muted">Who to call</p>
          <h2 className="mt-1 font-display text-2xl uppercase tracking-wide">Office and site</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {CALL_DESK.map((row) => (
              <li key={row.when} className="rounded-lg bg-paper-2 px-3 py-3">
                <p className="font-display text-sm uppercase tracking-wide">{row.ping}</p>
                <p className="text-[12px] text-muted">{row.title}</p>
                <p className="mt-1 text-sm text-ink-soft">{row.when}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[12px] text-muted">
            {SIGN_OFF.map((s) => `${s.role} ${s.names}`).join(" · ")}
          </p>
        </section>

        <footer className="border-t border-ink bg-ink px-5 py-6 text-paper sm:px-8">
          <p className="font-display text-2xl uppercase tracking-wide">Gelaran Maju Sdn Bhd</p>
          <div className="mt-3 grid gap-3 text-sm text-paper/80 sm:grid-cols-3">
            <p>
              {COMPANY.address}
            </p>
            <p>
              Tel {TEL_SHOW}
              <br />
              <a className="underline decoration-paper/40 underline-offset-2" href={`tel:+6${TEL}`}>
                Call the office
              </a>
            </p>
            <p>
              {COMPANY.project} · {COMPANY.section}
              <br />
              Internal sheet — not a consumer flyer.
            </p>
          </div>
        </footer>
      </article>
    </div>
  );
}

function Block({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div className="bg-panel px-5 py-6 sm:px-6">
      <p className="font-display text-[11px] uppercase tracking-[0.18em] text-muted">{kicker}</p>
      <h3 className="mt-1 font-display text-xl uppercase tracking-wide">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
    </div>
  );
}
