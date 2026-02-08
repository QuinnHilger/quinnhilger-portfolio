import { useState, useEffect } from "react";
import { useActiveSection } from "../hooks/useActiveSection";
import "./Navigation.css";

const SECTION_IDS = ["about", "experience", "projects", "blog", "contact"];

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path
      d="M12 19V5M5 12l7-7 7 7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past 80% of viewport height
      const threshold = window.innerHeight * 0.8;
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`nav ${isVisible ? "nav--visible" : ""}`}
      aria-label="Main navigation"
    >
      <div className="nav__pill">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`nav__link ${activeSection === item.id ? "nav__link--active" : ""}`}
          >
            {item.label}
          </a>
        ))}
        <span className="nav__divider" />
        <button
          className="nav__top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUpIcon />
        </button>
      </div>
    </nav>
  );
}
