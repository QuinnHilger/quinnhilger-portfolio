import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { SubPageHeader } from "./SubPageHeader";
import "./ProjectsPage.css";
import "./Projects.css";

// Import everything from Projects.tsx
import {
  SiReact,
  SiTypescript,
  SiSupabase,
  SiPostgresql,
  SiOpenai,
  SiPython,
  SiExpo,
} from "react-icons/si";

import spotmeLogo from "../assets/projects/SpotMe-logo.png";
import fiveNubbleHome from "../assets/projects/5Nubble-home.png";
import pointedImg from "../assets/projects/pointed.png";
import prizepicksImg from "../assets/projects/prizepicks.png";
import type { ReactNode } from "react";

interface TechItem {
  name: string;
  icon?: ReactNode;
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  image: string;
  link?: string;
  linkLabel?: string;
  youtubeId?: string;
  featured: boolean;
  status: "live" | "beta" | "showcase";
  overview: string;
  features: string[];
  tech: TechItem[];
  size: "large" | "tall" | "medium" | "small";
}

const projects: Project[] = [
  {
    id: "spotme",
    title: "SpotMe",
    subtitle: "Social Fitness & AI Workout Platform",
    type: "iOS Mobile App",
    image: spotmeLogo,
    link: "https://apps.apple.com/us/app/spotme-the-workout-app/id6745230123",
    linkLabel: "App Store",
    featured: true,
    status: "live",
    overview:
      "A production-ready iOS fitness ecosystem combining real-time social networking, AI-driven personalized training, and robust performance tracking. Maintains a perfect 5-star rating on the App Store.",
    features: [
      "Co-founded LLC and launched to iOS App Store",
      "AI Workout Assistant using OpenAI's advanced models",
      "Real-time messaging, group chats, and discovery feed",
      "Comprehensive lift tracking and personal records",
      "Competitive leaderboards and gamification",
    ],
    tech: [
      { name: "React Native", icon: <SiReact /> },
      { name: "Expo", icon: <SiExpo /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Supabase", icon: <SiSupabase /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "OpenAI", icon: <SiOpenai /> },
    ],
    size: "large",
  },
  {
    id: "fivenubble",
    title: "Five Nubble",
    subtitle: "Bespoke Property Management Platform",
    type: "Mobile App",
    image: fiveNubbleHome,
    featured: true,
    status: "beta",
    overview:
      "A bespoke property management platform currently in private beta on TestFlight, serving two active property estates. Features AI-driven dynamic theming and a real-time scheduling engine.",
    features: [
      "Custom UI with generative AI theming",
      "Real-time booking and scheduling via Supabase",
      "Role-based access for Owners and Members",
      "Digital bulletin board and occupant dashboard",
    ],
    tech: [
      { name: "React Native", icon: <SiReact /> },
      { name: "Expo", icon: <SiExpo /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Supabase", icon: <SiSupabase /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
    ],
    size: "tall",
  },
  {
    id: "pointed",
    title: "Pointed",
    subtitle: "Community-Driven Challenge & Habit Tracker",
    type: "Mobile App (Showcase)",
    image: pointedImg,
    youtubeId: "STyPNCt8kKw",
    featured: false,
    status: "showcase",
    overview:
      "A complete cross-platform prototype that gamifies goal achievement through social leagues. Serves as a technical showcase for complex state management and real-time social features.",
    features: [
      "Gamified challenge system with dynamic point values",
      "Live chat and multi-scale leaderboards",
      "Activity heatmaps and progress visualizations",
    ],
    tech: [
      { name: "React Native", icon: <SiReact /> },
      { name: "Expo", icon: <SiExpo /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Supabase", icon: <SiSupabase /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
    ],
    size: "medium",
  },
  {
    id: "prizepicks",
    title: "PrizePicks +EV Tool",
    subtitle: "Data-Driven Sports Betting Advantage Finder",
    type: "Python Script",
    image: prizepicksImg,
    featured: false,
    status: "showcase",
    overview:
      "A data-driven Python utility that identifies mathematically profitable (+EV) PrizePicks entries. Successfully identified promotional opportunities with 25-55% edge.",
    features: [
      "Probability logic to derive fair odds",
      "Custom handlers for promotional events",
      "Multi-leg ROI simulator",
    ],
    tech: [{ name: "Python", icon: <SiPython /> }],
    size: "small",
  },
];

// Status Badge
function StatusBadge({ status }: { status: Project["status"] }) {
  const labels = { live: "Live", beta: "Beta", showcase: "Showcase" };
  return (
    <span className={`project-card__status project-card__status--${status}`}>
      {labels[status]}
    </span>
  );
}

// Tech Badges (collapsed view)
function TechBadges({ tech }: { tech: TechItem[] }) {
  return (
    <div className="project-card__tech">
      {tech.slice(0, 4).map((t) => (
        <span key={t.name} className="project-card__tech-badge" title={t.name}>
          {t.icon}
        </span>
      ))}
      {tech.length > 4 && (
        <span className="project-card__tech-badge">+{tech.length - 4}</span>
      )}
    </div>
  );
}

// Tech Badges (expanded view)
function TechBadgesFull({ tech }: { tech: TechItem[] }) {
  return (
    <div className="project-modal__tech">
      {tech.map((t) => (
        <span key={t.name} className="project-modal__tech-badge">
          {t.icon && <span className="project-modal__tech-icon">{t.icon}</span>}
          {t.name}
        </span>
      ))}
    </div>
  );
}

// Project Modal
interface ProjectModalProps {
  project: Project;
  projectIndex: number;
  totalProjects: number;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

function ProjectModal({
  project,
  projectIndex,
  totalProjects,
  onClose,
  onNavigate,
}: ProjectModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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

  const hasPrev = projectIndex > 0;
  const hasNext = projectIndex < totalProjects - 1;

  return createPortal(
    <div
      className="project-modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
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

      <div className="project-modal">
        <button
          className="project-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

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

        <div className="project-modal__body">
          <section className="project-modal__section">
            <h3 className="project-modal__section-title">Overview</h3>
            <p className="project-modal__overview">{project.overview}</p>
          </section>

          <section className="project-modal__section">
            <h3 className="project-modal__section-title">Key Features</h3>
            <ul className="project-modal__features">
              {project.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </section>

          <section className="project-modal__section">
            <h3 className="project-modal__section-title">Tech Stack</h3>
            <TechBadgesFull tech={project.tech} />
          </section>

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

        <div className="project-modal__counter">
          {projectIndex + 1} / {totalProjects}
        </div>
      </div>
    </div>,
    document.body,
  );
}

// Project Card
interface ProjectCardProps {
  project: Project;
  onExpand: () => void;
}

function ProjectCard({ project, onExpand }: ProjectCardProps) {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
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

  return (
    <div
      className={`project-card project-card--${project.size}`}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onExpand}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onExpand()}
    >
      <div className="project-card__image-container">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className={`project-card__image ${project.id === "prizepicks" ? "project-card__image--cropped" : ""}`}
        />
        <div className="project-card__overlay" />
      </div>

      <div className="project-card__content">
        <StatusBadge status={project.status} />
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__subtitle">{project.subtitle}</p>
        <TechBadges tech={project.tech} />
      </div>

      <div className="project-card__expand-hint">
        <span className="project-card__expand-hint-text">
          Click to view details
        </span>
        <span className="project-card__expand-hint-icon">→</span>
      </div>
    </div>
  );
}

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
