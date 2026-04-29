import { useCallback, useEffect, useState } from "react";
import { fetchProjects } from "../api/projectApi";
import type { Project } from "../types/project";

interface UseProjectsResult {
  projects: Project[];
  loading: boolean;
  error: string;
  reload: () => Promise<void>;
}

export default function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const loadProjects = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "프로젝트 목록을 불러오지 못했습니다."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  return {
    projects,
    loading,
    error,
    reload: loadProjects,
  };
}