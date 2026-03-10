import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import type { Project } from "../../types";
import { StatusBadge } from "./StatusBadge";
import { TechBadgesFull } from "./TechBadges";
import "./Projects.css";

interface ProjectModalProps {
  project: Project;
  projectIndex: number;
  totalProjects: number;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

export function ProjectModal({
  project,
  projectIndex,
  totalProjects,
  onClose,
  onNavigate,
}: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Reset modal scroll to top when opened or project changes
  useEffect(() => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTop = 0;
    }
  }, [project]);

  // Prevent body scroll when modal is open (robust iOS support)
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onNavigate("prev");
      } else if (e.key === "ArrowRight") {
        onNavigate("next");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNavigate]);

  // Close when clicking backdrop (not content)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  const hasPrev = projectIndex > 0;
  const hasNext = projectIndex < totalProjects - 1;

  // Prevent touch scroll leak-through on the overlay (iOS)
  const handleOverlayTouchMove = (e: React.TouchEvent) => {
    // Only prevent if touching the overlay backdrop, not the modal content
    if (e.target === modalRef.current) {
      e.preventDefault();
    }
  };

  return createPortal(
    <div
      ref={modalRef}
      className="project-modal-overlay"
      onClick={handleBackdropClick}
      onTouchMove={handleOverlayTouchMove}
    >
      {/* Navigation Arrows */}
      {hasPrev && (
        <button
          className="project-modal__nav project-modal__nav--prev"
          onClick={() => onNavigate("prev")}
          aria-label="Previous project"
        >
          ←
        </button>
      )}
      {hasNext && (
        <button
          className="project-modal__nav project-modal__nav--next"
          onClick={() => onNavigate("next")}
          aria-label="Next project"
        >
          →
        </button>
      )}

      <div ref={modalContentRef} className="project-modal">
        {/* Close Button */}
        <button
          className="project-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Hero Image */}
        <div className="project-modal__hero">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className={`project-modal__image ${project.id === "prizepicks" ? "project-modal__image--cropped" : ""}`}
          />
          <div className="project-modal__hero-overlay" />
          <div className="project-modal__hero-content">
            <StatusBadge status={project.status} />
            <h2 className="project-modal__title">{project.title}</h2>
            <p className="project-modal__subtitle">{project.subtitle}</p>
          </div>
        </div>

        {/* Content */}
        <div className="project-modal__body">
          {/* Overview */}
          <section className="project-modal__section">
            <h3 className="project-modal__section-title">Overview</h3>
            <p className="project-modal__overview">{project.overview}</p>
          </section>

          {/* Features */}
          <section className="project-modal__section">
            <h3 className="project-modal__section-title">Key Features</h3>
            <ul className="project-modal__features">
              {project.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </section>

          {/* Tech Stack */}
          <section className="project-modal__section">
            <h3 className="project-modal__section-title">Tech Stack</h3>
            <TechBadgesFull tech={project.tech} />
          </section>

          {/* YouTube Video */}
          {project.youtubeId && (
            <section className="project-modal__section">
              <h3 className="project-modal__section-title">Demo Video</h3>
              <div className="project-modal__video">
                <iframe
                  src={`https://www.youtube.com/embed/${project.youtubeId}`}
                  title={`${project.title} Demo`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          )}

          {/* Link */}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-modal__link"
            >
              {project.linkLabel || "View Project"} →
            </a>
          )}
        </div>

        {/* Project counter */}
        <div className="project-modal__counter">
          {projectIndex + 1} / {totalProjects}
        </div>
      </div>
    </div>,
    document.body,
  );
}
