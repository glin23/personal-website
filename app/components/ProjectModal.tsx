"use client";

import { AnimatePresence, motion } from "motion/react";
import { type Project } from "@/lib/projects";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-40 bg-ink"
        >
          {/* grainy spotlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(40% 60% at 70% 50%, ${project.faceAccent}1f, transparent 70%)`,
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
              mixBlendMode: "overlay",
            }}
          />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative h-full w-full overflow-y-auto"
          >
            {/* nav bar */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-12 py-5 bg-ink/60 backdrop-blur border-b border-fog/40">
              <button
                onClick={onClose}
                className="group flex items-center gap-3 h-mono text-ash hover:text-volt transition-colors"
              >
                <span className="text-lg leading-none transition-transform group-hover:-translate-x-1">
                  ←
                </span>
                <span>Back to home</span>
              </button>
              <span className="h-mono text-stone">
                Project / {project.number}
              </span>
              <button
                onClick={onClose}
                className="text-ash hover:text-volt transition-colors text-2xl leading-none"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="px-6 md:px-12 py-12 md:py-20 max-w-6xl mx-auto">
              {/* hero */}
              <div className="space-y-6 mb-16">
                <div className="flex items-center gap-3">
                  <span
                    className="h-mono"
                    style={{ color: project.faceAccent }}
                  >
                    {project.role}
                  </span>
                  <span className="h-mono text-stone">·</span>
                  <span className="h-mono text-stone">{project.period}</span>
                </div>
                <h1 className="h-display text-bone text-6xl md:text-8xl">
                  {project.name}
                </h1>
                <p className="text-2xl md:text-3xl text-ash max-w-3xl leading-tight">
                  {project.tagline}
                </p>
              </div>

              {/* mockup-style card */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative rounded-2xl border border-fog/60 bg-pitch/50 overflow-hidden mb-16"
                style={{
                  boxShadow: `0 30px 80px -20px ${project.faceAccent}1a`,
                }}
              >
                {/* fake browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-fog/40 bg-void/60">
                  <span className="w-3 h-3 rounded-full bg-fog" />
                  <span className="w-3 h-3 rounded-full bg-fog" />
                  <span className="w-3 h-3 rounded-full bg-fog" />
                  <span className="ml-3 h-mono text-stone text-[10px]">
                    {project.url ? new URL(project.url).host : "preview"}
                  </span>
                </div>
                <div
                  className="aspect-[16/9] flex items-center justify-center relative grid-dots"
                  style={{
                    background: `linear-gradient(135deg, ${project.faceColor} 0%, ${project.faceAccent}10 100%)`,
                  }}
                >
                  <div className="text-center px-8">
                    <div
                      className="h-mono mb-3"
                      style={{ color: project.faceAccent }}
                    >
                      LIVE PREVIEW PLACEHOLDER
                    </div>
                    <div className="h-display text-bone text-4xl md:text-6xl mb-2">
                      {project.name}
                    </div>
                    <div className="text-ash">{project.tagline}</div>
                  </div>
                </div>
              </motion.div>

              {/* details grid */}
              <div className="grid md:grid-cols-3 gap-12 mb-16">
                <div className="md:col-span-2 space-y-6">
                  <h2 className="h-mono text-stone">// About</h2>
                  <p className="text-bone text-lg md:text-xl leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="space-y-8">
                  <div>
                    <h3 className="h-mono text-stone mb-3">Metrics</h3>
                    <ul className="space-y-2">
                      {project.metrics.map((m) => (
                        <li
                          key={m}
                          className="flex items-baseline gap-2 text-bone"
                        >
                          <span
                            className="block w-1 h-1 rounded-full mt-2"
                            style={{ background: project.faceAccent }}
                          />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="h-mono text-stone mb-3">Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-md border border-fog/70 text-xs font-mono text-ash"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              {project.url && (
                <motion.a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="group inline-flex items-center gap-4 px-6 py-4 rounded-full border-2 transition-all"
                  style={{
                    borderColor: project.faceAccent,
                    color: project.faceAccent,
                  }}
                >
                  <span className="h-mono">VISIT LIVE SITE</span>
                  <span className="font-mono text-sm">{project.url.replace(/^https?:\/\//, "")}</span>
                  <span className="text-2xl leading-none transition-transform group-hover:translate-x-1">
                    ↗
                  </span>
                </motion.a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
