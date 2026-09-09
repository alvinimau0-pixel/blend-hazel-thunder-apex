import { Camera, Images, X } from "lucide-react";
import { toast } from "sonner";
import { compressImage } from "@/lib/compress-image";
import { photoList } from "@/lib/domain";
import { cn } from "@/lib/utils";

export function PhotoStrip({ urls, labels }: { urls: string[]; labels?: string[] }) {
  if (urls.length === 0) return null;
  return (
    <ul className={cn("grid gap-2", urls.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
      {urls.map((src, i) => (
        <li key={`${src}-${i}`}>
          <img src={src} alt={labels?.[i] ?? ""} loading="lazy" decoding="async" className="h-28 w-full rounded-md object-cover" />
          {labels?.[i] ? <p className="mt-1 text-[11px] uppercase text-muted">{labels[i]}</p> : null}
        </li>
      ))}
    </ul>
  );
}

export function ClaimPictures({
  photos,
  onChange,
  max = 8,
}: {
  photos: string[];
  onChange: (next: string[]) => void;
  max?: number;
}) {
  async function onFile(file?: File | null) {
    if (!file) return;
    if (photos.length >= max) {
      toast.error(`Max ${max} pictures`);
      return;
    }
    try {
      onChange([...photos, await compressImage(file)]);
    } catch {
      toast.error("Could not read photo");
    }
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <label className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-line bg-paper-2 px-3 text-sm">
          <Camera className="size-4 shrink-0" />
          Take picture
          <input type="file" accept="image/*" capture="environment" className="sr-only" onChange={(e) => void onFile(e.target.files?.[0])} />
        </label>
        <label className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-line bg-paper-2 px-3 text-sm">
          <Images className="size-4 shrink-0" />
          From album
          <input type="file" accept="image/*" className="sr-only" onChange={(e) => void onFile(e.target.files?.[0])} />
        </label>
      </div>
      {photos.length > 0 ? (
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {photos.map((src, i) => (
            <li key={`${i}-${src.slice(-12)}`} className="relative">
              <img src={src} alt="" className="h-28 w-full rounded-md object-cover" />
              <button
                type="button"
                className="absolute right-1 top-1 flex size-8 items-center justify-center rounded-full bg-ink text-paper"
                onClick={() => onChange(photos.filter((_, j) => j !== i))}
                aria-label="Remove picture"
              >
                <X className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[12px] text-muted">No pictures yet.</p>
      )}
    </div>
  );
}

export function AddPicture({
  value,
  onChange,
  needed = false,
  existing = null,
}: {
  value: string | null;
  onChange: (data: string | null) => void;
  needed?: boolean;
  existing?: string | null;
}) {
  async function onFile(file?: File | null) {
    if (!file) return;
    try {
      onChange(await compressImage(file));
    } catch {
      toast.error("Could not read photo");
    }
  }

  const kept = photoList(existing);
  const shownNew = value && value !== "seed-photo" ? value : null;
  const hasAny = kept.length > 0 || !!shownNew;

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <label
          className={cn(
            "flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed px-3 text-sm",
            needed && !hasAny ? "border-stamp bg-stamp/10 text-stamp" : "border-line bg-paper-2",
          )}
        >
          <Camera className="size-4 shrink-0" />
          Take picture
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="sr-only"
            onChange={(e) => void onFile(e.target.files?.[0])}
          />
        </label>
        <label className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-line bg-paper-2 px-3 text-sm">
          <Images className="size-4 shrink-0" />
          From album
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => void onFile(e.target.files?.[0])}
          />
        </label>
      </div>
      {needed && !hasAny ? <p className="text-[12px] text-stamp">Photo needed for this jump.</p> : null}
      <PhotoStrip urls={kept} />
      {shownNew ? <img src={shownNew} alt="" className="h-28 w-full rounded-md object-cover sm:max-w-xs" /> : null}
    </div>
  );
}
