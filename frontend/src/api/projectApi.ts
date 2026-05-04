import type { ProjectsResponse } from "../types/project";

const BASE_URL = "http://localhost:4000/api";
const MAX_RETRY_COUNT = 3;
const RETRY_DELAY = 500;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  retryCount = 0
): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    // 서버에서 간헐적으로 발생하는 500 에러에 대응하기 위해 최대 3회 재시도
    if (response.status === 500 && retryCount < MAX_RETRY_COUNT) {
      await delay(RETRY_DELAY);
      return request<T>(path, options, retryCount + 1);
    }

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "API 요청에 실패했습니다.");
    }

    if (response.status === 204) {
      return null as T;
    }

    return response.json();
  } catch (error) {
    // 네트워크 에러도 재시도
    if (retryCount < MAX_RETRY_COUNT) {
      await delay(RETRY_DELAY);
      return request<T>(path, options, retryCount + 1);
    }

    throw error;
  }
}

// 프로젝트 목록 조회
export async function fetchProjects(
  page = 1,
  limit = 10
): Promise<ProjectsResponse> {
  return request<ProjectsResponse>(
    `/projects?page=${page}&limit=${limit}`
  );
}

export async function addLike(projectId: string) {
  return request(`/projects/${projectId}/like`, { method: "POST" });
}

export async function removeLike(projectId: string) {
  return request(`/projects/${projectId}/like`, { method: "DELETE" });
}

export async function addNotification(projectId: string) {
  return request(`/projects/${projectId}/notification`, { method: "POST" });
}

export async function removeNotification(projectId: string) {
  return request(`/projects/${projectId}/notification`, { method: "DELETE" });
}