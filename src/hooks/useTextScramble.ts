import { useState, useEffect, useRef } from "react";

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

interface UseTextScrambleOptions {
  speed?: number;
  delay?: number;
  scrambleDuration?: number;
}

export function useTextScramble(
  targetText: string,
  options: UseTextScrambleOptions = {}
) {
  const { speed = 50, delay = 0, scrambleDuration = 3 } = options;
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!targetText) {
      setDisplayText("");
      setIsComplete(true);
      return;
    }

    setIsComplete(false);
    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;

    const startScramble = () => {
      let iteration = 0;
      const totalIterations = targetText.length * scrambleDuration;
      
      intervalId = setInterval(() => {
        const progress = iteration / scrambleDuration;
        const revealedCount = Math.floor(progress);
        
        let result = "";
        for (let i = 0; i < targetText.length; i++) {
          if (targetText[i] === " ") {
            result += " ";
          } else if (i < revealedCount) {
            result += targetText[i];
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        
        setDisplayText(result);
        iteration++;

        if (iteration > totalIterations) {
          clearInterval(intervalId);
          setDisplayText(targetText);
          setIsComplete(true);
        }
      }, speed);
    };

    if (delay > 0) {
      timeoutId = setTimeout(startScramble, delay);
    } else {
      startScramble();
    }

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      cancelAnimationFrame(frameRef.current);
    };
  }, [targetText, speed, delay, scrambleDuration]);

  return { displayText, isComplete };
}
