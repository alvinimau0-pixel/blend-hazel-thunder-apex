import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  assignCrew,
  assignMskCrew,
  attachAssignmentPhoto,
  getSnapshot,
  reviewAssignment,
  reviewMskAssignment,
  updateMskProgress,
  updateProgress,
  type AssignInput,
  type AttachPhotoInput,
  type MskAssignInput,
  type MskUpdateInput,
  type UpdateInput,
  type VerifyInput,
} from "@/lib/site.functions";
import { packPhotos, photoList, shouldCommitProgress, type SiteSnapshot } from "@/lib/domain";

export function useSite(opts?: { live?: boolean }) {
  const live = opts?.live === true;
  return useQuery({
    queryKey: ["site"],
    queryFn: () => getSnapshot(),
    staleTime: live ? 8_000 : 30_000,
    gcTime: 10 * 60_000,
    refetchOnWindowFocus: live,
    refetchOnMount: live ? "always" : false,
    refetchInterval: live ? 15_000 : false,
    placeholderData: (prev) => prev,
  });
}

function nowIso() {
  return new Date().toISOString();
}

function patchMsk(site: SiteSnapshot, input: MskUpdateInput): SiteSnapshot {
  const crew = site.crew.find((c) => c.id === input.crewId);
  const commit = crew ? shouldCommitProgress(crew.contractor) : true;
  const now = nowIso();
  const mskProgress = commit
    ? site.mskProgress.map((p) =>
        p.levelId === input.levelId && p.tower === input.tower && p.itemId === input.itemId
          ? { ...p, pct: input.pct, na: false, updatedAt: now }
          : p,
      )
    : site.mskProgress;
  const idx = site.mskAssignments.findIndex(
    (a) =>
      a.workDate === input.workDate &&
      a.crewId === input.crewId &&
      a.levelId === input.levelId &&
      a.tower === input.tower &&
      a.itemId === input.itemId,
  );
  const prev = idx >= 0 ? site.mskAssignments[idx] : undefined;
  const photoData = input.photoData
    ? packPhotos([...photoList(prev?.photoData), input.photoData])
    : (prev?.photoData ?? null);
  const row = {
    id: prev?.id ?? -Date.now(),
    workDate: input.workDate,
    crewId: input.crewId,
    levelId: input.levelId,
    tower: input.tower as "A" | "B",
    itemId: input.itemId,
    startPct:
      prev?.startPct ??
      site.mskProgress.find((p) => p.levelId === input.levelId && p.tower === input.tower && p.itemId === input.itemId)?.pct ??
      0,
    claimedPct: input.pct,
    note: input.note ?? prev?.note ?? null,
    photoData,
    verified: commit,
    rejected: false,
    createdAt: prev?.createdAt ?? now,
  };
  const mskAssignments =
    idx >= 0
      ? site.mskAssignments.map((a, i) => (i === idx ? { ...a, ...row, id: a.id } : a))
      : [row, ...site.mskAssignments];
  return { ...site, mskProgress, mskAssignments };
}

function patchToilet(site: SiteSnapshot, input: UpdateInput): SiteSnapshot {
  const crew = site.crew.find((c) => c.id === input.crewId);
  const commit = crew ? shouldCommitProgress(crew.contractor) : true;
  const now = nowIso();
  const progress = commit
    ? site.progress.map((p) =>
        p.floorId === input.floorId && p.toiletId === input.toiletId && p.activityId === input.activityId
          ? { ...p, pct: input.pct, updatedAt: now }
          : p,
      )
    : site.progress;
  const idx = site.assignments.findIndex(
    (a) =>
      a.workDate === input.workDate &&
      a.crewId === input.crewId &&
      a.floorId === input.floorId &&
      a.toiletId === input.toiletId &&
      a.activityId === input.activityId,
  );
  const prev = idx >= 0 ? site.assignments[idx] : undefined;
  const photoData = input.photoData
    ? packPhotos([...photoList(prev?.photoData), input.photoData])
    : (prev?.photoData ?? null);
  const row = {
    id: prev?.id ?? -Date.now(),
    workDate: input.workDate,
    crewId: input.crewId,
    floorId: input.floorId,
    toiletId: input.toiletId,
    activityId: input.activityId,
    startPct:
      prev?.startPct ??
      site.progress.find((p) => p.floorId === input.floorId && p.toiletId === input.toiletId && p.activityId === input.activityId)?.pct ??
      0,
    claimedPct: input.pct,
    note: input.note ?? prev?.note ?? null,
    photoData,
    verified: commit,
    rejected: false,
    createdAt: prev?.createdAt ?? now,
  };
  const assignments =
    idx >= 0 ? site.assignments.map((a, i) => (i === idx ? { ...a, ...row, id: a.id } : a)) : [row, ...site.assignments];
  return { ...site, progress, assignments };
}

