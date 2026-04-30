import type { Project } from "../../types/project";
import { formatAmount, getRemainingDaysFromTTL } from "../../utils/format";
import LikeButton from "../LikeButton/LikeButton";
import NotificationButton from "../NotificationButton/NotificationButton";
import GoodCreatorBadge from "../../assets/good_creator.png";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
}

interface PrelaunchedStatsProps {
  project: Project;
}

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
  if (amount < 1_000_000) return null;

  if (amount < 10_000_000) {
    return `${Math.floor(amount / 10_000)}만 원+`;
  }

  if (amount < 100_000_000) {
    return `${Math.round(amount / 10_000_000) / 10}천만 원+`;
  }

  return `${Math.round((amount / 100_000_000) * 10) / 10}억 원+`;
}

function getProjectBadges(project: Project): Badge[] {
  const days = getRemainingDays(project.timeToLive);

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

  if (project.amount >= 1_000_000) {
    badges.push({
      key: "fundingAmount",
      type: "text",
      label: `${Math.floor(project.amount / 10_000)}만 원+`,
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

function PrelaunchedStats({ project }: PrelaunchedStatsProps) {
  return (
    <NotificationButton
      projectId={project.id}
      notificationCount={project.notificationCount}
    />
  );
}

interface OngoingStatsProps {
  percentage: number;
  amount: number;
  timeToLive: number | null;
}

function OngoingStats({ percentage, amount, timeToLive }: OngoingStatsProps) {
  const progressWidth = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="project-card__stats">
      <div className="stats_wrapper">
        <div className="project-card__stats-left">
          <span className="project-card__percent">{percentage}%</span>
          <span className="project-card__amount">{formatAmount(amount)}원</span>
        </div>
        <span className="project-card__d-day">
          {getRemainingDaysFromTTL(timeToLive)}
        </span>
      </div>
      <div className="project-card__progress">
        <div className="progress_gauge" style={{ width: `${progressWidth}%` }} />
      </div>
    </div>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="project_card_article"
      onClick={() => {
        window.location.href = `https://tumblbug.com/${project.permalink}`;
      }}
      style={{ cursor: "pointer" }}
    >
      <div className="project_card_container">
        <div className="project-card__inner">
        
          <div className="project-card__image-wrap">
            <img
              src={project.coverImageUrl}
              alt={project.title}
              className="project-card__image"
            />
            {project.isOnlyAdult && (
              <div className="adult-badge" aria-label="성인 인증 필요">
                <svg
                  width="17"
                  height="20"
                  viewBox="0 0 17 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 1.07987C5.46571 -0.359958 11.5343 -0.359958 17 1.07987C17 4.2547 17 7.4295 17 10.6043C17 15.3663 4.9983 20 4.9983 20C4.9983 20 0 15.3672 0 10.6043C0 7.4295 0 4.2547 0 1.07987Z"
                    fill="#E53C41"
                  />
                  <ellipse
                    cx="8.51052"
                    cy="6.0047"
                    rx="1.70486"
                    ry="1.68902"
                    fill="white"
                  />
                  <path
                    d="M4.6748 11.7052C4.6748 9.83955 6.18721 8.32715 8.05285 8.32715C9.91849 8.32715 11.4309 9.83955 11.4309 11.7052H4.6748Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
            {/* 좋아요 버튼 */}
            <LikeButton projectId={project.id} defaultLiked={project.isLiked} />
          </div>

          <div className="mobile_right_content">
          <div className="project-card__content">
            <div className="first_content">
              <p>
                <a
                  href={`https://tumblbug.com/u/${project.creatorPermalink}`}
                  onClick={(e) => e.stopPropagation()}
                  className="creator"
                >
                  {project.creatorName}
                </a>
              </p>
              {/* 광고 표시 여부 */}
              {project.isAds && <div className="ad_box">AD</div>}
            </div>

            <div className="text_box">
              <h2>{project.title}</h2>
              <p className="short_desc">{project.shortDescription}</p>
            </div>
          </div>

          <div className="badge_wrapper">
            <div className="project_badges">
              {getProjectBadges(project).map((badge) =>
                badge.type === "image" ? (
                  <div className="creator_badge">
                    <img
                      key={badge.key}
                      src={badge.image}
                      alt={badge.alt}
                      className={`creator_badge ${badge.className}`}
                    />
                  </div>
                ) : (
                  <div className="etc_badge">
                    <span key={badge.key} className={`project_badge ${badge.className}`}>
                      {badge.label}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="project-card_stats_box">
            {/* 공개 예정 or 진행 중인 프로젝트 여부 */}
            {project.state === "prelaunched" ? (
              <PrelaunchedStats project={project} />
            ) : (
              <OngoingStats
                percentage={project.percentage}
                amount={project.amount}
                timeToLive={project.timeToLive}
              />
            )}
          </div>
          </div>
        </div>
      </div>
    </article>
  );
}