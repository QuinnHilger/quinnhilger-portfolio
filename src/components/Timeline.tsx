import { useRef, useState, useEffect } from "react";
import { CollapsibleSection } from "./CollapsibleSection";
import dkLogo from "../assets/logo/dk-logo.jpg";
import pdLogo from "../assets/logo/pd-logo.png";
import uclaLogo from "../assets/logo/UCLA-logo.png";
import resumePdf from "../assets/docs/8-24-Resume.pdf";
import "./Timeline.css";

// Tech icons from react-icons
import {
  SiReact,
  SiTypescript,
  SiDotnet,
  SiSharp,
  SiPostgresql,
  SiDatadog,
  SiAmazonwebservices,
  SiKubernetes,
  SiVitest,
  SiAnsible,
  SiJenkins,
  SiDocker,
  SiGnubash,
  SiCplusplus,
  SiPython,
  SiC,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { FaJava } from "react-icons/fa";

interface TechItem {
  name: string;
  icon: React.ReactNode;
}

interface TimelineEntry {
  id: string;
  type: "work" | "education";
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  accomplishments?: string[];
  logo: string;
  tech?: TechItem[];
}

// Tech icon mapping
const techIcons: Record<string, React.ReactNode> = {
  ".NET Core": <SiDotnet />,
  "C#": <SiSharp />,
  SQL: <SiPostgresql />,
  React: <SiReact />,
  TypeScript: <SiTypescript />,
  DataDog: <SiDatadog />,
  AWS: <SiAmazonwebservices />,
  Kubernetes: <SiKubernetes />,
  "Tanstack Query": <TbBrandReactNative />,
  Vitest: <SiVitest />,
  Ansible: <SiAnsible />,
  Jenkins: <SiJenkins />,
  Docker: <SiDocker />,
  Bash: <SiGnubash />,
  "C++": <SiCplusplus />,
  Python: <SiPython />,
  Java: <FaJava />,
  C: <SiC />,
  Verilog: null, // No icon available
};

const experiences: TimelineEntry[] = [
  {
    id: "dk-full",
    type: "work",
    company: "DraftKings",
    role: "Software Engineer",
    startDate: "July 2025",
    endDate: "Present",
    description: "Backend Development",
    logo: dkLogo,
    tech: [
      { name: ".NET Core", icon: techIcons[".NET Core"] },
      { name: "C#", icon: techIcons["C#"] },
      { name: "SQL", icon: techIcons["SQL"] },
      { name: "React", icon: techIcons["React"] },
      { name: "TypeScript", icon: techIcons["TypeScript"] },
      { name: "DataDog", icon: techIcons["DataDog"] },
      { name: "AWS", icon: techIcons["AWS"] },
      { name: "Kubernetes", icon: techIcons["Kubernetes"] },
    ],
  },
  {
    id: "dk-intern",
    type: "work",
    company: "DraftKings",
    role: "Software Engineer Intern",
    startDate: "June 2024",
    endDate: "September 2024",
    description:
      "Modernizing internal marketing infrastructure through React-based migrations and full-stack integration with .NET Core.",
    accomplishments: [
      "Led migration of a critical marketing tool from cshtml to React, enhancing functionality with dynamic forms and a searchable data table.",
      "Integrated React application with a .NET Core backend, managing data flow with Tanstack Query.",
      "Implemented live input validation and collaborated with product managers and designers via Figma.",
      "Wrote comprehensive unit tests using Vitest, improving component and service reliability.",
    ],
    logo: dkLogo,
    tech: [
      { name: "React", icon: techIcons["React"] },
      { name: "TypeScript", icon: techIcons["TypeScript"] },
      { name: "Tanstack Query", icon: techIcons["Tanstack Query"] },
      { name: "Vitest", icon: techIcons["Vitest"] },
    ],
  },
  {
    id: "pd-intern",
    type: "work",
    company: "Pacific Defense",
    role: "Software Engineer Intern",
    startDate: "June 2023",
    endDate: "September 2023",
    description:
      "Developed automated deployment processes and system management solutions for EW and signal intelligence applications.",
    accomplishments: [
      "Contributed to an agile team focused on system management solutions for electronic warfare and signal intelligence.",
      "Diagnosed and resolved complex networking and containerization issues within Jenkins deployments.",
      "Developed a dynamic deployment process using Ansible and shell scripting for software portability.",
      "Implemented a new testing framework that doubled testing environments, eliminating deployment wait times.",
    ],
    logo: pdLogo,
    tech: [
      { name: "Ansible", icon: techIcons["Ansible"] },
      { name: "Jenkins", icon: techIcons["Jenkins"] },
      { name: "Docker", icon: techIcons["Docker"] },
      { name: "Bash", icon: techIcons["Bash"] },
    ],
  },
  {
    id: "ucla",
    type: "education",
    company: "UCLA",
    role: "Bachelor of Science in Computer Science",
    startDate: "2021",
    endDate: "2025",
    description: "Graduated Summa Cum Laude • Member of Theta Chi fraternity",
    logo: uclaLogo,
    tech: [
      { name: "C++", icon: techIcons["C++"] },
      { name: "Python", icon: techIcons["Python"] },
      { name: "Java", icon: techIcons["Java"] },
      { name: "React", icon: techIcons["React"] },
      { name: "C", icon: techIcons["C"] },
      { name: "SQL", icon: techIcons["SQL"] },
    ],
  },
];

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
