import { useCallback, useEffect, useState } from "react";
import { fetchProjects } from "../api/projectApi";
import type { Project } from "../types/project";
import { useRef } from "react";

interface UseProjectsResult {
  projects: Project[];
  loading: boolean;
  loadingMore: boolean;
  error: string;
  hasMore: boolean;
  observerRef: React.RefObject<HTMLDivElement | null>;
  reload: () => Promise<void>;
}

export default function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadProjects = useCallback(
    async (targetPage = 1, isReload = false): Promise<void> => {
      try {
        if (targetPage === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        setError("");

        const data = await fetchProjects(targetPage);

        const nextProjects = data.contents ?? [];
        
        setProjects((prev) =>
          isReload || targetPage === 1
            ? nextProjects
            : [...prev, ...nextProjects]
        );
        
        setHasMore(data.hasNext);
        setPage(data.page);
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "프로젝트 목록을 불러오지 못했습니다."
        );
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    []
  );

  const loadMore = useCallback(async (): Promise<void> => {
    if (loading || loadingMore || !hasMore) return;

    await loadProjects(page + 1);
  }, [loading, loadingMore, hasMore, page, loadProjects]);

  const reload = useCallback(async (): Promise<void> => {
    setHasMore(true);
    await loadProjects(1, true);
  }, [loadProjects]);

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          void loadMore();
        }
      },
      {
        root: null,
        rootMargin: "1000px",
        threshold: 0,
      }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [loadMore]);


  return {
    projects,
    loading,
    loadingMore,
    error,
    hasMore,
    observerRef,
    reload,
  };
}