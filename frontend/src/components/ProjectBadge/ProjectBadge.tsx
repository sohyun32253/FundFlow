import type { Project } from "../../types/project";
import GoodCreatorBadge from "../../assets/good_creator.png";

// 뱃지 타입: 이미지형 / 텍스트형을 구분하여 렌더링 처리
type Badge =
  | {
      key: string;
      type: "image";
      image: string;
      alt: string;
      className: string;
      priority: number; // 우선순위 (낮을수록 먼저 노출)
    }
  | {
      key: string;
      type: "text";
      label: string;
      className: string;
      priority: number;
    };

// 남은 일수 계산 (ms → day 단위 변환)
function getRemainingDays(timeToLive: number | null) {
  if (timeToLive === null) return null;

  const DAY = 1000 * 60 * 60 * 24;
  return Math.floor(timeToLive / DAY);
}

// 후원 금액을 요구사항에 맞게 포맷팅
// (구간별 단위 및 반올림 기준이 다르기 때문에 분기 처리)
function formatFundingBadge(amount: number) {
  const space = "\u00A0";

  if (amount < 1_000_000) return null;

  if (amount < 10_000_000) {
    return `${Math.floor(amount / 10_000)}만${space}원+`;
  }

  // 1천만 ~ 1억: 10만원 단위 반올림 후 천만 단위로 변환
  if (amount < 100_000_000) {
    return `${Math.round(amount / 1_000_000) / 10}천만${space}원+`;
  }

  // 1억 이상: 100만원 단위 반올림 후 억 단위로 변환
  return `${Math.round(amount / 10_000_000) / 10}억${space}원+`;
}

// 프로젝트 상태를 기반으로 뱃지 목록 생성
function getProjectBadges(project: Project): Badge[] {
  const fundingLabel = formatFundingBadge(project.amount);
  const badges: Badge[] = [];

  if (project.isStarCreator) {
    badges.push({
      key: "starCreator",
      type: "image",
      image: GoodCreatorBadge,
      alt: "좋은창작자",
      className: "badge_star",
      priority: 1,
    });
  }
  const DAY = 1000 * 60 * 60 * 24;
  const ttl = project.timeToLive;
  if (ttl !== null && ttl <= DAY) {
    badges.push({
      key: "todayEnd",
      type: "text",
      label: "오늘 마감",
      className: "badge_today",
      priority: 2,
    });
  }
  
  if (ttl !== null && ttl > DAY) {
    const days = Math.floor(ttl / DAY);
  
    badges.push({
      key: "remainingDays",
      type: "text",
      label: `${days}일 남음`,
      className: "badge_default",
      priority: 3,
    });
  }

  if (fundingLabel) {
    badges.push({
      key: "fundingAmount",
      type: "text",
      label: fundingLabel,
      className: "badge_default",
      priority: 4,
    });
  }

  if (project.editorPick) {
    badges.push({
      key: "editorPick",
      type: "text",
      label: "PICK",
      className: "badge_default",
      priority: 5,
    });
  }

  // 우선순위 기준 정렬 후 상위 2개만 노출
  return badges
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 2);
}

type ProjectBadgesProps = {
  project: Project;
};

// 뱃지 리스트 렌더링 컴포넌트
export default function ProjectBadge({ project }: ProjectBadgesProps) {
  const badges = getProjectBadges(project);

  if (badges.length === 0) return null;

  return (
    <div className="badge_wrapper">
      <div className="project_badges">
        {badges.map((badge) =>
          badge.type === "image" ? (
            // 이미지형 뱃지 (좋은 창작자)
            <div key={badge.key} className="creator_badge">
              <img
                src={badge.image}
                alt={badge.alt}
                className={`creator_badge ${badge.className}`}
              />
            </div>
          ) : (
            // 텍스트형 뱃지
            <div key={badge.key} className={`etc_badge ${badge.className}`}>
              <span className="project_badge">{badge.label}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}