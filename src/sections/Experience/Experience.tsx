
import { useRef, useState, useEffect } from "react";
import { CollapsibleSection } from "../../components/CollapsibleSection";
import { experiences } from "../../config/experience";
import type { TimelineEntry } from "../../types";
import resumePdf from "../../assets/docs/8-24-Resume.pdf";
import "./Experience.css";

function useTimelineProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      const start = rect.top;
      const end = rect.bottom;

      if (start > windowHeight) {
        setProgress(0);
      } else if (end < windowHeight * 0.66) {
        // When the bottom of timeline passes the 1/3 line, bar is full
        setProgress(1);
      } else {
        // Calculate progress so the fill tracks with 1/3 from top of viewport
        const scrolled = windowHeight * 0.66 - start;
        const total = elementHeight;
        setProgress(Math.min(1, Math.max(0, scrolled / total)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { containerRef, progress };
}

export function Timeline() {
  const { containerRef, progress } = useTimelineProgress();
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    experiences.forEach((exp) => {
      const element = document.getElementById(`timeline-${exp.id}`);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, exp.id]));
          }
        },
        { threshold: 0.3 },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const workEntries = experiences.filter((e) => e.type === "work");
  const educationEntries = experiences.filter((e) => e.type === "education");

  const renderEntry = (exp: TimelineEntry, index: number) => (
    <div
      key={exp.id}
      id={`timeline-${exp.id}`}
      className={`timeline__entry ${
        index % 2 === 0 ? "timeline__entry--left" : "timeline__entry--right"
      } ${visibleItems.has(exp.id) ? "timeline__entry--visible" : ""}`}
    >
      <div
        className={`timeline__node ${
          visibleItems.has(exp.id) ? "timeline__node--active" : ""
        }`}
      />

      <div className="timeline__card">
        <div className="timeline__card-header">
          <img src={exp.logo} alt={exp.company} className="timeline__logo" />
          <div className="timeline__card-info">
            <h3 className="timeline__company">{exp.company}</h3>
            <p className="timeline__role">{exp.role}</p>
            <p className="timeline__dates">
              {exp.startDate} — {exp.endDate}
            </p>
          </div>
        </div>

        <p className="timeline__description">{exp.description}</p>

        {/* Tech badges */}
        {exp.tech && exp.tech.length > 0 && (
          <div className="timeline__tech">
            {exp.tech.map((t) => (
              <span
                key={t.name}
                className="timeline__tech-badge"
                title={t.name}
              >
                {t.icon && (
                  <span className="timeline__tech-icon">{t.icon}</span>
                )}
                <span className="timeline__tech-name">{t.name}</span>
              </span>
            ))}
          </div>
        )}

        {exp.accomplishments && exp.accomplishments.length > 0 && (
          <CollapsibleSection title="Key Accomplishments">
            <ul className="timeline__accomplishments">
              {exp.accomplishments.map((acc, i) => (
                <li key={i}>{acc}</li>
              ))}
            </ul>
          </CollapsibleSection>
        )}
      </div>
    </div>
  );

  return (
    <section className="timeline" id="experience">
      <div className="timeline__container" ref={containerRef}>
        <h2 className="timeline__heading">Experience & Education</h2>

        <div className="timeline__content">
          <div className="timeline__line">
            <div
              className="timeline__line-fill"
              style={{ transform: `scaleY(${progress})` }}
            />
          </div>

          <div className="timeline__entries">
            {workEntries.map((exp, index) => renderEntry(exp, index))}

            <div className="timeline__divider">
              <div className="timeline__divider-node" />
              <span className="timeline__divider-text">Education</span>
            </div>

            {educationEntries.map((exp, index) =>
              renderEntry(exp, workEntries.length + index),
            )}
          </div>
        </div>

        <div className="timeline__resume">
          <a
            href={resumePdf}
            download="Quinn_Hilger_Resume.pdf"
            className="timeline__resume-btn"
          >
            <span className="timeline__resume-icon">📄</span>
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
