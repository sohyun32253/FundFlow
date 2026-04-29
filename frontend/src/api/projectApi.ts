import type { Project, ProjectsResponse } from "../types/project";

const BASE_URL = "http://localhost:4000/api";

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "API 요청에 실패했습니다.");
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}

export async function fetchProjects(): Promise<Project[]> {
  const data = await request<ProjectsResponse>("/projects");
  return data.contents ?? [];
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