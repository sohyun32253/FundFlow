import useProjects from "../hooks/useProjects";
import ProjectGrid from "../components/ProjectGrid/ProjectGrid";

export default function ProjectListPage() {
  const { projects, loading, error, reload } = useProjects();

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ marginTop: 0 }}>프로젝트 목록</h1>

      {loading ? <p>불러오는 중...</p> : null}

      {error ? (
        <div style={{ marginBottom: 16 }}>
          <p style={{ color: "crimson" }}>{error}</p>
          <button type="button" onClick={reload}>
            다시 시도
          </button>
        </div>
      ) : null}

      {!loading && !error ? <ProjectGrid projects={projects} /> : null}
    </main>
  );
}