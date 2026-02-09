import React from "react";
import { useTypewriter } from "../../hooks/useTypewriter";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  as?: React.ElementType;
  showCursor?: boolean;
}

export function TypewriterText({
  text,
  speed = 80,
  delay = 0,
  className = "",
  as: Component = "span",
  showCursor = true,
}: TypewriterTextProps) {
  const { displayText, isComplete } = useTypewriter(text, {
    speed,
    delay,
  });

  return (
    <Component className={className}>
      {displayText}
      {showCursor && !isComplete && (
        <span className="typewriter-cursor">|</span>
      )}
    </Component>
  );
}
