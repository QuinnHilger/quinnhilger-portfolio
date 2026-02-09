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

const HamburgerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
  </svg>
);

export function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`nav ${isVisible ? "nav--visible" : ""}`}
        aria-label="Main navigation"
      >
        {/* Desktop navigation pill */}
        <div className="nav__pill nav__pill--desktop">
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

        {/* Mobile hamburger button */}
        <button
          className="nav__hamburger"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <HamburgerIcon />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="nav__mobile-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="nav__mobile-menu"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="nav__mobile-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
            <div className="nav__mobile-links">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav__mobile-link ${activeSection === item.id ? "nav__mobile-link--active" : ""}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <button
              className="nav__mobile-top"
              onClick={() => {
                scrollToTop();
                setIsMobileMenuOpen(false);
              }}
            >
              ↑ Back to Top
            </button>
          </div>
        </div>
      )}
    </>
  );
}
