import { useEffect, useRef } from "react";

interface RocketCursorProps {
  size?: number;
}

export function RocketCursor({ size = 32 }: RocketCursorProps) {
  const rocketRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const rotationRef = useRef(0);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const rocket = rocketRef.current;
      if (!rocket) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Smooth follow with easing
      const dx = targetRef.current.x - positionRef.current.x;
      const dy = targetRef.current.y - positionRef.current.y;

      positionRef.current.x += dx * 0.1;
      positionRef.current.y += dy * 0.1;

      // Calculate rotation based on movement direction
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        const targetRotation = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        // Smooth rotation
        let rotationDiff = targetRotation - rotationRef.current;
        // Handle wrap-around
        if (rotationDiff > 180) rotationDiff -= 360;
        if (rotationDiff < -180) rotationDiff += 360;
        rotationRef.current += rotationDiff * 0.15;
      }

      rocket.style.transform = `translate(${positionRef.current.x - size / 2}px, ${positionRef.current.y - size / 2}px) rotate(${rotationRef.current}deg)`;

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [size]);

  return (
    <div
      ref={rocketRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: size,
        height: size,
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
      }}
    >
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        style={{ filter: "drop-shadow(0 0 8px rgba(255, 150, 50, 0.6))" }}
      >
        {/* Rocket body */}
        <path
          d="M32 4 L40 24 L40 44 L36 52 L28 52 L24 44 L24 24 Z"
          fill="url(#rocketGradient)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />
        {/* Nose cone */}
        <path d="M32 4 L38 18 L26 18 Z" fill="#e74c3c" />
        {/* Window */}
        <circle
          cx="32"
          cy="28"
          r="5"
          fill="#3498db"
          stroke="#2980b9"
          strokeWidth="1"
        />
        <circle cx="32" cy="28" r="3" fill="#5dade2" />
        {/* Fins */}
        <path d="M24 40 L16 52 L24 48 Z" fill="#e74c3c" />
        <path d="M40 40 L48 52 L40 48 Z" fill="#e74c3c" />
        {/* Flame */}
        <ellipse cx="32" cy="58" rx="6" ry="4" fill="url(#flameGradient)">
          <animate
            attributeName="ry"
            values="4;6;4"
            dur="0.15s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;0.8;1"
            dur="0.1s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse cx="32" cy="56" rx="4" ry="3" fill="#ffd700">
          <animate
            attributeName="ry"
            values="3;4;3"
            dur="0.12s"
            repeatCount="indefinite"
          />
        </ellipse>
        {/* Gradients */}
        <defs>
          <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#bdc3c7" />
            <stop offset="50%" stopColor="#ecf0f1" />
            <stop offset="100%" stopColor="#bdc3c7" />
          </linearGradient>
          <radialGradient id="flameGradient" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="50%" stopColor="#ff6b35" />
            <stop offset="100%" stopColor="#e74c3c" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
