
import { useState, useCallback, useEffect } from "react";
import { SubPageHeader } from "../../components/SubPageHeader"; // Adjust import path
import { projects } from "../../config/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import "./ProjectsPage.css";
import "./Projects.css";

// Main Projects Page
export function ProjectsPage() {
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<
    number | null
  >(null);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    projects.forEach((project) => {
      const element = document.getElementById(`project-page-${project.id}`);
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
    <div className="projects-page">
      <SubPageHeader />

      <div className="projects-page__container">
        <div className="projects-page__hero">
          <h1 className="projects-page__title">My Projects</h1>
          <p className="projects-page__subtitle">
            A collection of apps, tools, and experiments I've built.
          </p>
        </div>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <div
              key={project.id}
              id={`project-page-${project.id}`}
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

      {expandedProject && expandedProjectIndex !== null && (
        <ProjectModal
          project={expandedProject}
          projectIndex={expandedProjectIndex}
          totalProjects={projects.length}
          onClose={() => setExpandedProjectIndex(null)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
