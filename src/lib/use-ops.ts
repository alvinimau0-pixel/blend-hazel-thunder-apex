import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addClaim,
  dropClaim,
  updateClaim,
  addDrawing,
  addPerson,
  addPo,
  addProject,
  addReceive,
  addReport,
  getOps,
  markSalaryPaid,
  publishDay,
  setAttend,
  setRecordStatus,
  upsertAdvance,
  upsertRepay,
} from "@/lib/ops.functions";
import type { OpsSnapshot } from "@/lib/ops";

export function useOps() {
  return useQuery({
    queryKey: ["ops"],
    queryFn: () => getOps(),
    staleTime: 20_000,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
  });
}

export function useOpsActions() {
  const qc = useQueryClient();
  const set = (data: OpsSnapshot) => qc.setQueryData(["ops"], data);

  const addProjectM = useMutation({ mutationFn: (data: { name: string; client: string; location: string }) => addProject({ data }), onSuccess: set });
  const addDrawingM = useMutation({
    mutationFn: (data: { projectId: number; title: string; refNo: string; discipline: string; rev: string; dated: string }) => addDrawing({ data }),
    onSuccess: set,
  });
  const addPoM = useMutation({
    mutationFn: (data: { projectId: number; poNo: string; supplier: string; dated: string; material: string; amount: number }) => addPo({ data }),
    onSuccess: set,
  });
  const addReceiveM = useMutation({
    mutationFn: (data: { projectId: number; doNo: string; poId: number | null; dated: string; receivedBy: string; qtyNote: string; status: string }) =>
      addReceive({ data }),
    onSuccess: set,
  });
  const addClaimM = useMutation({
    mutationFn: (data: { projectId: number; claimNo: string; title: string; period: string; dated: string; amount: number }) => addClaim({ data }),
    onSuccess: set,
  });
  const updateClaimM = useMutation({
    mutationFn: (data: {
      id: number;
      claimNo: string;
      title: string;
      period: string;
      dated: string;
      amount: number;
      certified: number;
      status: string;
      note: string;
      photos: string[];
    }) => updateClaim({ data }),
    onSuccess: set,
  });
  const dropClaimM = useMutation({
    mutationFn: (data: { id: number }) => dropClaim({ data }),
    onSuccess: set,
  });
  const addReportM = useMutation({
    mutationFn: (data: { projectId: number; cadence: "daily" | "weekly" | "monthly"; period: string; dated: string; lockPct: number; summary: string }) =>
      addReport({ data }),
    onSuccess: set,
  });
  const publishDayM = useMutation({
    mutationFn: (dated: string) => publishDay({ data: { dated } }),
    onSuccess: (ops) => {
      set(ops);
      void qc.invalidateQueries({ queryKey: ["site"] });
    },
  });
  const addPersonM = useMutation({
    mutationFn: (data: { projectId: number; kind: "worker" | "sub"; name: string; trade: string; contractor: string; dailyRate: number }) =>
      addPerson({ data }),
    onSuccess: set,
  });
  const addAdvanceM = useMutation({
    mutationFn: (data: { projectId: number; personId: number; dated: string; amount: number; reason: string }) =>
      upsertAdvance({ data }),
    onSuccess: set,
  });
  const upsertRepayM = useMutation({
    mutationFn: (data: { projectId: number; personId: number; month: string; amount: number }) =>
      upsertRepay({ data }),
    onSuccess: set,
  });
  const markPaid = useMutation({ mutationFn: (data: { id: number }) => markSalaryPaid({ data }), onSuccess: set });
  const setAttendM = useMutation({
    mutationFn: (data: { projectId: number; personId: number; dated: string; mark: "P" | "X" | "OT" | "" }) =>
      setAttend({ data }),
    onSuccess: set,
  });
  const setStatus = useMutation({
    mutationFn: (data: { table: "ops_pos" | "ops_claims" | "ops_reports" | "ops_drawings"; id: number; status: string }) => setRecordStatus({ data }),
    onSuccess: set,
  });

  return {
    addProject: addProjectM,
    addDrawing: addDrawingM,
    addPo: addPoM,
    addReceive: addReceiveM,
    addClaim: addClaimM,
    updateClaim: updateClaimM,
    dropClaim: dropClaimM,
    addReport: addReportM,
    publishDay: publishDayM,
    addPerson: addPersonM,
    addAdvance: addAdvanceM,
    upsertRepay: upsertRepayM,
    setAttend: setAttendM,
    markPaid,
    setStatus,
  };
}
