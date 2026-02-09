
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { projects } from "../../config/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import "./Projects.css";

export function Projects() {
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<
    number | null
  >(null);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

  // Intersection observer for entrance animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    projects.forEach((project) => {
      const element = document.getElementById(`project-${project.id}`);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, project.id]));
          }
        },
        { threshold: 0.2 },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Navigation handler
  const handleNavigate = useCallback((direction: "prev" | "next") => {
    setExpandedProjectIndex((current) => {
      if (current === null) return null;
      if (direction === "prev" && current > 0) {
        return current - 1;
      }
      if (direction === "next" && current < projects.length - 1) {
        return current + 1;
      }
      return current;
    });
  }, []);

  const expandedProject =
    expandedProjectIndex !== null ? projects[expandedProjectIndex] : null;

  return (
    <section className="projects" id="projects">
      <div className="projects__container">
        <div className="projects__header">
          <h2 className="projects__heading">Projects</h2>
          <Link to="/projects" className="projects__view-all">
            View All Projects
            <span className="projects__view-all-arrow">→</span>
          </Link>
        </div>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <div
              key={project.id}
              id={`project-${project.id}`}
              className={`projects__item projects__item--${project.size} ${
                visibleCards.has(project.id) ? "projects__item--visible" : ""
              }`}
            >
              <ProjectCard
                project={project}
                onExpand={() => setExpandedProjectIndex(index)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal Portal */}
      {expandedProject && expandedProjectIndex !== null && (
        <ProjectModal
          project={expandedProject}
          projectIndex={expandedProjectIndex}
          totalProjects={projects.length}
          onClose={() => setExpandedProjectIndex(null)}
          onNavigate={handleNavigate}
        />
      )}
    </section>
  );
}
