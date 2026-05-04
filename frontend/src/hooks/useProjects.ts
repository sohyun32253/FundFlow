import { useCallback, useEffect, useRef, useState } from "react";
import { fetchProjects } from "../api/projectApi";
import type { Project } from "../types/project";

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

  // 프로젝트 목록을 불러오는 함수
  // 첫 페이지 로드 / 추가 로드 / 재로드를 하나의 함수로 통합 관리
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

  // 중복 호출 방지 및 마지막 페이지 체크 후 다음 페이지 로드
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

  // 스크롤 하단에 도달하면 다음 페이지 자동 로드 (무한 스크롤)
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