import type { Project } from "../../types/project";
import GoodCreatorBadge from "../../assets/good_creator.png";

type Badge =
  | {
      key: string;
      type: "image";
      image: string;
      alt: string;
      className: string;
    }
  | {
      key: string;
      type: "text";
      label: string;
      className: string;
    };

function getRemainingDays(timeToLive: number | null) {
  if (timeToLive === null) return null;

  const DAY = 1000 * 60 * 60 * 24;
  return Math.floor(timeToLive / DAY);
}

function formatFundingBadge(amount: number) {
  const space = "\u00A0";

  if (amount < 1_000_000) return null;

  if (amount < 10_000_000) {
    return `${Math.floor(amount / 10_000)}만${space}원+`;
  }

  if (amount < 100_000_000) {
    return `${Math.round(amount / 100_000) / 100}천만${space}원+`;
  }

  return `${Math.round(amount / 1_000_000) / 100}억${space}원+`;
}

function getProjectBadges(project: Project): Badge[] {
  const days = getRemainingDays(project.timeToLive);
  const fundingLabel = formatFundingBadge(project.amount);

  const badges: Badge[] = [];

  if (project.isStarCreator) {
    badges.push({
      key: "starCreator",
      type: "image",
      image: GoodCreatorBadge,
      alt: "좋은창작자",
      className: "badge_star",
    });
  }

  if (days === 0) {
    badges.push({
      key: "todayEnd",
      type: "text",
      label: "오늘 마감",
      className: "badge_today",
    });
  }

  if (days !== null && days > 0) {
    badges.push({
      key: "remainingDays",
      type: "text",
      label: `${days}일 남음`,
      className: "badge_default",
    });
  }

  if (fundingLabel) {
    badges.push({
      key: "fundingAmount",
      type: "text",
      label: fundingLabel,
      className: "badge_default",
    });
  }

  if (project.editorPick) {
    badges.push({
      key: "editorPick",
      type: "text",
      label: "PICK",
      className: "badge_default",
    });
  }

  return badges.slice(0, 2);
}

type ProjectBadgesProps = {
  project: Project;
};

export default function ProjectBadge({ project }: ProjectBadgesProps) {
  const badges = getProjectBadges(project);

  if (badges.length === 0) return null;

  return (
    <div className="badge_wrapper">
      <div className="project_badges">
        {badges.map((badge) =>
          badge.type === "image" ? (
            <div key={badge.key} className="creator_badge">
              <img
                src={badge.image}
                alt={badge.alt}
                className={`creator_badge ${badge.className}`}
              />
            </div>
          ) : (
            <div key={badge.key} className={`etc_badge ${badge.className}`}>
              <span className="project_badge">{badge.label}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}