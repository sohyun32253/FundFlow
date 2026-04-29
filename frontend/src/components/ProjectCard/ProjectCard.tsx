import type { Project } from "../../types/project";
import { formatAmount, getRemainingDaysFromTTL } from "../../utils/format";
import LikeButton from "../LikeButton/LikeButton";
import notificationIcon from "../../assets/icon_notification.svg";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
}

interface PrelaunchedStatsProps {
  notificationCount: number;
}

function PrelaunchedStats({ notificationCount }: PrelaunchedStatsProps) {
  return (
    <div className="notification_container">
      <div className="notification_status">{notificationCount}명 알림신청 중</div>
      <button type="button" className="notification_btn">
        <img src={notificationIcon} alt="" aria-hidden="true" />
        <span>알림신청</span>
      </button>
    </div>
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
        <span className="project-card__d-day">{getRemainingDaysFromTTL(timeToLive)}</span>
      </div>
      <div className="project-card__progress">
        <div className="progress_gauge" style={{ width: `${progressWidth}%` }} />
      </div>
    </div>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project_card_article">
      <div className="project_card_container">
        <div className="project-card__inner">
          <div className="project-card__image-wrap">
            <a href={project.permalink} className="project-card__image-link" aria-label={project.title}>
              <img src={project.coverImageUrl} alt={project.title} className="project-card__image" />
            </a>

            {project.isOnlyAdult && (
              <div className="adult-badge" aria-label="성인 인증 필요">
                <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 1.07987C5.46571 -0.359958 11.5343 -0.359958 17 1.07987C17 4.2547 17 7.4295 17 10.6043C17 15.3663 4.9983 20 4.9983 20C4.9983 20 0 15.3672 0 10.6043C0 7.4295 0 4.2547 0 1.07987Z"
                    fill="#E53C41"
                  />
                  <ellipse cx="8.51052" cy="6.0047" rx="1.70486" ry="1.68902" fill="white" />
                  <path
                    d="M4.6748 11.7052C4.6748 9.83955 6.18721 8.32715 8.05285 8.32715C9.91849 8.32715 11.4309 9.83955 11.4309 11.7052H4.6748Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}

            <LikeButton projectId={project.id} defaultLiked={project.isLiked} />
          </div>

          <a href={project.permalink} className="project-card__link">
            <div className="project-card__content">
              <div className="first_content">
                <p className="creator">{project.creatorName}</p>
                {project.isAds && <div className="ad_box">AD</div>}
              </div>
              <h2>{project.title}</h2>
              <p className="short_desc">{project.shortDescription}</p>
            </div>

            <div className="project-card_stats_box">
              {project.state === "prelaunched" ? (
                <PrelaunchedStats notificationCount={project.notificationCount} />
              ) : (
                <OngoingStats
                  percentage={project.percentage}
                  amount={project.amount}
                  timeToLive={project.timeToLive}
                />
              )}
            </div>
          </a>
        </div>
      </div>
    </article>
  );
}