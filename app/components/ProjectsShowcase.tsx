"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { useState } from "react";
import { projects, type Project } from "@/lib/projects";

const ProjectCube = dynamic(
  () => import("./ProjectCube").then((m) => m.ProjectCube),
  { ssr: false }
);

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7 },
};

export function ProjectsShowcase({
  onSelect,
}: {
  onSelect: (p: Project) => void;
}) {
  const [hint, setHint] = useState(true);

  return (
    <section
      id="work"
      className="relative px-6 md:px-12 py-24 md:py-32 max-w-[1500px] mx-auto"
    >
      {/* zone tint */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(212, 255, 26, 0.04), transparent 70%)",
        }}
      />

      <motion.div {...fadeUp} className="flex items-baseline justify-between mb-12">
        <div>
          <div className="h-mono text-stone mb-2">// 02 · WORK</div>
          <h2 className="h-display text-bone text-5xl md:text-7xl">Projects.</h2>
        </div>
        <div className="hidden md:flex items-center gap-3 h-mono text-stone">
          <span>{projects.length} shipped</span>
          <span className="text-fog">/</span>
          <span className="text-volt">drag the cube ↻</span>
        </div>
      </motion.div>

      {/* the showroom: cube + list */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* draggable cube */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-5 relative h-[60vh] lg:h-[70vh] rounded-3xl border border-fog/50 overflow-hidden bg-void/40"
          onPointerDown={() => setHint(false)}
        >
          {/* corner labels */}
          <div className="absolute top-4 left-4 z-10 h-mono text-stone">
            // SHOWROOM
          </div>
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <span className="block w-1.5 h-1.5 rounded-full bg-volt pulse-dot" />
            <span className="h-mono text-stone">interactive</span>
          </div>

          <ProjectCube onSelect={onSelect} draggable />

          {hint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none px-4 py-2 rounded-full border border-fog/60 bg-pitch/80 backdrop-blur"
            >
              <span className="h-mono text-volt">click + drag to rotate</span>
            </motion.div>
          )}
        </motion.div>

        {/* project list */}
        <div className="lg:col-span-7 grid grid-cols-1 gap-px bg-fog/40">
          {projects.map((p, i) => (
            <motion.button
              key={p.id}
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.06 }}
              onClick={() => onSelect(p)}
              className="group relative text-left p-7 md:p-9 bg-ink hover:bg-pitch transition-colors"
            >
              <div className="flex items-baseline justify-between mb-5">
                <span
                  className="h-mono"
                  style={{ color: p.faceAccent }}
                >
                  {p.number} / {p.role.toLowerCase()}
                </span>
                <span className="h-mono text-stone">{p.period}</span>
              </div>
              <h3 className="h-display text-bone text-3xl md:text-4xl mb-2">
                {p.name}
              </h3>
              <p className="text-ash mb-5 max-w-xl">{p.tagline}</p>

              <div className="flex flex-wrap items-center gap-2 mb-5">
                {p.metrics.map((m) => (
                  <span
                    key={m}
                    className="px-2.5 py-1 rounded-full border border-fog/70 text-xs font-mono text-ash"
                  >
                    {m}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                {p.url ? (
                  <span className="h-mono text-stone group-hover:text-volt transition-colors">
                    live · {p.url.replace(/^https?:\/\//, "")}
                  </span>
                ) : (
                  <span className="h-mono text-stone">case study</span>
                )}
                <span
                  className="h-mono transition-all group-hover:translate-x-1"
                  style={{ color: p.faceAccent }}
                >
                  EXPLORE →
                </span>
              </div>

              {/* corner accent */}
              <span
                className="absolute top-0 right-0 w-px h-12"
                style={{ background: p.faceAccent }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
