import type { Project } from "../../types/project";
import ProjectBadges from "../ProjectBadge/ProjectBadge";
import { formatAmount, getRemainingDaysFromTTL } from "../../utils/format";
import LikeButton from "../LikeButton/LikeButton";
import NotificationButton from "../NotificationButton/NotificationButton";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
}

interface PrelaunchedStatsProps {
  project: Project;
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
  // 퍼센트 값이 0~100 범위를 벗어나지 않도록 보정
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
      // 카드 전체 클릭 시 상세 페이지로 이동
      // 내부 링크 클릭 시에는 이벤트 전파를 막아 중복 이동을 방지
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
                xmlns="http://www.w3.org/2000/svg">
                    <path 
                    fill-rule="evenodd" 
                    clip-rule="evenodd" 
                    d="M0 1.07987C5.46571 -0.359958 11.5343 -0.359958 17 1.07987C17 4.2547 17 7.4295 17 10.6043C17 15.3663 8.49983 20 8.49983 20C8.49983 20 0 15.3672 0 10.6043C0 7.4295 0 4.2547 0 1.07987Z" fill="#E53C41"></path><ellipse cx="8.51052" cy="6.0047" rx="1.70486" ry="1.68902" fill="white"></ellipse><path d="M4.6748 11.7052C4.6748 9.83955 6.18721 8.32715 8.05285 8.32715H8.96862C10.8343 8.32715 12.3467 9.83955 12.3467 11.7052H4.6748Z" fill="white">
                    </path>
                  </svg>
              </div>
            )}
            {/* // 진행 중 프로젝트에만 좋아요 버튼 노출 */}
            { project.state === "ongoing" && (
              <LikeButton projectId={project.id} defaultLiked={project.isLiked} />
            ) }
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

            <ProjectBadges project={project} />

            <div className="project-card_stats_box">
              {/* 프로젝트 상태에 따라 다른 UI 렌더링 (공개예정 / 진행중) */}
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