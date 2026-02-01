import { useEffect, useRef, useState } from "react";
import falconSvg from "../assets/svg/falcon.svg";

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
}

interface Laser {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
}

interface FalconCursorProps {
  size?: number;
}

const DOCK_POSITION = { x: 50, y: 50 };

export function FalconCursor({ size = 40 }: FalconCursorProps) {
  const falconRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: DOCK_POSITION.x, y: DOCK_POSITION.y });
  const targetRef = useRef({ x: DOCK_POSITION.x, y: DOCK_POSITION.y });
  const rotationRef = useRef(0);
  const animationRef = useRef<number>(0);
  const [trail, setTrail] = useState<TrailParticle[]>([]);
  const [lasers, setLasers] = useState<Laser[]>([]);
  const [isDocked, setIsDocked] = useState(true);
  const trailIdRef = useRef(0);
  const laserIdRef = useRef(0);
  const lastTrailTimeRef = useRef(0);

  // Handle click to shoot laser (only when not docked)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Check if clicking on dock
      const dockElement = document.getElementById("falcon-dock");
      if (dockElement && dockElement.contains(e.target as Node)) {
        return; // Don't shoot when clicking dock
      }

      if (isDocked) return;

      const angleRad = (rotationRef.current - 90) * (Math.PI / 180);
      const newLaser: Laser = {
        id: laserIdRef.current++,
        x: positionRef.current.x,
        y: positionRef.current.y,
        angle: angleRad,
        speed: 15,
      };
      setLasers((prev) => [...prev, newLaser]);

      setTimeout(() => {
        setLasers((prev) => prev.filter((l) => l.id !== newLaser.id));
      }, 2000);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isDocked]);

  const hasLasers = lasers.length > 0;

  // Animate lasers
  useEffect(() => {
    if (!hasLasers) return;

    let frameId: number;

    const animateLasers = () => {
      setLasers((prev) =>
        prev.map((laser) => ({
          ...laser,
          x: laser.x + Math.cos(laser.angle) * laser.speed,
          y: laser.y + Math.sin(laser.angle) * laser.speed,
        })),
      );
      frameId = requestAnimationFrame(animateLasers);
    };

    frameId = requestAnimationFrame(animateLasers);
    return () => cancelAnimationFrame(frameId);
  }, [hasLasers]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDocked) {
        targetRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const animate = () => {
      const falcon = falconRef.current;
      if (!falcon) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // If docked, animate towards dock position
      const target = isDocked ? DOCK_POSITION : targetRef.current;

      const dx = target.x - positionRef.current.x;
      const dy = target.y - positionRef.current.y;

      positionRef.current.x += dx * 0.12;
      positionRef.current.y += dy * 0.12;

      // Calculate rotation based on movement direction (or point up when docked)
      if (isDocked) {
        // Rotate towards 0 (pointing up) when docked
        let rotationDiff = 0 - rotationRef.current;
        if (rotationDiff > 180) rotationDiff -= 360;
        if (rotationDiff < -180) rotationDiff += 360;
        rotationRef.current += rotationDiff * 0.1;
      } else if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        const targetRotation = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        let rotationDiff = targetRotation - rotationRef.current;
        if (rotationDiff > 180) rotationDiff -= 360;
        if (rotationDiff < -180) rotationDiff += 360;
        rotationRef.current += rotationDiff * 0.12;
      }

      falcon.style.transform = `translate(${positionRef.current.x - size / 2}px, ${positionRef.current.y - size / 2}px) rotate(${rotationRef.current}deg)`;

      // Add trail particles when moving (only when not docked)
      if (!isDocked) {
        const now = Date.now();
        const speed = Math.sqrt(dx * dx + dy * dy);
        if (speed > 1 && now - lastTrailTimeRef.current > 30) {
          lastTrailTimeRef.current = now;
          const newParticle: TrailParticle = {
            id: trailIdRef.current++,
            x: positionRef.current.x,
            y: positionRef.current.y,
            opacity: 0.8,
            size: Math.random() * 6 + 4,
          };
          setTrail((prev) => [...prev.slice(-20), newParticle]);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [size, isDocked]);

  const hasTrail = trail.length > 0;

  // Fade out trail particles
  useEffect(() => {
    if (!hasTrail) return;

    const fadeInterval = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((p) => ({ ...p, opacity: p.opacity - 0.08 }))
          .filter((p) => p.opacity > 0),
      );
    }, 50);

    return () => clearInterval(fadeInterval);
  }, [hasTrail]);

  const [hasInteracted, setHasInteracted] = useState(false);

  const handleDockClick = () => {
    setIsDocked((prev) => !prev);
    setHasInteracted(true);
    if (!isDocked) {
      // Clear trail when docking
      setTrail([]);
    }
  };

  return (
    <>
      {/* Click me hint */}
      {!hasInteracted && (
        <div
          style={{
            position: "fixed",
            top: 28,
            left: 90,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "rgba(96, 165, 250, 0.9)",
            fontSize: "0.875rem",
            fontWeight: 500,
            textShadow: "0 0 10px rgba(96, 165, 250, 0.6)",
            pointerEvents: "none",
            zIndex: 101,
            animation: "pulse 2s ease-in-out infinite",
          }}
        >
          <span style={{ fontSize: "1.2rem" }}>←</span>
          <span>Click me!</span>
        </div>
      )}

      {/* Dock / Landing Pad */}
      <div
        id="falcon-dock"
        onClick={handleDockClick}
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: isDocked
            ? "radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, rgba(96, 165, 250, 0.1) 70%, transparent 100%)"
            : "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 70%, transparent 100%)",
          border: `2px solid ${isDocked ? "rgba(96, 165, 250, 0.6)" : "rgba(255, 255, 255, 0.2)"}`,
          cursor: "pointer",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          boxShadow: isDocked
            ? "0 0 20px rgba(96, 165, 250, 0.4), inset 0 0 20px rgba(96, 165, 250, 0.1)"
            : "none",
        }}
        title={isDocked ? "Click to launch Falcon" : "Click to dock Falcon"}
      >
        {/* Landing pad circles */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: `1px dashed ${isDocked ? "rgba(96, 165, 250, 0.4)" : "rgba(255, 255, 255, 0.15)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              border: `1px dashed ${isDocked ? "rgba(96, 165, 250, 0.4)" : "rgba(255, 255, 255, 0.15)"}`,
            }}
          />
        </div>
      </div>

      {/* Lasers */}
      {lasers.map((laser) => (
        <div
          key={laser.id}
          style={{
            position: "fixed",
            left: laser.x - 3,
            top: laser.y - 12,
            width: 6,
            height: 24,
            background: "linear-gradient(to bottom, #ff0000, #ff4444, #ff0000)",
            borderRadius: 3,
            boxShadow: "0 0 10px #ff0000, 0 0 20px #ff4444, 0 0 30px #ff0000",
            transform: `rotate(${laser.angle * (180 / Math.PI) + 90}deg)`,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      ))}

      {/* Trail particles */}
      {trail.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: "fixed",
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(255, 150, 50, ${particle.opacity}) 0%, rgba(255, 100, 30, ${particle.opacity * 0.5}) 50%, transparent 100%)`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      ))}

      {/* Falcon */}
      <div
        ref={falconRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: size,
          height: size,
          pointerEvents: "none",
          zIndex: isDocked ? 101 : 1,
          willChange: "transform",
          filter: isDocked
            ? "drop-shadow(0 0 12px rgba(96, 165, 250, 0.8))"
            : "drop-shadow(0 0 8px rgba(255, 150, 50, 0.6))",
          transition: "filter 0.3s ease",
        }}
      >
        <img
          src={falconSvg}
          alt="Millennium Falcon"
          width={size}
          height={size}
          style={{ display: "block" }}
        />
      </div>
    </>
  );
}
