import React from "react";
import { useTextScramble } from "../../hooks/useTextScramble";

interface ScrambleTextProps {
  text: string;
  speed?: number;
  delay?: number;
  scrambleDuration?: number;
  className?: string;
  as?: React.ElementType;
}

export function ScrambleText({
  text,
  speed = 50,
  delay = 0,
  scrambleDuration = 3,
  className = "",
  as: Component = "span",
}: ScrambleTextProps) {
  const { displayText } = useTextScramble(text, {
    speed,
    delay,
    scrambleDuration,
  });

  return <Component className={className}>{displayText}</Component>;
}
