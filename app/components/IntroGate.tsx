"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";

/* CSS reveal classes are defined in globals.css → .gate-rise-* */

export function IntroGate({
  open,
  onEnter,
}: {
  open: boolean;
  onEnter: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") onEnter();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onEnter]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="intro"
          initial={false}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onClick={onEnter}
          className="fixed inset-0 z-[60] bg-ink cursor-pointer overflow-hidden"
        >
          {/* slowly drifting gradient mesh — kills the dead black */}
          <div className="absolute inset-0 gate-mesh" />

          {/* faint dotted grid */}
          <div className="absolute inset-0 grid-dots opacity-25" />

          {/* big asymmetric type — bottom-left anchored */}
          <div className="absolute bottom-12 left-6 md:bottom-20 md:left-12 lg:left-20 max-w-5xl pointer-events-none">
            <div
              className="h-mono text-stone mb-5 flex items-center gap-3 gate-rise"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="block w-1.5 h-1.5 rounded-full bg-volt pulse-dot" />
              <span>portfolio of an ai builder</span>
              <span className="text-fog">———</span>
              <span>v0.3 · 2026</span>
            </div>

            <h1
              className="h-display text-bone text-[clamp(64px,13vw,220px)] leading-[0.85] tracking-tight gate-rise-big"
              style={{ animationDelay: "0.45s" }}
            >
              <span className="block">i build</span>
              <span
                className="block italic font-light"
                style={{
                  background:
                    "linear-gradient(110deg, #d4ff1a 0%, #5eead4 60%, #f4f4f5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ai products.
              </span>
            </h1>

            <div
              className="mt-6 md:mt-10 flex items-center gap-3 flex-wrap gate-rise"
              style={{ animationDelay: "0.85s" }}
            >
              <span className="text-bone text-base md:text-lg font-medium">
                Lee Lin
              </span>
              <span className="h-mono text-fog">·</span>
              <span className="h-mono text-stone">babson '27</span>
              <span className="h-mono text-fog">·</span>
              <span className="h-mono text-stone">boston ↔ beijing</span>
            </div>

            <div
              className="mt-10 md:mt-12 inline-flex items-center gap-3 gate-fade"
              style={{ animationDelay: "1.2s" }}
            >
              <span className="h-mono text-stone">click anywhere</span>
              <span className="text-volt text-lg gate-arrow">→</span>
              <span className="h-mono text-stone">or press [space]</span>
            </div>
          </div>

          {/* top-left running line */}
          <div
            className="absolute top-6 left-6 md:top-10 md:left-12 gate-fade"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="h-mono text-stone">
              <span className="text-bone">↳</span> enter / portfolio
            </div>
          </div>

          {/* top-right meta block */}
          <div
            className="absolute top-6 right-6 md:top-10 md:right-12 text-right gate-fade"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="h-mono text-stone leading-relaxed">
              lee · lin
              <br />
              <span className="text-stone/60">solo builder</span>
              <br />
              <span className="text-volt">2 products live</span>
            </div>
          </div>

          {/* bottom-right hint */}
          <div
            className="absolute bottom-6 right-6 md:bottom-10 md:right-12 text-right gate-fade"
            style={{ animationDelay: "1.4s" }}
          >
            <div className="h-mono text-stone">
              <span className="text-stone/60">— scroll for more —</span>
            </div>
          </div>

          {/* faint corner crosshairs for editorial framing */}
          <Crosshair className="top-4 left-4 md:top-6 md:left-6" />
          <Crosshair className="top-4 right-4 md:top-6 md:right-6" rotate={90} />
          <Crosshair className="bottom-4 right-4 md:bottom-6 md:right-6" rotate={180} />
          <Crosshair className="bottom-4 left-4 md:bottom-6 md:left-6" rotate={270} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Crosshair({
  className,
  rotate = 0,
}: {
  className?: string;
  rotate?: number;
}) {
  return (
    <div
      className={`absolute pointer-events-none ${className ?? ""}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="relative w-3 h-3">
        <span className="absolute top-0 left-0 w-3 h-px bg-fog" />
        <span className="absolute top-0 left-0 w-px h-3 bg-fog" />
      </div>
    </div>
  );
}
