import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useOps } from "@/lib/use-ops";
import type { OpsProject } from "@/lib/ops";

const KEY = "gm-project-id";

const ProjectContext = createContext<{
  projectId: number;
  setProjectId: (id: number) => void;
  project: OpsProject | null;
  projects: OpsProject[];
}>({ projectId: 0, setProjectId: () => undefined, project: null, projects: [] });

export function ProjectProvider({ children }: { children: ReactNode }) {
  const ops = useOps();
  const projects = ops.data?.projects ?? [];
  const [projectId, setProjectIdState] = useState(0);

  useEffect(() => {
    if (projects.length === 0) return;
    const saved = Number(localStorage.getItem(KEY) || 0);
    const exists = projects.some((p) => p.id === saved);
    if (exists) setProjectIdState(saved);
    else setProjectIdState(projects[0].id);
  }, [projects]);

  function setProjectId(id: number) {
    setProjectIdState(id);
    localStorage.setItem(KEY, String(id));
  }

  const project = projects.find((p) => p.id === projectId) ?? projects[0] ?? null;
  const value = useMemo(
    () => ({ projectId: project?.id ?? 0, setProjectId, project, projects }),
    [project, projects],
  );
  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProject() {
  return useContext(ProjectContext);
}
