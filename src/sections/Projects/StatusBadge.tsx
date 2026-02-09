
import type { Project } from "../../types";
import "./Projects.css";

export function StatusBadge({ status }: { status: Project["status"] }) {
  const labels = { live: "Live", beta: "Beta", showcase: "Showcase" };
  return (
    <span className={`project-card__status project-card__status--${status}`}>
      {labels[status]}
    </span>
  );
}
