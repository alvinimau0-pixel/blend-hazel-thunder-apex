import { t as createServerFn } from "./ssr.mjs";
import { a as object, i as number, o as string, t as _enum } from "../_libs/zod.mjs";
import { v as createSsrRpc } from "./ops.functions-u1spHYWY.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { T as photoList, k as shouldCommitProgress, w as packPhotos } from "./domain-B9hSVQhA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-site-C4IwY3aB.js
var getSnapshot = createServerFn({ method: "GET" }).handler(createSsrRpc("4ae4d4e5f71761eaec8cb13fc216ace58c8fc430eb2b8919807c2f01a6d6ce34"));
var updateSchema = object({
	floorId: number(),
	toiletId: number(),
	activityId: number(),
	pct: number().int().min(0).max(100),
	crewId: number(),
	note: string().max(400).optional(),
	photoData: string().max(18e4).nullable().optional(),
	workDate: string()
});
var updateProgress = createServerFn({ method: "POST" }).validator(updateSchema).handler(createSsrRpc("e27a8f06a2730d4815a18844813237a4fd5080b7fa799b4200f8b39fd8db6fa1"));
var assignSchema = object({
	workDate: string(),
	crewId: number(),
	floorId: number(),
	toiletId: number(),
	activityId: number(),
	note: string().max(400).optional()
});
var assignCrew = createServerFn({ method: "POST" }).validator(assignSchema).handler(createSsrRpc("7be32d7aa73b2647f04ed6d45eaa71e3b52b40ff50c2860e2f84d123e69bc479"));
var verifySchema = object({
	assignmentId: number(),
	action: _enum(["verify", "reject"])
});
var reviewAssignment = createServerFn({ method: "POST" }).validator(verifySchema).handler(createSsrRpc("c520cb706decafa9c0055a504d11c8229e314527a4e9b3d9c1ac73f92d717685"));
var mskUpdateSchema = object({
	levelId: number(),
	tower: _enum(["A", "B"]),
	itemId: number(),
	pct: number().int().min(0).max(100),
	crewId: number(),
	note: string().max(400).optional(),
	photoData: string().max(18e4).nullable().optional(),
	workDate: string()
});
var updateMskProgress = createServerFn({ method: "POST" }).validator(mskUpdateSchema).handler(createSsrRpc("ecc4d4355801b17c14de56f9534fee44cf7f58aa5457eb2d68099321a51b76d3"));
var mskAssignSchema = object({
	workDate: string(),
	crewId: number(),
	levelId: number(),
	tower: _enum(["A", "B"]),
	itemId: number(),
	note: string().max(400).optional()
});
var assignMskCrew = createServerFn({ method: "POST" }).validator(mskAssignSchema).handler(createSsrRpc("bc624da124244ce78485490c04e8c2e246eda7719ca03d744c38d07a11ea458c"));
var attachPhotoSchema = object({
	assignmentId: number(),
	photoData: string().max(18e4),
	kind: _enum(["msk", "toilet"]).default("msk")
});
var attachAssignmentPhoto = createServerFn({ method: "POST" }).validator(attachPhotoSchema).handler(createSsrRpc("6aeb83caf19dd117c243ce53fe4010a19483bd8c562f1cdec22b81f484a4ec21"));
var reviewMskAssignment = createServerFn({ method: "POST" }).validator(verifySchema).handler(createSsrRpc("eca355415b0888c19cf74d827e3cac3f28ae4cf98fcf1f4e86183337055bbe33"));
function useSite(opts) {
	const live = opts?.live === true;
	return useQuery({
		queryKey: ["site"],
		queryFn: () => getSnapshot(),
		staleTime: live ? 8e3 : 3e4,
		gcTime: 6e5,
		refetchOnWindowFocus: live,
		refetchOnMount: live ? "always" : false,
		refetchInterval: live ? 15e3 : false,
		placeholderData: (prev) => prev
	});
}
function nowIso() {
	return (/* @__PURE__ */ new Date()).toISOString();
}
function patchMsk(site, input) {
	const crew = site.crew.find((c) => c.id === input.crewId);
	const commit = crew ? shouldCommitProgress(crew.contractor) : true;
	const now = nowIso();
	const mskProgress = commit ? site.mskProgress.map((p) => p.levelId === input.levelId && p.tower === input.tower && p.itemId === input.itemId ? {
		...p,
		pct: input.pct,
		na: false,
		updatedAt: now
	} : p) : site.mskProgress;
	const idx = site.mskAssignments.findIndex((a) => a.workDate === input.workDate && a.crewId === input.crewId && a.levelId === input.levelId && a.tower === input.tower && a.itemId === input.itemId);
	const prev = idx >= 0 ? site.mskAssignments[idx] : void 0;
	const photoData = input.photoData ? packPhotos([...photoList(prev?.photoData), input.photoData]) : prev?.photoData ?? null;
	const row = {
		id: prev?.id ?? -Date.now(),
		workDate: input.workDate,
		crewId: input.crewId,
		levelId: input.levelId,
		tower: input.tower,
		itemId: input.itemId,
		startPct: prev?.startPct ?? site.mskProgress.find((p) => p.levelId === input.levelId && p.tower === input.tower && p.itemId === input.itemId)?.pct ?? 0,
		claimedPct: input.pct,
		note: input.note ?? prev?.note ?? null,
		photoData,
		verified: commit,
		rejected: false,
		createdAt: prev?.createdAt ?? now
	};
	const mskAssignments = idx >= 0 ? site.mskAssignments.map((a, i) => i === idx ? {
		...a,
		...row,
		id: a.id
	} : a) : [row, ...site.mskAssignments];
	return {
		...site,
		mskProgress,
		mskAssignments
	};
}
function patchToilet(site, input) {
	const crew = site.crew.find((c) => c.id === input.crewId);
	const commit = crew ? shouldCommitProgress(crew.contractor) : true;
	const now = nowIso();
	const progress = commit ? site.progress.map((p) => p.floorId === input.floorId && p.toiletId === input.toiletId && p.activityId === input.activityId ? {
		...p,
		pct: input.pct,
		updatedAt: now
	} : p) : site.progress;
	const idx = site.assignments.findIndex((a) => a.workDate === input.workDate && a.crewId === input.crewId && a.floorId === input.floorId && a.toiletId === input.toiletId && a.activityId === input.activityId);
	const prev = idx >= 0 ? site.assignments[idx] : void 0;
	const photoData = input.photoData ? packPhotos([...photoList(prev?.photoData), input.photoData]) : prev?.photoData ?? null;
	const row = {
		id: prev?.id ?? -Date.now(),
		workDate: input.workDate,
		crewId: input.crewId,
		floorId: input.floorId,
		toiletId: input.toiletId,
		activityId: input.activityId,
		startPct: prev?.startPct ?? site.progress.find((p) => p.floorId === input.floorId && p.toiletId === input.toiletId && p.activityId === input.activityId)?.pct ?? 0,
		claimedPct: input.pct,
		note: input.note ?? prev?.note ?? null,
		photoData,
		verified: commit,
		rejected: false,
		createdAt: prev?.createdAt ?? now
	};
	const assignments = idx >= 0 ? site.assignments.map((a, i) => i === idx ? {
		...a,
		...row,
		id: a.id
	} : a) : [row, ...site.assignments];
	return {
		...site,
		progress,
		assignments
	};
}
function patchAssignMsk(site, input) {
	const now = nowIso();
	const idx = site.mskAssignments.findIndex((a) => a.workDate === input.workDate && a.crewId === input.crewId && a.levelId === input.levelId && a.tower === input.tower && a.itemId === input.itemId);
	if (idx >= 0) return {
		...site,
		mskAssignments: site.mskAssignments.map((a, i) => i === idx ? {
			...a,
			note: input.note ?? a.note,
			rejected: false
		} : a)
	};
	const start = site.mskProgress.find((p) => p.levelId === input.levelId && p.tower === input.tower && p.itemId === input.itemId)?.pct ?? 0;
	return {
		...site,
		mskAssignments: [{
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
			createdAt: now
		}, ...site.mskAssignments]
	};
}
function patchAssignToilet(site, input) {
	const now = nowIso();
	const idx = site.assignments.findIndex((a) => a.workDate === input.workDate && a.crewId === input.crewId && a.floorId === input.floorId && a.toiletId === input.toiletId && a.activityId === input.activityId);
	if (idx >= 0) return {
		...site,
		assignments: site.assignments.map((a, i) => i === idx ? {
			...a,
			note: input.note ?? a.note,
			rejected: false
		} : a)
	};
	const start = site.progress.find((p) => p.floorId === input.floorId && p.toiletId === input.toiletId && p.activityId === input.activityId)?.pct ?? 0;
	return {
		...site,
		assignments: [{
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
			createdAt: now
		}, ...site.assignments]
	};
}
function stampAssignId(site, input, id, kind) {
	if (!id || id <= 0) return site;
	if (kind === "msk") {
		const m = input;
		return {
			...site,
			mskAssignments: site.mskAssignments.map((a) => a.id < 0 && a.workDate === m.workDate && a.crewId === m.crewId && a.levelId === m.levelId && a.tower === m.tower && a.itemId === m.itemId ? {
				...a,
				id
			} : a)
		};
	}
	const t = input;
	return {
		...site,
		assignments: site.assignments.map((a) => a.id < 0 && a.workDate === t.workDate && a.crewId === t.crewId && a.floorId === t.floorId && a.toiletId === t.toiletId && a.activityId === t.activityId ? {
			...a,
			id
		} : a)
	};
}
function patchReviewMsk(site, input) {
	const a = site.mskAssignments.find((x) => x.id === input.assignmentId);
	if (!a) return site;
	const verify = input.action === "verify";
	const now = nowIso();
	let mskProgress = site.mskProgress;
	if (verify && a.claimedPct != null) mskProgress = site.mskProgress.map((p) => p.levelId === a.levelId && p.tower === a.tower && p.itemId === a.itemId ? {
		...p,
		pct: a.claimedPct ?? p.pct,
		na: false,
		updatedAt: now
	} : p);
	else if (!verify && a.claimedPct != null) mskProgress = site.mskProgress.map((p) => p.levelId === a.levelId && p.tower === a.tower && p.itemId === a.itemId && p.pct === a.claimedPct ? {
		...p,
		pct: a.startPct,
		updatedAt: now
	} : p);
	return {
		...site,
		mskProgress,
		mskAssignments: site.mskAssignments.map((x) => x.id === input.assignmentId ? {
			...x,
			verified: verify,
			rejected: !verify
		} : x)
	};
}
function patchReviewToilet(site, input) {
	const a = site.assignments.find((x) => x.id === input.assignmentId);
	if (!a) return site;
	const verify = input.action === "verify";
	const now = nowIso();
	let progress = site.progress;
	if (verify && a.claimedPct != null) progress = site.progress.map((p) => p.floorId === a.floorId && p.toiletId === a.toiletId && p.activityId === a.activityId ? {
		...p,
		pct: a.claimedPct ?? p.pct,
		updatedAt: now
	} : p);
	else if (!verify && a.claimedPct != null) progress = site.progress.map((p) => p.floorId === a.floorId && p.toiletId === a.toiletId && p.activityId === a.activityId && p.pct === a.claimedPct ? {
		...p,
		pct: a.startPct,
		updatedAt: now
	} : p);
	return {
		...site,
		progress,
		assignments: site.assignments.map((x) => x.id === input.assignmentId ? {
			...x,
			verified: verify,
			rejected: !verify
		} : x)
	};
}
function patchPhoto(site, input) {
	if (input.kind === "toilet") return {
		...site,
		assignments: site.assignments.map((a) => a.id === input.assignmentId ? {
			...a,
			photoData: packPhotos([...photoList(a.photoData), input.photoData])
		} : a)
	};
	return {
		...site,
		mskAssignments: site.mskAssignments.map((a) => a.id === input.assignmentId ? {
			...a,
			photoData: packPhotos([...photoList(a.photoData), input.photoData])
		} : a)
	};
}
function useSiteMutations() {
	const qc = useQueryClient();
	const snap = () => qc.getQueryData(["site"]);
	const set = (data) => qc.setQueryData(["site"], data);
	function optimistic(patch) {
		return {
			onMutate: async (input) => {
				await qc.cancelQueries({ queryKey: ["site"] });
				const prev = snap();
				if (prev) set(patch(prev, input));
				return { prev };
			},
			onError: (_e, _v, ctx) => {
				if (ctx?.prev) set(ctx.prev);
			}
		};
	}
	return {
		update: useMutation({
			mutationFn: (input) => updateProgress({ data: input }),
			...optimistic(patchToilet)
		}),
		assign: useMutation({
			mutationFn: (input) => assignCrew({ data: input }),
			...optimistic(patchAssignToilet),
			onSuccess: (res, input) => {
				const prev = snap();
				if (prev && "id" in res) set(stampAssignId(prev, input, res.id, "toilet"));
			}
		}),
		review: useMutation({
			mutationFn: (input) => reviewAssignment({ data: input }),
			...optimistic(patchReviewToilet)
		}),
		updateMsk: useMutation({
			mutationFn: (input) => updateMskProgress({ data: input }),
			...optimistic(patchMsk)
		}),
		assignMsk: useMutation({
			mutationFn: (input) => assignMskCrew({ data: input }),
			...optimistic(patchAssignMsk),
			onSuccess: (res, input) => {
				const prev = snap();
				if (prev && "id" in res) set(stampAssignId(prev, input, res.id, "msk"));
			}
		}),
		attachPhoto: useMutation({
			mutationFn: (input) => attachAssignmentPhoto({ data: input }),
			...optimistic(patchPhoto)
		}),
		reviewMsk: useMutation({
			mutationFn: (input) => reviewMskAssignment({ data: input }),
			...optimistic(patchReviewMsk)
		})
	};
}
//#endregion
export { useSiteMutations as n, useSite as t };
