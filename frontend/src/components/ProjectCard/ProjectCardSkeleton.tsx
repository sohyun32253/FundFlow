import  "./ProjectCardSkeleton.css"

export default function ProjectCardSkeleton() {
    return (
      <div className="skeleton-card">
        <div className="skeleton-image" />

        <div className="skeleton_right_content">
            <div className="skeleton-content">
            <div className="skeleton-creator" />
            <div className="skeleton-title" />
            <div className="skeleton-shortDescription" />
            <div className="skeleton-badge" />
    
            <div className="skeleton-stats-box">
                <div className="skeleton-stats" />
                <div className="skeleton-bar" />
            </div>
            </div>
        </div>
      </div>
    );
  }