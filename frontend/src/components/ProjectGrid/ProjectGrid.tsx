import ProjectCard from "../ProjectCard/ProjectCard";
import type { Project } from "../../types/project";
import "../ProjectCard/ProjectCard.css";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
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
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}