import { useState, useEffect } from "react";
import { useActiveSection } from "../hooks/useActiveSection";
import "./SideDotsNav.css";

const SECTION_IDS = ["about", "experience", "projects", "blog", "contact"];

const SECTION_LABELS: Record<string, string> = {
  about: "About",
  experience: "Experience",
  projects: "Projects",
  blog: "Blog",
  contact: "Contact",
};

export function SideDotsNav() {
  const [isVisible, setIsVisible] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => {
      // Show dots after scrolling past 80% of viewport height
      const threshold = window.innerHeight * 0.8;
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`side-dots ${isVisible ? "side-dots--visible" : ""}`}
      aria-label="Section navigation"
    >
      {SECTION_IDS.map((id) => (
        <button
          key={id}
          className={`side-dots__dot ${activeSection === id ? "side-dots__dot--active" : ""}`}
          data-label={SECTION_LABELS[id]}
          onClick={() => handleClick(id)}
          aria-label={`Go to ${SECTION_LABELS[id]}`}
        />
      ))}
    </nav>
  );
}
