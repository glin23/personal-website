"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; life: number };

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: -100, y: -100, visible: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.visible = true;
      pointsRef.current.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (pointsRef.current.length > 50) pointsRef.current.shift();
    };
    const onLeave = () => {
      mouseRef.current.visible = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const pts = pointsRef.current;
      // graphite pencil trail — soft, faint
      if (pts.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 1; i < pts.length; i++) {
          const p0 = pts[i - 1];
          const p1 = pts[i];
          const t = i / pts.length;
          ctx.strokeStyle = `rgba(60, 50, 40, ${t * 0.30})`;
          ctx.lineWidth = t * 1.4 + 0.4;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }
      }
      // fade points faster on paper
      for (const p of pts) p.life -= 0.018;
      pointsRef.current = pts.filter((p) => p.life > 0);

      // custom cursor — small ink dot, no flashy halo
      if (mouseRef.current.visible) {
        const { x, y } = mouseRef.current;
        ctx.fillStyle = "rgba(60, 50, 40, 0.85)";
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(60, 50, 40, 0.25)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.stroke();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 hidden md:block"
    />
  );
}
