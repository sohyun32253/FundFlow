import ProjectGrid from "../components/ProjectGrid/ProjectGrid";
import SkeletonGrid from "../components/ProjectGrid/SkeletonGrid";
import useProjects from "../hooks/useProjects";

interface ProjectListPageProps {
  showToast: (message: string) => void;
}

function ProjectListPage({ showToast }: ProjectListPageProps) {
  const {
    projects,
    loading,
    loadingMore,
    error,
    hasMore,
    observerRef,
    reload,
  } = useProjects();

  return (
    <main
      style={{
        margin: "0 auto",
        padding: "24px 16px",
        maxWidth: "1160px",
      }}
    >
      <h1 style={{ marginTop: 0 }}>프로젝트 목록</h1>

      {loading && <SkeletonGrid />}

      {!loading && error && projects.length === 0 && (
        <div className="project-error">
          <p>{error}</p>
          <button type="button" onClick={reload}>
            다시 시도
          </button>
        </div>
      )}

      {!loading && projects.length > 0 && (
        <>
         <ProjectGrid projects={projects} showToast={showToast} />

{error && (
  <div className="project-error project-error--inline">
    <p>{error}</p>
    <button type="button" onClick={reload}>
      다시 시도
    </button>
  </div>
)}

{loadingMore && <SkeletonGrid />}

{hasMore && (
  <div
    ref={observerRef}
    style={{
      height: "40px",
    }}
  />
)}
        </>
      )}
    </main>
  );
}

export default ProjectListPage;