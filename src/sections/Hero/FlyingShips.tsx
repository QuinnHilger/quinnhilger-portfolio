import { useEffect, useState, useRef } from "react";
import deathStarSvg from "../../assets/svg/death-star.svg";
import starTrekSvg from "../../assets/svg/star-trek.svg";

interface Ship {
  id: number;
  type: "tiefighter" | "deathstar" | "startrek";
  x: number;
  y: number;
  baseY: number;
  speed: number;
  direction: "left" | "right";
  size: number;
  waveAmplitude: number;
  waveFrequency: number;
  phase: number;
  time: number;
  speedVariation: number;
  speedFrequency: number;
}

const SHIP_TYPES = ["tiefighter", "deathstar", "startrek"] as const;

export function FlyingShips() {
  const [ships, setShips] = useState<Ship[]>([]);
  const shipIdRef = useRef(0);

  useEffect(() => {
    const spawnShip = () => {
      const direction = Math.random() > 0.5 ? "left" : "right";
      const type = SHIP_TYPES[Math.floor(Math.random() * SHIP_TYPES.length)];
      const baseY = Math.random() * (window.innerHeight * 0.5) + 80;
      const newShip: Ship = {
        id: shipIdRef.current++,
        type,
        x: direction === "right" ? -100 : window.innerWidth + 100,
        y: baseY,
        baseY,
        speed: Math.random() * 4 + 1.3,
        direction,
        size:
          type === "deathstar"
            ? Math.random() * 20 + 50
            : Math.random() * 15 + 35,
        waveAmplitude: Math.random() * 80 + 30,
        waveFrequency: Math.random() * 0.015 + 0.005,
        phase: Math.random() * Math.PI * 2,
        time: 0,
        speedVariation: Math.random() * 1.5 + 0.5,
        speedFrequency: Math.random() * 0.02 + 0.008,
      };

      setShips((prev) => [...prev, newShip]);

      setTimeout(() => {
        setShips((prev) => prev.filter((s) => s.id !== newShip.id));
      }, 20000);
    };

    const scheduleNextSpawn = () => {
      const delay = Math.random() * 6000 + 3000;
      return setTimeout(() => {
        spawnShip();
        intervalRef.current = scheduleNextSpawn();
      }, delay);
    };

    const intervalRef = { current: scheduleNextSpawn() };
    setTimeout(spawnShip, 1500);

    return () => clearTimeout(intervalRef.current);
  }, []);

  const hasShips = ships.length > 0;

  useEffect(() => {
    if (!hasShips) return;

    let frameId: number;

    const animate = () => {
      setShips((prev) =>
        prev.map((ship) => {
          const newTime = ship.time + 1;
          const waveOffset =
            Math.sin(newTime * ship.waveFrequency + ship.phase) *
            ship.waveAmplitude;
          const secondaryWave =
            Math.sin(newTime * ship.waveFrequency * 2.3 + ship.phase) *
            (ship.waveAmplitude * 0.3);
          const currentSpeed =
            ship.speed +
            Math.sin(newTime * ship.speedFrequency) * ship.speedVariation;

          return {
            ...ship,
            x:
              ship.direction === "right"
                ? ship.x + currentSpeed
                : ship.x - currentSpeed,
            y: ship.baseY + waveOffset + secondaryWave,
            time: newTime,
          };
        }),
      );
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [hasShips]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {ships.map((ship) => {
        const waveSlope =
          Math.cos(ship.time * ship.waveFrequency + ship.phase) *
          ship.waveAmplitude *
          ship.waveFrequency;
        const tiltAngle =
          Math.atan(waveSlope / ship.speed) * (180 / Math.PI) * 0.5;

        return (
          <div
            key={ship.id}
            style={{
              position: "absolute",
              left: ship.x,
              top: ship.y,
              transform: `scaleX(${ship.direction === "left" ? -1 : 1}) rotate(${ship.direction === "left" ? -tiltAngle : tiltAngle}deg)`,
              opacity: 0.75,
              filter: "drop-shadow(0 0 10px rgba(100, 180, 255, 0.5))",
            }}
          >
            <ShipGraphic type={ship.type} size={ship.size} />
          </div>
        );
      })}
    </div>
  );
}

function ShipGraphic({ type, size }: { type: Ship["type"]; size: number }) {
  switch (type) {
    case "deathstar":
      return (
        <img src={deathStarSvg} alt="Death Star" width={size} height={size} />
      );

    case "startrek":
      return (
        <img
          src={starTrekSvg}
          alt="Star Trek Ship"
          width={size}
          height={size}
          style={{ transform: "rotate(90deg)" }}
        />
      );

    case "tiefighter":
      return (
        <svg width={size} height={size * 1.2} viewBox="0 0 40 48">
          {/* Wings */}
          <polygon points="5,0 5,48 10,44 10,4" fill="#333" />
          <polygon points="35,0 35,48 30,44 30,4" fill="#333" />
          {/* Wing details */}
          <line x1="5" y1="8" x2="5" y2="40" stroke="#222" strokeWidth="1" />
          <line x1="35" y1="8" x2="35" y2="40" stroke="#222" strokeWidth="1" />
          {/* Cockpit */}
          <circle
            cx="20"
            cy="24"
            r="8"
            fill="#444"
            stroke="#333"
            strokeWidth="2"
          />
          <circle cx="20" cy="24" r="5" fill="#222" />
          {/* Window */}
          <circle cx="20" cy="24" r="3" fill="#4a9eff" opacity="0.6" />
          {/* Struts */}
          <rect x="10" y="22" width="6" height="4" fill="#555" />
          <rect x="24" y="22" width="6" height="4" fill="#555" />
        </svg>
      );
  }
}
