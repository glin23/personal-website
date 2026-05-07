"use client";

import { motion } from "motion/react";
import { ReactNode, useState } from "react";

type Props = {
  label: string;
  hint?: string;
  // initial offset from anchor point (em or px)
  x: number;
  y: number;
  rotate?: number;
  accent?: string;
  glyph?: ReactNode;
  onClick?: () => void;
  /** If true, dragging is disabled and node only wobbles on hover. */
  staticPos?: boolean;
};

// each card gets its own random idle drift so they don't move in sync
const driftPresets = [
  { y: [0, -8, 4, 0], x: [0, 4, -3, 0], rot: [0, 1.5, -1, 0], dur: 9 },
  { y: [0, 6, -5, 0], x: [0, -5, 3, 0], rot: [0, -1.2, 1.6, 0], dur: 11 },
  { y: [0, -10, 5, 0], x: [0, 3, -4, 0], rot: [0, 1.8, -0.8, 0], dur: 13 },
  { y: [0, 7, -3, 0], x: [0, -2, 5, 0], rot: [0, -1.4, 1.2, 0], dur: 10 },
  { y: [0, -6, 8, 0], x: [0, 5, -2, 0], rot: [0, 1.0, -1.5, 0], dur: 12 },
];

export function FloatingNode({
  label,
  hint,
  x,
  y,
  rotate = 0,
  accent = "var(--color-volt)",
  glyph,
  onClick,
  staticPos = false,
  driftSeed = 0,
}: Props & { driftSeed?: number }) {
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);

  const drift = driftPresets[driftSeed % driftPresets.length];

  return (
    <motion.button
      initial={false}
      animate={
        dragging || hovered
          ? { opacity: 1, y: 0, x: 0, scale: 1, rotate }
          : {
              opacity: 1,
              y: drift.y,
              x: drift.x,
              scale: 1,
              rotate: drift.rot.map((r) => rotate + r),
            }
      }
      transition={
        dragging || hovered
          ? { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
          : {
              duration: drift.dur,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }
      }
      drag={!staticPos}
      dragMomentum={false}
      dragElastic={0.2}
      whileHover={{ scale: 1.06, rotate: rotate + 1.5 }}
      whileTap={{ scale: 0.96 }}
      whileDrag={{ scale: 1.1, rotate: rotate + 4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onClick={onClick}
      style={{
        position: "absolute",
        left: x,
        top: y,
        rotate: `${rotate}deg`,
        transformOrigin: "center",
      }}
      className="group select-none cursor-grab active:cursor-grabbing"
    >
      <div
        className="relative flex items-center gap-3 px-4 py-3 rounded-2xl bg-pitch/85 backdrop-blur border border-fog/70 shadow-lg transition-all"
        style={{
          boxShadow: hovered
            ? `0 18px 50px -10px ${accent}40`
            : `0 8px 30px -10px rgba(0,0,0,0.6)`,
        }}
      >
        {/* accent dot */}
        <span
          className="block w-2 h-2 rounded-full shrink-0"
          style={{ background: accent }}
        />
        {glyph && <span className="text-bone">{glyph}</span>}
        <div className="text-left">
          <div className="text-bone font-medium text-sm leading-tight">
            {label}
          </div>
          {hint && (
            <div className="h-mono text-stone text-[10px] mt-0.5">{hint}</div>
          )}
        </div>
        {/* arrow */}
        <span className="ml-2 text-stone group-hover:text-bone group-hover:translate-x-0.5 transition-all">
          ↗
        </span>

        {/* corner accent line */}
        <span
          className="absolute top-0 right-0 h-2 w-6 rounded-bl-md"
          style={{ background: accent }}
        />
      </div>

      {/* drag affordance hint, only shows on first 4 sec via CSS class on parent if desired */}
    </motion.button>
  );
}
