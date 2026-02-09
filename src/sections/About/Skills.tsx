import { useState, useEffect, useRef } from "react";
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
  SiSupabase,
  SiExpo,
  SiOpenai,
  SiSwift,
  SiFirebase,
  SiGithubcopilot,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { FaJava, FaRobot } from "react-icons/fa";
import { HiLightBulb } from "react-icons/hi";
import "./Skills.css";

interface Skill {
  name: string;
  icon: React.ReactNode;
  favorite?: boolean;
}

interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    skills: [
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Python", icon: <SiPython />, favorite: true },
      { name: "C#", icon: <SiSharp /> },
      { name: "Java", icon: <FaJava /> },
      { name: "C++", icon: <SiCplusplus /> },
      { name: "C", icon: <SiC /> },
      { name: "SQL", icon: <SiPostgresql />, favorite: true },
      { name: "Bash", icon: <SiGnubash /> },
    ],
  },
  {
    id: "frameworks-infra",
    title: "Frameworks & Infrastructure",
    skills: [
      { name: "React", icon: <SiReact />, favorite: true },
      { name: "React Native", icon: <TbBrandReactNative /> },
      { name: "Expo", icon: <SiExpo /> },
      { name: "SwiftUI", icon: <SiSwift /> },
      { name: ".NET Core", icon: <SiDotnet /> },
      { name: "Supabase", icon: <SiSupabase />, favorite: true },
      { name: "Firestore", icon: <SiFirebase /> },
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", icon: <SiAmazonwebservices /> },
      { name: "Kubernetes", icon: <SiKubernetes /> },
      { name: "Docker", icon: <SiDocker /> },
      { name: "Jenkins", icon: <SiJenkins /> },
      { name: "Ansible", icon: <SiAnsible /> },
    ],
  },
  {
    id: "tools",
    title: "Tools & AI",
    skills: [
      { name: "DataDog", icon: <SiDatadog />, favorite: true },
      { name: "Vitest", icon: <SiVitest /> },
      { name: "OpenAI API", icon: <SiOpenai /> },
      { name: "Claude Code", icon: <FaRobot />, favorite: true },
      { name: "GitHub Copilot", icon: <SiGithubcopilot /> },
      { name: "Cursor", icon: <FaRobot /> },
      { name: "Antigravity", icon: <FaRobot /> },
    ],
  },
];

export function Skills() {
  const [visibleCategories, setVisibleCategories] = useState<Set<string>>(
    new Set(),
  );
  const [showTooltip, setShowTooltip] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    skillCategories.forEach((category) => {
      const element = document.getElementById(`skill-${category.id}`);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCategories((prev) => new Set([...prev, category.id]));
          }
        },
        { threshold: 0.2 },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="skills" id="skills" ref={sectionRef}>
      <div className="skills__container">
        <div className="skills__header">
          <h2 className="skills__heading">Skills & Tech Stack</h2>
          <button
            className="skills__insight-btn"
            onClick={() => setShowTooltip(!showTooltip)}
            aria-label="Insight about skills"
          >
            <HiLightBulb />
          </button>
          <span className="skills__favorites-legend">
            <span className="skills__favorites-dot" />
            My favorites
          </span>
          {showTooltip && (
            <div className="skills__tooltip">
              <p>
                With AI advancing so rapidly, I question how long any of these
                skills will remain relevant. Maybe learning to learn is what
                counts.
              </p>
              <button
                className="skills__tooltip-close"
                onClick={() => setShowTooltip(false)}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div className="skills__grid">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              id={`skill-${category.id}`}
              className={`skills__category ${
                visibleCategories.has(category.id)
                  ? "skills__category--visible"
                  : ""
              }`}
            >
              <h3 className="skills__category-title">{category.title}</h3>
              <div className="skills__badges">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className={`skills__badge ${skill.favorite ? "skills__badge--favorite" : ""}`}
                  >
                    <span className="skills__badge-icon">{skill.icon}</span>
                    <span className="skills__badge-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
