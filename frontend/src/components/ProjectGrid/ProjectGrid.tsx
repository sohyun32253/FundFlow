import ProjectCard from "../ProjectCard/ProjectCard";
import type { Project } from "../../types/project";
import "../ProjectCard/ProjectCard.css";

interface ProjectGridProps {
  projects: Project[];
  showToast: (message: string) => void;
}

export default function ProjectGrid({ projects, showToast }: ProjectGridProps) {
  return (
    <section
    className="project_grid"
    style={{
      display: "grid",
      gap: "16px",
      margin: "0 auto",
    }}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} showToast={showToast} />
      ))}
    </section>
  );
}