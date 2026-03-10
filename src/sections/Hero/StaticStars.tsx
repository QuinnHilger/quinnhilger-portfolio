import { useEffect, useRef } from "react";

interface StaticStarsProps {
  starCount?: number;
  starColor?: string;
}

export function StaticStars({
  starCount = 250,
  starColor = "rgba(255, 255, 255, 1)",
}: StaticStarsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use the canvas's own rendered dimensions (works correctly
    // whether position:fixed or contained by a transform parent)
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 1.5;
      const opacity = Math.random();

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = starColor.replace(/[\d.]+\)$/, `${opacity})`);
      ctx.fill();
    }

    // No resize listener — avoids mobile jitter from address bar changes.
    // Stars are drawn once and stay put.
  }, [starCount, starColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
