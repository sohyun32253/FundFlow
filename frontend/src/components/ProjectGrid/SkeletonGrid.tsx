import  ProjectCardSkeleton from "../ProjectCard/ProjectCardSkeleton";

export default function SkeletonList() {
    return (
      <div className="skeleton-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    );
  }