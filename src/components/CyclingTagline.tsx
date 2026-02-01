import { useState, useEffect, useRef } from "react";

interface CyclingTaglineProps {
  taglinePairs: [string, string][];
  typingSpeed?: number;
  displayDuration?: number;
  className?: string;
}

export function CyclingTagline({
  taglinePairs,
  typingSpeed = 80,
  displayDuration = 2500,
  className = "",
}: CyclingTaglineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText1, setDisplayText1] = useState("");
  const [displayText2, setDisplayText2] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [tagline1, tagline2] = taglinePairs[currentIndex];
  const maxLength = Math.max(tagline1.length, tagline2.length);

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing phase - type both at the same pace
        const currentLength = Math.max(
          displayText1.length,
          displayText2.length,
        );
        if (currentLength < maxLength) {
          timeoutRef.current = setTimeout(() => {
            setDisplayText1(
              tagline1.slice(
                0,
                Math.min(displayText1.length + 1, tagline1.length),
              ),
            );
            setDisplayText2(
              tagline2.slice(
                0,
                Math.min(displayText2.length + 1, tagline2.length),
              ),
            );
          }, typingSpeed);
        } else {
          // Finished typing, wait then start deleting
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, displayDuration);
        }
      } else {
        // Deleting phase
        if (displayText1.length > 0 || displayText2.length > 0) {
          timeoutRef.current = setTimeout(() => {
            setDisplayText1(displayText1.slice(0, -1));
            setDisplayText2(displayText2.slice(0, -1));
          }, typingSpeed / 2);
        } else {
          // Finished deleting, move to next pair
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % taglinePairs.length);
        }
      }
    };

    handleTyping();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    displayText1,
    displayText2,
    isDeleting,
    tagline1,
    tagline2,
    maxLength,
    typingSpeed,
    displayDuration,
    taglinePairs.length,
  ]);

  return (
    <div
      className={className}
      style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
    >
      <span className="hero__tagline">
        {displayText1}
        <span className="typewriter-cursor">|</span>
      </span>
      <span className="hero__tagline">
        {displayText2}
        {displayText2.length > 0 && (
          <span className="typewriter-cursor">|</span>
        )}
      </span>
    </div>
  );
}
