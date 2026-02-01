import { useState, useRef } from "react";
import "./CollapsibleSection.css";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    const willOpen = !isOpen;
    setIsOpen(willOpen);

    // Scroll into view when opening
    if (willOpen && contentRef.current) {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 500); // Small delay to let the animation start
    }
  };

  return (
    <div className="collapsible">
      <button
        className={`collapsible__toggle ${isOpen ? "collapsible__toggle--open" : ""}`}
        onClick={handleToggle}
        aria-expanded={isOpen}
      >
        <span className="collapsible__title">{title}</span>
        <span className="collapsible__icon">{isOpen ? "−" : "+"}</span>
      </button>
      <div
        ref={contentRef}
        className={`collapsible__content ${isOpen ? "collapsible__content--open" : ""}`}
      >
        <div className="collapsible__inner">{children}</div>
      </div>
    </div>
  );
}
