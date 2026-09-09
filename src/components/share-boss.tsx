import { Copy, Globe, Link2, Mail, MessageCircle, Printer, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input, Label } from "@/components/ui/input";
import {
  BOSSES,
  hodPageUrl,
  loadBossContacts,
  saveBossContact,
  waDigits,
  type Boss,
} from "@/lib/boss";
import { cn } from "@/lib/utils";

export function ShareBoss({
  compose,
}: {
  compose: (boss: Boss) => { subject: string; text: string; site?: string };
}) {
  const [open, setOpen] = useState(false);
  const [bossId, setBossId] = useState<(typeof BOSSES)[number]["id"]>("khairul");
  const boss = BOSSES.find((b) => b.id === bossId) ?? BOSSES[0];
  const payload = compose(boss);
  const { subject, text } = payload;
  const site = payload.site ?? hodPageUrl();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!open) return;
    const saved = loadBossContacts()[bossId];
    setPhone(saved?.phone ?? "");
    setEmail(saved?.email ?? "");
  }, [open, bossId]);

  function persist(nextPhone = phone, nextEmail = email) {
    saveBossContact(bossId, { phone: nextPhone, email: nextEmail });
  }

  function onWhatsApp() {
    persist();
    const digits = waDigits(phone);
    const q = encodeURIComponent(text);
    const href = digits ? `https://wa.me/${digits}?text=${q}` : `https://wa.me/?text=${q}`;
    window.open(href, "_blank", "noopener,noreferrer");
    toast.success(digits ? `WhatsApp to ${boss.name}` : "WhatsApp opened — pick the chat");
  }

  function onEmail() {
    persist();
    const href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    window.location.href = href;
    toast.success(email ? `Email to ${boss.name}` : "Email draft opened");
  }

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied — paste on WhatsApp");
    } catch {
      toast.error("Could not copy. Use WhatsApp or Print.");
    }
  }

  async function onCopySite() {
    try {
      await navigator.clipboard.writeText(site);
      toast.success("Website link copied");
    } catch {
      toast.error("Could not copy the website link.");
    }
  }

  function onOpenSite() {
    window.open(site, "_blank", "noopener,noreferrer");
  }

  async function onShareSheet() {
    try {
      if (typeof navigator.share !== "function") {
        await onCopy();
        return;
      }
      await navigator.share({ title: subject, text, url: site });
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      await onCopy();
    }
  }

  function onPrint() {
    setOpen(false);
    window.setTimeout(() => window.print(), 80);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full min-h-11 sm:w-auto">
          <Share2 /> Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Send to colleagues</DialogTitle>
        <DialogDescription>
          Pick who. Copy the website link or WhatsApp the brief. Same lock they see on this phone.
        </DialogDescription>

        <div className="mt-4 grid grid-cols-2 gap-1.5">
          {BOSSES.map((b) => {
            const on = b.id === bossId;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setBossId(b.id)}
                className={cn(
                  "min-h-11 rounded-lg px-3 py-2 text-left transition-colors duration-150",
                  on ? "bg-ink text-paper" : "bg-paper-2 hover:bg-line",
                )}
              >
                <p className="font-display text-sm font-semibold uppercase tracking-wide">{b.name}</p>
                <p className={cn("text-[11px]", on ? "text-paper/70" : "text-muted")}>
                  {b.title} · {b.line}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="boss-phone">WhatsApp no.</Label>
            <Input
              id="boss-phone"
              className="mt-1"
              inputMode="tel"
              placeholder="012 345 6789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => persist()}
            />
          </div>
          <div>
            <Label htmlFor="boss-email">Email</Label>
            <Input
              id="boss-email"
              className="mt-1"
              type="email"
              placeholder="optional"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => persist()}
            />
          </div>
        </div>
        <p className="mt-1 text-[11px] text-muted">Saved on this phone. Leave blank to pick the chat yourself.</p>

        <p className="mt-3 truncate rounded-lg bg-paper-2 px-3 py-2 font-mono text-[11px] text-ink-soft">{site}</p>

        <pre className="mt-3 max-h-40 overflow-auto whitespace-pre-wrap rounded-lg bg-paper-2 px-3 py-2 font-sans text-xs leading-relaxed text-ink-soft">
          {text}
        </pre>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button className="min-h-11" onClick={onWhatsApp}>
            <MessageCircle /> WhatsApp
          </Button>
          <Button className="min-h-11" variant="outline" onClick={onOpenSite}>
            <Globe /> Open website
          </Button>
          <Button className="min-h-11" variant="outline" onClick={() => void onCopySite()}>
            <Link2 /> Copy website
          </Button>
          <Button className="min-h-11" variant="outline" onClick={() => void onCopy()}>
            <Copy /> Copy brief
          </Button>
          <Button className="min-h-11" variant="outline" onClick={onEmail}>
            <Mail /> Email
          </Button>
          <Button className="min-h-11" variant="outline" onClick={onPrint}>
            <Printer /> Print pack
          </Button>
        </div>
        <Button className="mt-2 w-full min-h-11" variant="ghost" onClick={() => void onShareSheet()}>
          <Share2 /> Phone share sheet
        </Button>
      </DialogContent>
    </Dialog>
  );
}
