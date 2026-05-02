export interface Project {
  id: string;
  permalink: string;
  title: string;
  state: "prelaunched" | "ongoing";
  amount: number;
  percentage: number;
  shortDescription: string;
  coverImageUrl: string;
  fundingStartDate: string;
  endDate: string;
  editorPick: boolean;
  timeToLive: number | null;
  creatorName: string;
  creatorPermalink: string;
  isOnlyAdult: boolean;
  isStarCreator: boolean;
  isAds: boolean;
  isLiked: boolean;
  isNotified: boolean;
  notificationCount: number;
  likeCount?: number;
}

export interface ProjectsResponse {
  total: number;
  totalPages: number;
  pageSize: number;
  hasPrevious: boolean;
  hasNext: boolean;
  page: number;
  contents: Project[];
}