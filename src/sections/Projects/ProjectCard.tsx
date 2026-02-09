
import { useState, useRef } from "react";
import type { Project } from "../../types";
import { StatusBadge } from "./StatusBadge";
import { TechBadges } from "./TechBadges";
import "./Projects.css";

interface ProjectCardProps {
  project: Project;
  onExpand: () => void;
}

export function ProjectCard({ project, onExpand }: ProjectCardProps) {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform:
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    });
  };

  const handleClick = () => {
    onExpand();
  };

  return (
    <div
      ref={cardRef}
      className={`project-card project-card--${project.size}`}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      {/* Background Image with lazy loading */}
      <div className="project-card__image-container">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className={`project-card__image ${project.id === "prizepicks" ? "project-card__image--cropped" : ""}`}
        />
        <div className="project-card__overlay" />
      </div>

      {/* Content */}
      <div className="project-card__content">
        <StatusBadge status={project.status} />
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__subtitle">{project.subtitle}</p>
        <TechBadges tech={project.tech} />
      </div>

      {/* Animated click indicator */}
      <div className="project-card__expand-hint">
        <span className="project-card__expand-hint-text">
          Click to view details
        </span>
        <span className="project-card__expand-hint-icon">→</span>
      </div>
    </div>
  );
}
