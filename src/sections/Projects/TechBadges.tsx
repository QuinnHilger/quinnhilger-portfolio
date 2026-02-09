
import type { TechItem } from "../../types";
import "./Projects.css"; // We'll keep sharing the CSS for now

export function TechBadges({ tech }: { tech: TechItem[] }) {
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

export function TechBadgesFull({ tech }: { tech: TechItem[] }) {
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
