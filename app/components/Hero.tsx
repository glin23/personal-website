"use client";

import { motion } from "motion/react";

/* =============================================================
   Hero — "Personal Builder's Notebook"
   Synthesis of Lynn Fisher (chapter index, dignified) + Yan Liu
   (warm cream paper) + Bryant Codes (subtle interactive delight).
   Not a copy of any single one.
   ============================================================= */

const chapters = [
  { roman: "I", label: "ABOUT", page: "001", target: "about" },
  { roman: "II", label: "WORK", page: "002", target: "work" },
  { roman: "III", label: "OFF-SCREEN", page: "003", target: "hobby" },
  { roman: "IV", label: "CONTACT", page: "004", target: "contact" },
];

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Hero inherits the warm cream paper + grid texture from <body>.
          No local bg overlays here — keeps colour identical with the rest of the page. */}

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12 py-12 md:py-16 min-h-screen flex flex-col">
        {/* ==== TOP BAR — line at top with publishing meta ==== */}
        <header className="flex items-baseline justify-between border-b border-bone/30 pb-4">
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.18em] uppercase text-stone">
            <span className="block w-1.5 h-1.5 rounded-full bg-coal pulse-dot" />
            <span>portfolio · 2026 · v.0.6</span>
          </div>
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone">
            boston · mmxxvi
          </div>
        </header>

        {/* ==== MASTHEAD — tighter so contents fit above the fold ==== */}
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          className="mt-4 md:mt-6 text-center"
        >
          <h1
            className="hand text-bone leading-[0.85]"
            style={{ fontSize: "clamp(80px, 11vw, 160px)" }}
          >
            Lee&nbsp;Lin
          </h1>

          <div className="mt-1 hand text-2xl text-bone/70">林感</div>

          <div className="mt-3 flex items-center justify-center gap-3 text-stone">
            <span className="block w-8 h-px bg-bone/30" />
            <span className="font-mono text-[10px] tracking-[0.32em] uppercase">
              a builder
            </span>
            <span className="block w-8 h-px bg-bone/30" />
          </div>
        </motion.div>

        {/* ==== CHAPTER INDEX — main centerpiece ==== */}
        <div className="mt-6 md:mt-8 max-w-[640px] w-full mx-auto">
          <div className="font-mono text-[10px] tracking-[0.32em] uppercase text-stone text-center mb-3">
            ─ contents ─
          </div>

          <ol className="space-y-1 md:space-y-2">
            {chapters.map((c, i) => (
              <ChapterLine
                key={c.roman}
                roman={c.roman}
                label={c.label}
                page={c.page}
                index={i}
                onClick={() => scrollTo(c.target)}
              />
            ))}
          </ol>
        </div>

        {/* ==== BOTTOM — thesis + edition (compact) ==== */}
        <div className="mt-6 md:mt-8 flex items-end justify-between border-t border-bone/30 pt-4">
          <div>
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone">
              ↳ thesis
            </div>
            <div className="hand text-2xl md:text-3xl text-bone mt-1 leading-none">
              build, then ship.
            </div>
          </div>

          <div className="text-right">
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone">
              edition
            </div>
            <div className="book-display italic text-bone text-xl md:text-2xl mt-1 leading-none">
              vol. <span className="font-normal">vi</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==== MARGIN ANNOTATIONS — 6 handwritten notes scattered around first viewport ==== */}

      {/* TOP-LEFT — operating loop */}
      <MarginNote
        className="hidden lg:block absolute top-[12%] left-6 max-w-[180px] -rotate-3 text-left"
        text="small bets,"
        sub="fast loops"
      />

      {/* TOP-RIGHT — ethos */}
      <MarginNote
        className="hidden lg:block absolute top-[10%] right-6 max-w-[180px] rotate-2 text-right"
        text="show, don't tell"
      />

      {/* UPPER-LEFT — now shipping (R2W) */}
      <MarginNote
        className="hidden lg:block absolute top-[33%] left-4 max-w-[200px] rotate-2 text-left"
        text="now shipping ↘"
        sub="r2w ↗"
        href="https://r2w.online"
      />

      {/* UPPER-RIGHT — open to coffee chats */}
      <MarginNote
        className="hidden lg:block absolute top-[36%] right-4 max-w-[200px] -rotate-3 text-right"
        text="open to coffee chats"
        sub="boston · sf · beijing ↓"
        scrollTo="contact"
      />

      {/* LOWER-LEFT — operating principle */}
      <MarginNote
        className="hidden lg:block absolute top-[63%] left-8 max-w-[180px] -rotate-2 text-left"
        text="move first,"
        sub="plan later"
      />

      {/* LOWER-RIGHT — ethos */}
      <MarginNote
        className="hidden lg:block absolute top-[68%] right-8 max-w-[200px] rotate-3 text-right"
        text="build in public"
      />
    </section>
  );
}

/* ========== chapter line ========== */
function ChapterLine({
  roman,
  label,
  page,
  index,
  onClick,
}: {
  roman: string;
  label: string;
  page: string;
  index: number;
  onClick: () => void;
}) {
  return (
    <li>
      <motion.button
        onClick={onClick}
        initial={false}
        whileHover="hover"
        className="group w-full flex items-baseline gap-3 md:gap-4 py-2 cursor-pointer"
      >
        <span
          className="book-display italic text-bone/60 group-hover:text-bone transition-colors text-base md:text-xl"
          style={{ minWidth: 38 }}
        >
          {roman}.
        </span>

        <span className="book-display text-bone text-2xl md:text-4xl font-normal tracking-tight">
          {label}
        </span>

        {/* dot leaders */}
        <span
          className="flex-1 mx-2 mb-1 self-end text-stone overflow-hidden whitespace-nowrap"
          style={{ letterSpacing: 4, lineHeight: 1 }}
        >
          ····················································································
        </span>

        <span className="font-mono text-xs tracking-widest text-stone group-hover:text-bone transition-colors">
          p. {page}
        </span>

        {/* arrow appears on hover */}
        <motion.span
          variants={{
            hover: { x: 4, opacity: 1 },
          }}
          initial={{ x: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="book-display text-bone ml-1 text-2xl"
        >
          →
        </motion.span>

        {/* index number for stagger reveal would go here in fancier version */}
        {void index}
      </motion.button>
    </li>
  );
}

/* ========== margin note (handwritten pencil annotation) ========== */
function MarginNote({
  text,
  sub,
  className,
  href,
  scrollTo,
}: {
  text: string;
  sub?: string;
  className?: string;
  /** External link (opens in new tab) */
  href?: string;
  /** Internal scroll target id (e.g. "contact") */
  scrollTo?: string;
}) {
  const isInteractive = !!href || !!scrollTo;

  const content = (
    <>
      <div className="hand text-bone/80 text-xl leading-tight group-hover:text-bone transition-colors">
        {text}
      </div>
      {sub && (
        <div className="font-mono text-[9px] tracking-widest uppercase text-stone/70 mt-1 group-hover:text-stone transition-colors">
          {sub}
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`group block cursor-pointer ${className ?? ""}`}
      >
        {content}
      </a>
    );
  }
  if (scrollTo) {
    return (
      <button
        onClick={() =>
          document
            .getElementById(scrollTo)
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className={`group block cursor-pointer text-left ${className ?? ""}`}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={`pointer-events-none ${className ?? ""}`}>
      {content}
      {void isInteractive}
    </div>
  );
}
