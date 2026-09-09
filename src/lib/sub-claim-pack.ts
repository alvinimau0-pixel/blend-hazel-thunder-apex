const KEY = "gm-sub-claim-pack-v1";

export const SUB_CLAIM_NAMES = ["Aipoon", "Aryan", "Kolik"] as const;
export type SubClaimName = (typeof SUB_CLAIM_NAMES)[number];

export type SubClaimPack = {
  name: SubClaimName;
  note: string;
  photos: string[];
};

function empty(): Record<SubClaimName, SubClaimPack> {
  return {
    Aipoon: { name: "Aipoon", note: "", photos: [] },
    Aryan: { name: "Aryan", note: "", photos: [] },
    Kolik: { name: "Kolik", note: "", photos: [] },
  };
}

export function loadSubClaimPacks(): Record<SubClaimName, SubClaimPack> {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as Partial<Record<SubClaimName, SubClaimPack>>;
    const base = empty();
    for (const name of SUB_CLAIM_NAMES) {
      const row = parsed[name];
      if (!row) continue;
      base[name] = {
        name,
        note: String(row.note ?? ""),
        photos: Array.isArray(row.photos) ? row.photos.filter((x): x is string => typeof x === "string") : [],
      };
    }
    return base;
  } catch {
    return empty();
  }
}

export function saveSubClaimPack(pack: SubClaimPack) {
  const all = loadSubClaimPacks();
  all[pack.name] = { ...pack, photos: pack.photos.slice(0, 8) };
  window.localStorage.setItem(KEY, JSON.stringify(all));
}
