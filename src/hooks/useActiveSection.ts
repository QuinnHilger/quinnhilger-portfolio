import { useState, useEffect } from "react";

type SectionId = string;

/**
 * Hook that tracks which section is currently visible in the viewport.
 * Uses IntersectionObserver to efficiently detect section visibility.
 */
export function useActiveSection(sectionIds: SectionId[]): SectionId | null {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<SectionId, number>();

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Store the intersection ratio for this section
              visibleSections.set(id, entry.intersectionRatio);
            } else {
              visibleSections.delete(id);
            }

            // Find the section with the highest visibility
            let maxRatio = 0;
            let mostVisible: SectionId | null = null;

            visibleSections.forEach((ratio, sectionId) => {
              if (ratio > maxRatio) {
                maxRatio = ratio;
                mostVisible = sectionId;
              }
            });

            // If no section is visible, check which one is closest to viewport top
            if (!mostVisible && visibleSections.size === 0) {
              let closestSection: SectionId | null = null;
              let closestDistance = Infinity;

              sectionIds.forEach((sectionId) => {
                const el = document.getElementById(sectionId);
                if (el) {
                  const rect = el.getBoundingClientRect();
                  const distance = Math.abs(rect.top);
                  if (distance < closestDistance) {
                    closestDistance = distance;
                    closestSection = sectionId;
                  }
                }
              });

              mostVisible = closestSection;
            }

            setActiveSection(mostVisible);
          });
        },
        {
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
          rootMargin: "-10% 0px -10% 0px",
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}