function patchAssignMsk(site: SiteSnapshot, input: MskAssignInput): SiteSnapshot {
  const now = nowIso();
  const idx = site.mskAssignments.findIndex(
    (a) =>
      a.workDate === input.workDate &&
      a.crewId === input.crewId &&
      a.levelId === input.levelId &&
      a.tower === input.tower &&
      a.itemId === input.itemId,
  );
  if (idx >= 0) {
    return {
      ...site,
      mskAssignments: site.mskAssignments.map((a, i) =>
        i === idx ? { ...a, note: input.note ?? a.note, rejected: false } : a,
      ),
    };
  }
  const start =
    site.mskProgress.find((p) => p.levelId === input.levelId && p.tower === input.tower && p.itemId === input.itemId)?.pct ?? 0;
  return {
    ...site,
    mskAssignments: [
      {
        id: -Date.now(),
        workDate: input.workDate,
        crewId: input.crewId,
        levelId: input.levelId,
        tower: input.tower,
        itemId: input.itemId,
        startPct: start,
        claimedPct: null,
        note: input.note ?? null,
        photoData: null,
        verified: false,
        rejected: false,
        createdAt: now,
      },
      ...site.mskAssignments,
    ],
  };
}

function patchAssignToilet(site: SiteSnapshot, input: AssignInput): SiteSnapshot {
  const now = nowIso();
  const idx = site.assignments.findIndex(
    (a) =>
      a.workDate === input.workDate &&
      a.crewId === input.crewId &&
      a.floorId === input.floorId &&
      a.toiletId === input.toiletId &&
      a.activityId === input.activityId,
  );
  if (idx >= 0) {
    return {
      ...site,
      assignments: site.assignments.map((a, i) => (i === idx ? { ...a, note: input.note ?? a.note, rejected: false } : a)),
    };
  }
  const start =
    site.progress.find((p) => p.floorId === input.floorId && p.toiletId === input.toiletId && p.activityId === input.activityId)?.pct ?? 0;
  return {
    ...site,
    assignments: [
      {
        id: -Date.now(),
        workDate: input.workDate,
        crewId: input.crewId,
        floorId: input.floorId,
        toiletId: input.toiletId,
        activityId: input.activityId,
        startPct: start,
        claimedPct: null,
        note: input.note ?? null,
        photoData: null,
        verified: false,
        rejected: false,
        createdAt: now,
      },
      ...site.assignments,
    ],
  };
}

function stampAssignId(
  site: SiteSnapshot,
  input: MskAssignInput | AssignInput,
  id: number | undefined,
  kind: "msk" | "toilet",
): SiteSnapshot {
  if (!id || id <= 0) return site;
  if (kind === "msk") {
    const m = input as MskAssignInput;
    return {
      ...site,
      mskAssignments: site.mskAssignments.map((a) =>
        a.id < 0 &&
        a.workDate === m.workDate &&
        a.crewId === m.crewId &&
        a.levelId === m.levelId &&
        a.tower === m.tower &&
        a.itemId === m.itemId
          ? { ...a, id }
          : a,
      ),
    };
  }
  const t = input as AssignInput;
  return {
    ...site,
    assignments: site.assignments.map((a) =>
      a.id < 0 &&
      a.workDate === t.workDate &&
      a.crewId === t.crewId &&
      a.floorId === t.floorId &&
      a.toiletId === t.toiletId &&
      a.activityId === t.activityId
        ? { ...a, id }
        : a,
    ),
  };
}

function patchReviewMsk(site: SiteSnapshot, input: VerifyInput): SiteSnapshot {
  const a = site.mskAssignments.find((x) => x.id === input.assignmentId);
  if (!a) return site;
  const verify = input.action === "verify";
  const now = nowIso();
  let mskProgress = site.mskProgress;
  if (verify && a.claimedPct != null) {
    mskProgress = site.mskProgress.map((p) =>
      p.levelId === a.levelId && p.tower === a.tower && p.itemId === a.itemId
        ? { ...p, pct: a.claimedPct ?? p.pct, na: false, updatedAt: now }
        : p,
    );
  } else if (!verify && a.claimedPct != null) {
    mskProgress = site.mskProgress.map((p) =>
      p.levelId === a.levelId && p.tower === a.tower && p.itemId === a.itemId && p.pct === a.claimedPct
        ? { ...p, pct: a.startPct, updatedAt: now }
        : p,
    );
  }
  return {
    ...site,
    mskProgress,
    mskAssignments: site.mskAssignments.map((x) =>
      x.id === input.assignmentId ? { ...x, verified: verify, rejected: !verify } : x,
    ),
  };
}

