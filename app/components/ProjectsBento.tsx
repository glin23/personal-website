"use client";

import { motion } from "motion/react";
import { projects, type Project } from "@/lib/projects";

/* ============================================================
   Projects — page II of the personal collection.
   Designed to match the Hero's book-chapter aesthetic:
   serif Fraunces titles, Roman numerals, dot leaders,
   handwritten Caveat margin notes, no bright sticky-notes.
   ============================================================ */

const ROMAN = ["I", "II", "III", "IV", "V"];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7 },
};

export function ProjectsBento({
  onSelect,
}: {
  onSelect: (p: Project) => void;
}) {
  return (
    <section
      id="work"
      className="relative px-6 md:px-12 py-20 md:py-28 max-w-[1100px] mx-auto"
    >
      {/* page-header bar — mirrors Hero's top header */}
      <header className="flex items-baseline justify-between border-b border-bone/30 pb-4 mb-12">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone">
          // chapter ii · work
        </div>
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone">
          p. 002
        </div>
      </header>

      {/* big section title */}
      <motion.div {...fadeUp} className="mb-2">
        <h2 className="h-display text-bone text-6xl md:text-8xl">Projects.</h2>
      </motion.div>

      {/* subtitle in italic */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="flex items-baseline gap-3 mb-16"
      >
        <span className="book-display italic text-bone/70 text-xl md:text-2xl">
          {projects.length === 2 ? "two" : projects.length} pinned ·
        </span>
        <span className="hand text-bone/70 text-xl md:text-2xl">
          click to peek
        </span>
      </motion.div>

      {/* the entries */}
      <ol className="space-y-2">
        {projects.map((p, i) => (
          <ProjectEntry
            key={p.id}
            project={p}
            roman={ROMAN[i]}
            onSelect={() => onSelect(p)}
            index={i}
          />
        ))}
      </ol>

      {/* footer hairline + author note */}
      <div className="mt-16 pt-6 border-t border-bone/30 flex items-baseline justify-between">
        <div>
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone">
            ↳ next on the press
          </div>
          <div className="hand text-2xl md:text-3xl text-bone mt-1 leading-none">
            something AI-native, q3 2026.
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone">
            archive
          </div>
          <div className="book-display italic text-bone text-xl md:text-2xl mt-1 leading-none">
            see all →
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Single project entry — like a journal/encyclopedia article.
   Hover: hairline left border grows + subtle accent.
   ============================================================ */
function ProjectEntry({
  project,
  roman,
  onSelect,
  index,
}: {
  project: Project;
  roman: string;
  onSelect: () => void;
  index: number;
}) {
  return (
    <motion.li
      {...fadeUp}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.07 }}
      className="group relative"
    >
      {/* growing accent line on hover, lives in the page margin */}
      <span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-bone scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500 ease-out"
        style={{ background: project.faceAccent }}
      />

      <button
        onClick={() => {
          // If project has a live URL, open it directly in a new tab.
          // Otherwise (case study only) fall back to the modal.
          if (project.url) {
            window.open(project.url, "_blank", "noopener,noreferrer");
          } else {
            onSelect();
          }
        }}
        className="w-full text-left py-7 md:py-9 pl-6 md:pl-10 pr-2 border-t border-bone/20 last:border-b last:border-b-bone/20 transition-colors hover:bg-pitch/40 cursor-pointer"
      >
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-baseline">
          {/* roman + name */}
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-baseline gap-3 md:gap-4">
              <span
                className="book-display italic text-bone/55 group-hover:text-bone transition-colors text-xl md:text-2xl"
                style={{ minWidth: 28 }}
              >
                {roman}.
              </span>
              <h3 className="book-display text-bone text-3xl md:text-5xl leading-[0.95] tracking-tight">
                {project.name}
              </h3>
            </div>
            <div className="mt-2 ml-10 md:ml-11 font-mono text-[10px] tracking-[0.18em] uppercase text-stone">
              {project.role.toLowerCase()} · {project.period.toLowerCase()}
            </div>
          </div>

          {/* tagline + metrics + link */}
          <div className="col-span-12 md:col-span-7 space-y-4">
            <p className="book-display italic text-bone text-xl md:text-2xl leading-snug">
              {project.tagline}
            </p>

            {/* metrics — small caps mono */}
            <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[10px] tracking-[0.16em] uppercase text-stone">
              {project.metrics.map((m, idx) => (
                <span key={m} className="flex items-baseline gap-2">
                  {idx > 0 && <span className="text-bone/30">·</span>}
                  <span>{m}</span>
                </span>
              ))}
            </div>

            {/* link line */}
            <div className="flex items-baseline justify-between pt-2">
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="hand text-bone/80 hover:text-bone text-lg md:text-xl underline decoration-bone/30 underline-offset-4 hover:decoration-bone transition-colors"
                >
                  {project.url.replace(/^https?:\/\//, "")} ↗
                </a>
              ) : (
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone">
                  case study
                </span>
              )}

              <span
                className="hand transition-transform group-hover:translate-x-1"
                style={{ color: project.faceAccent }}
              >
                read entry →
              </span>
            </div>
          </div>
        </div>
      </button>
    </motion.li>
  );
}
