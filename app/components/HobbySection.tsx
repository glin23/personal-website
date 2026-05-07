"use client";

import { motion } from "motion/react";
import { useState } from "react";

/* ============================================================
   Off-screen — chapter III of the personal collection.
   Contact-sheet style polaroid grid: orderly, slight rotation,
   captions always readable. The one landscape photo (dawn)
   spans 2 columns as a horizontal hero.
   Photos live in /public/photos/mountain/ as 01.jpg … 05.jpg.
   ============================================================ */

type Photo = {
  src: string;
  caption: string;
  loc?: string;
  /** descriptive alt for screen readers + SEO; kept generic on purpose */
  alt: string;
  rotate: number;
  /** true = landscape, spans 2 columns + 3:2 aspect; false = portrait, 1 column + 4:5 */
  wide?: boolean;
};

const photos: Photo[] = [
  {
    src: "/photos/mountain/01.jpg",
    caption: "ice climb",
    loc: "Sichuan · winter",
    alt: "Ice climber on a frozen waterfall, holding two ice axes with crampons on the wall.",
    rotate: -2,
  },
  {
    src: "/photos/mountain/02.jpg",
    caption: "dawn push",
    loc: "headlamps · 4 a.m.",
    alt: "Hiker on an alpine ridge before sunrise, deep blue sky and a valley filled with cloud below.",
    rotate: 2,
    wide: true,
  },
  {
    src: "/photos/mountain/03.jpg",
    caption: "first light",
    loc: "the ridge",
    alt: "Hiker silhouetted against an alpine ridge at first light.",
    rotate: -3,
  },
  {
    src: "/photos/mountain/04.jpg",
    caption: "summit · 5025m",
    loc: "奥太娜 / Aoteyna",
    alt: "Climber sitting on a rock at an alpine summit with snow-capped peaks behind.",
    rotate: 2,
  },
  {
    src: "/photos/mountain/05.jpg",
    caption: "the crew",
    loc: "top of Aoteyna",
    alt: "Three climbers at an alpine summit beside Tibetan prayer flags.",
    rotate: -1,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7 },
};

export function HobbySection() {
  return (
    <section
      id="hobby"
      className="relative px-6 md:px-12 py-20 md:py-28 max-w-[1200px] mx-auto"
    >
      {/* page header bar — matches About / Projects */}
      <header className="flex items-baseline justify-between border-b border-bone/30 pb-4 mb-12">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone">
          // chapter iii · off-screen
        </div>
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone">
          p. 003
        </div>
      </header>

      {/* big section title */}
      <motion.div {...fadeUp} className="mb-2">
        <h2 className="h-display text-bone text-6xl md:text-8xl">Off-screen.</h2>
      </motion.div>

      {/* italic + hand subtitle */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="flex items-baseline gap-3 mb-14"
      >
        <span className="book-display italic text-bone/70 text-xl md:text-2xl">
          altitude over algorithms ·
        </span>
        <span className="hand text-bone/70 text-xl md:text-2xl">
          when the laptop closes
        </span>
      </motion.div>

      {/* intro: prose + field notes side by side */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="grid md:grid-cols-12 gap-10 md:gap-14 mb-20"
      >
        <div className="md:col-span-7 space-y-5">
          <p
            className="text-bone leading-[1.7]"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(16px, 1.4vw, 19px)",
            }}
          >
            When I close the laptop I head up. Long days, headlamps before
            dawn, weather that doesn&apos;t care about your roadmap.
          </p>
          <p className="hand text-bone/70 text-xl md:text-2xl leading-snug">
            Ice axes, prayer flags, the kind of quiet you can&apos;t fake.
          </p>
        </div>

        <div className="md:col-span-5">
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone mb-3">
            ↳ field notes
          </div>
          <FieldStat label="Highest" value="5,025m · 奥太娜" />
          <FieldStat label="First lead" value="ice climb · 攀冰" />
          <FieldStat label="Next" value="something with a glacier" />
        </div>
      </motion.div>

      {/* contact-sheet photo grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-14 md:gap-y-16">
        {photos.map((p, i) => (
          <Polaroid key={p.src} photo={p} index={i} />
        ))}
      </div>

      {/* footer caption */}
      <div className="mt-14 pt-6 border-t border-bone/30 flex items-baseline justify-between">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone">
          ↳ from the field journal · {photos.length} polaroids
        </div>
        <div className="book-display italic text-bone/60 text-base md:text-lg">
          more peaks soon →
        </div>
      </div>
    </section>
  );
}

/* ========== single polaroid in the grid ========== */
function Polaroid({ photo, index }: { photo: Photo; index: number }) {
  const [failed, setFailed] = useState(false);
  const wide = !!photo.wide;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: photo.rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: photo.rotate }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.65,
        delay: 0.05 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -6,
        rotate: photo.rotate * 0.4,
        scale: 1.03,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      style={{ rotate: `${photo.rotate}deg` }}
      className={wide ? "sm:col-span-2" : ""}
    >
      <div className="bg-white p-2.5 pb-7 rounded-sm shadow-[0_18px_36px_-14px_rgba(60,40,20,0.22),0_6px_16px_-6px_rgba(60,40,20,0.14)] ring-1 ring-fog/60">
        {/* photo */}
        <div
          className={`${wide ? "aspect-[3/2]" : "aspect-[4/5]"} rounded-sm relative overflow-hidden bg-[#0a0a0a]`}
        >
          {!failed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo.src}
              alt={photo.alt}
              draggable={false}
              onError={() => setFailed(true)}
              className="absolute inset-0 w-full h-full object-cover select-none"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center font-mono text-stone text-[10px] tracking-[0.18em] uppercase">
              photo {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>

        {/* caption — handwritten */}
        <div className="mt-3 px-1 text-center">
          <div className="hand text-bone text-lg md:text-xl leading-none">
            {photo.caption}
          </div>
          {photo.loc && (
            <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-stone mt-1.5">
              {photo.loc}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ========== mini stat row ========== */
function FieldStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2 border-b border-bone/15">
      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone">
        {label}
      </span>
      <span className="book-display italic text-bone text-base md:text-lg">
        {value}
      </span>
    </div>
  );
}