function patchReviewToilet(site: SiteSnapshot, input: VerifyInput): SiteSnapshot {
  const a = site.assignments.find((x) => x.id === input.assignmentId);
  if (!a) return site;
  const verify = input.action === "verify";
  const now = nowIso();
  let progress = site.progress;
  if (verify && a.claimedPct != null) {
    progress = site.progress.map((p) =>
      p.floorId === a.floorId && p.toiletId === a.toiletId && p.activityId === a.activityId
        ? { ...p, pct: a.claimedPct ?? p.pct, updatedAt: now }
        : p,
    );
  } else if (!verify && a.claimedPct != null) {
    progress = site.progress.map((p) =>
      p.floorId === a.floorId && p.toiletId === a.toiletId && p.activityId === a.activityId && p.pct === a.claimedPct
        ? { ...p, pct: a.startPct, updatedAt: now }
        : p,
    );
  }
  return {
    ...site,
    progress,
    assignments: site.assignments.map((x) =>
      x.id === input.assignmentId ? { ...x, verified: verify, rejected: !verify } : x,
    ),
  };
}

function patchPhoto(site: SiteSnapshot, input: AttachPhotoInput): SiteSnapshot {
  if (input.kind === "toilet") {
    return {
      ...site,
      assignments: site.assignments.map((a) =>
        a.id === input.assignmentId ? { ...a, photoData: packPhotos([...photoList(a.photoData), input.photoData]) } : a,
      ),
    };
  }
  return {
    ...site,
    mskAssignments: site.mskAssignments.map((a) =>
      a.id === input.assignmentId ? { ...a, photoData: packPhotos([...photoList(a.photoData), input.photoData]) } : a,
    ),
  };
}

export function useSiteMutations() {
  const qc = useQueryClient();
  const snap = () => qc.getQueryData<SiteSnapshot>(["site"]);
  const set = (data: SiteSnapshot) => qc.setQueryData(["site"], data);

  function optimistic<T>(patch: (site: SiteSnapshot, input: T) => SiteSnapshot) {
    return {
      onMutate: async (input: T) => {
        await qc.cancelQueries({ queryKey: ["site"] });
        const prev = snap();
        if (prev) set(patch(prev, input));
        return { prev };
      },
      onError: (_e: unknown, _v: T, ctx?: { prev?: SiteSnapshot }) => {
        if (ctx?.prev) set(ctx.prev);
      },
    };
  }

  const update = useMutation({
    mutationFn: (input: UpdateInput) => updateProgress({ data: input }),
    ...optimistic(patchToilet),
  });
  const assign = useMutation({
    mutationFn: (input: AssignInput) => assignCrew({ data: input }),
    ...optimistic(patchAssignToilet),
    onSuccess: (res, input) => {
      const prev = snap();
      if (prev && "id" in res) set(stampAssignId(prev, input, res.id, "toilet"));
    },
  });
  const review = useMutation({
    mutationFn: (input: VerifyInput) => reviewAssignment({ data: input }),
    ...optimistic(patchReviewToilet),
  });
  const updateMsk = useMutation({
    mutationFn: (input: MskUpdateInput) => updateMskProgress({ data: input }),
    ...optimistic(patchMsk),
  });
  const assignMsk = useMutation({
    mutationFn: (input: MskAssignInput) => assignMskCrew({ data: input }),
    ...optimistic(patchAssignMsk),
    onSuccess: (res, input) => {
      const prev = snap();
      if (prev && "id" in res) set(stampAssignId(prev, input, res.id, "msk"));
    },
  });
  const attachPhoto = useMutation({
    mutationFn: (input: AttachPhotoInput) => attachAssignmentPhoto({ data: input }),
    ...optimistic(patchPhoto),
  });
  const reviewMsk = useMutation({
    mutationFn: (input: VerifyInput) => reviewMskAssignment({ data: input }),
    ...optimistic(patchReviewMsk),
  });

  return { update, assign, review, updateMsk, assignMsk, attachPhoto, reviewMsk };
}
