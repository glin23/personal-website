"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, FormEvent } from "react";
import { internships, organizing } from "@/lib/experiences";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7 },
};

/* -----------------------------------------------------------
   ABOUT — moved up to be section 01 (right after hero)
   ----------------------------------------------------------- */
export function AboutSection() {
  return (
    <section
      id="about"
      className="relative px-6 md:px-12 py-24 md:py-28 max-w-[1400px] mx-auto"
    >
      {/* zone tint — slight cool wash so it differs from hero */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(70% 50% at 30% 50%, rgba(94, 234, 212, 0.04), transparent 70%)",
        }}
      />
      {/* page header bar */}
      <header className="flex items-baseline justify-between border-b border-bone/30 pb-4 mb-12">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone">
          // chapter i · about
        </div>
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone">
          p. 001
        </div>
      </header>

      {/* Plain-prose facts block for LLMs and screen readers.
          Visually hidden via sr-only so it doesn't compete with the
          chapter-book layout, but in the DOM and read by crawlers. */}
      <p className="sr-only">
        Lee Lin (Chinese name: 林感) is a business student at Babson College,
        Class of 2027, based in Boston, Massachusetts. He builds consumer AI
        products solo. His current projects are Resume2Web
        (resume-to-portfolio website generator at r2w.online) and Semori
        (RAG-based personal knowledge base at semori.online). He is active
        across the US and China — primarily Boston, San Francisco, and
        Beijing — and writes about AI, startups, and frontier tech.
      </p>

      <motion.div {...fadeUp} className="mb-2">
        <h2 className="h-display text-bone text-5xl md:text-7xl">
          Brief <span className="text-volt italic">intro.</span>
        </h2>
      </motion.div>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="flex items-baseline gap-3 mb-12"
      >
        <span className="book-display italic text-bone/70 text-xl md:text-2xl">
          who is this guy ·
        </span>
        <span className="hand text-bone/70 text-xl md:text-2xl">
          a quick read
        </span>
      </motion.div>

      <div className="grid md:grid-cols-12 gap-10 md:gap-14">
        {/* LEFT — sticky note + identity stats */}
        <motion.div {...fadeUp} className="md:col-span-5 space-y-10">
          {/* yellow sticky note with first-person voice */}
          <div className="relative inline-block max-w-[400px]">
            {/* tape strips at corners */}
            <span
              aria-hidden
              className="absolute -top-2 left-6 w-12 h-4 bg-tape opacity-90"
              style={{ transform: "rotate(-3deg)" }}
            />
            <span
              aria-hidden
              className="absolute -top-2 right-6 w-12 h-4 bg-tape opacity-90"
              style={{ transform: "rotate(2deg)" }}
            />
            <div
              className="paper-shadow-sm p-7 md:p-8 leading-relaxed text-bone/90"
              style={{
                background: "var(--color-stickyYellow)",
                transform: "rotate(-1.5deg)",
                fontSize: 17,
              }}
            >
              I care about shipping things that <em className="italic">actually
              get used</em> — fast iteration, real users, honest signal over
              polished slides. Always in <span className="italic">"let me try
              this"</span> mode — curious, fast hands, learning out loud.
            </div>
          </div>

          {/* stats row */}
          <div className="space-y-3">
            <Stat label="Babson College" value="Class of '27" />
            <Stat label="Based in" value="Boston, MA" />
          </div>
        </motion.div>

        {/* RIGHT — typewriter prose with doodle accents */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="md:col-span-7 space-y-10"
        >
          <p
            className="text-bone leading-[1.7]"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(18px, 1.6vw, 22px)",
            }}
          >
            I make small things <ScribbleSwirl /> fast. Some stay experiments —
            a few end up as <span className="border border-bone/40 px-2 py-0.5">products people actually use</span>.
          </p>

          <p
            className="text-bone leading-[1.7] flex items-start gap-3"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(18px, 1.6vw, 22px)",
            }}
          >
            <Sparkle className="shrink-0 mt-1" />
            <span>
              Lately, mostly <span className="border border-bone/40 px-2 py-0.5">AI</span> —
              building the kind of tools that sit quietly between you and the model, and just work.
            </span>
          </p>

          <p
            className="text-bone leading-[1.7]"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(18px, 1.6vw, 22px)",
            }}
          >
            <Stars className="inline-block mr-2 -mt-1 align-middle" />
            Off-screen: <span className="italic">hiking</span>,{" "}
            <span className="italic">coffee</span>, and{" "}
            <span className="italic">badminton</span>.
          </p>

          <p className="hand text-bone/70 text-2xl md:text-3xl pt-2">
            — currently shipping <span className="text-volt">Resume2Web</span>{" "}
            &amp; <span className="text-mist">Semori</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 pb-2 border-b border-fog/30">
      <span className="h-mono text-stone">{label}</span>
      <span className="text-bone font-medium text-sm">{value}</span>
    </div>
  );
}

/* ---------- inline hand-drawn doodle accents ---------- */
function ScribbleSwirl() {
  return (
    <svg
      width="48"
      height="22"
      viewBox="0 0 48 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block mx-1 -translate-y-1"
      aria-hidden
    >
      <path d="M3 14 Q 8 4 14 10 Q 20 18 26 8 Q 32 -2 38 12 Q 44 22 46 14" />
      <path d="M40 16 L 46 14 L 44 8" />
    </svg>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="22"
      height="28"
      viewBox="0 0 22 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M11 2 L 12.5 11 L 21 13.5 L 12.5 16 L 11 25 L 9.5 16 L 1 13.5 L 9.5 11 Z" />
      <path d="M18 22 L 19 25 M 21 23 L 18.5 24" />
    </svg>
  );
}

function Stars({ className = "" }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M5 5 L 6 9 L 10 10 L 6 11 L 5 15 L 4 11 L 0 10 L 4 9 Z" />
      <path d="M16 12 L 17 16 L 21 17 L 17 18 L 16 22 L 15 18 L 11 17 L 15 16 Z" />
    </svg>
  );
}

/* ---------- single org photo with graceful fallback ----------
   Renders at the photo's native aspect ratio so nothing gets cropped.
   When the file isn't on disk yet, a 4:3 grid-dots placeholder shows. */
function OrgPhoto({
  src,
  accent,
  index,
  alt,
}: {
  src: string;
  accent: string;
  index: number;
  alt: string;
}) {
  const [failed, setFailed] = useState(!src);

  return (
    <div className="relative rounded-lg border border-fog/60 overflow-hidden bg-pitch">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="block w-full h-auto"
        />
      ) : (
        <div className="aspect-[4/3] grid-dots flex items-center justify-center">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-stone">
            photo {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      )}
      <span
        className="absolute top-2 left-2 block w-1.5 h-1.5 rounded-full"
        style={{ background: accent }}
      />
    </div>
  );
}

/* -----------------------------------------------------------
   EXPERIENCES — split into INTERNSHIPS + ORGANIZING
   ----------------------------------------------------------- */
export function ExperiencesSection() {
  return (
    <section
      id="experiences"
      className="relative px-6 md:px-12 py-24 md:py-32 max-w-[1500px] mx-auto"
    >
      {/* zone tint */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 70% 30%, rgba(167, 139, 250, 0.04), transparent 70%)",
        }}
      />

      <motion.div {...fadeUp} className="mb-16">
        <div className="h-mono text-stone mb-2">// 03 · EXPERIENCES</div>
        <h2 className="h-display text-bone text-5xl md:text-7xl">
          Where I've <span className="text-volt">shown up.</span>
        </h2>
      </motion.div>

      {/* Experiences (co-founder + internships) */}
      <motion.div {...fadeUp} className="mb-20">
        <div className="flex items-baseline gap-4 mb-8">
          <h3 className="h-display text-bone text-2xl md:text-3xl">
            Experiences
          </h3>
          <span className="h-mono text-stone">// {internships.length} roles</span>
        </div>

        <div className="space-y-px bg-fog/40">
          {internships.map((x, i) => (
            <motion.div
              key={x.org}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="grid md:grid-cols-12 gap-4 bg-ink p-6 md:p-8 hover:bg-pitch transition-colors"
            >
              <div className="md:col-span-3">
                <div className="h-mono text-stone mb-1">{x.when}</div>
                {x.location && (
                  <div className="h-mono text-stone/70 text-[10px]">
                    {x.location}
                  </div>
                )}
              </div>
              <div className="md:col-span-3">
                <div className="text-bone text-lg font-medium">{x.org}</div>
                <div
                  className="h-mono mt-1"
                  style={{ color: x.accent }}
                >
                  {x.role}
                </div>
              </div>
              <div className="md:col-span-6 space-y-2">
                {x.bullets.map((b) => (
                  <div key={b} className="flex gap-3 text-ash text-sm leading-relaxed">
                    <span
                      className="block w-1 h-1 rounded-full shrink-0 mt-2"
                      style={{ background: x.accent }}
                    />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Organizing — events with photo slots */}
      <motion.div {...fadeUp}>
        <div className="flex items-baseline gap-4 mb-8">
          <h3 className="h-display text-bone text-2xl md:text-3xl">
            Organizing
          </h3>
          <span className="h-mono text-stone">// events + activities</span>
        </div>

        {/* Single-column editorial: each event is its own row.
             Text col-5 on the left, photos col-7 on the right.
             Each card sizes to its own content — no row-stretching. */}
        <div className="space-y-12 md:space-y-16">
          {organizing.map((e, i) => (
            <motion.div
              key={e.org}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="grid md:grid-cols-12 gap-8 md:gap-12 pt-10 border-t border-bone/30"
            >
              {/* LEFT — meta + copy */}
              <div className="md:col-span-5 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span
                    className="h-mono"
                    style={{ color: e.accent }}
                  >
                    {e.role}
                  </span>
                  <span className="h-mono text-stone">{e.when}</span>
                </div>
                <h4 className="text-bone text-2xl md:text-3xl font-semibold leading-tight pt-1">
                  {e.org}
                </h4>
                {e.location && (
                  <div className="h-mono text-stone">{e.location}</div>
                )}
                <p className="text-ash leading-relaxed pt-2">{e.description}</p>
              </div>

              {/* RIGHT — photos at native aspect, vertically stacked */}
              <div className="md:col-span-7">
                <div className="flex flex-col gap-3">
                  {(e.photos && e.photos.length > 0
                    ? e.photos
                    : [""]
                  ).map((src, j) => (
                    <OrgPhoto
                      key={j}
                      src={src}
                      accent={e.accent}
                      index={j}
                      alt={
                        e.photoAlts?.[j] ?? `${e.org} — photo ${j + 1}`
                      }
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* -----------------------------------------------------------
   CONTACT
   ----------------------------------------------------------- */
const socials = [
  {
    name: "LinkedIn",
    handle: "lee-lin-204737291",
    url: "https://www.linkedin.com/in/lee-lin-204737291",
  },
  {
    name: "Twitter",
    handle: "@lee_lin_",
    url: "https://twitter.com",
  },
  {
    name: "Xiaohongshu",
    handle: "小红书",
    url: "https://www.xiaohongshu.com",
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative px-6 md:px-12 py-24 md:py-32 max-w-[1400px] mx-auto"
    >
      {/* zone tint — warm */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, rgba(255, 79, 0, 0.05), transparent 70%)",
        }}
      />

      <motion.div {...fadeUp} className="mb-16">
        <div className="h-mono text-stone mb-2">// 05 · CONTACT</div>
        <h2 className="h-display text-bone text-6xl md:text-9xl">
          Let's <span className="text-volt">build.</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div {...fadeUp} className="space-y-6">
          <div className="h-mono text-stone">// drop me a line</div>
          <p className="text-ash max-w-md leading-relaxed">
            AI consulting, coffee in Boston, founder convos, or just want to
            say hi — leave a note below and I'll reply within a couple days.
          </p>
          <ContactForm />
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-2"
        >
          <div className="h-mono text-stone mb-4">// follow / message</div>
          <ul className="divide-y divide-fog/40 border-y border-fog/40">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between py-4 hover:px-2 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl md:text-3xl text-bone group-hover:text-volt transition-colors">
                      {s.name}
                    </span>
                    <span className="h-mono text-stone">{s.handle}</span>
                  </div>
                  <span className="text-stone group-hover:text-volt group-hover:translate-x-1 transition-all">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="rule mt-24 mb-8" />
      <div className="flex items-center justify-between">
        <span className="h-mono text-stone">© Lee Lin · 2026</span>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
   Contact form — no direct email exposure
   ----------------------------------------------------------- */
function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSending(true);
    setError(null);

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    // No key configured → fall back to the local /api/contact route (which
    // returns demo:true in development). Lets the form work locally even
    // without env vars set.
    if (!accessKey) {
      try {
        const r = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });
        const j = await r.json().catch(() => ({}));
        if (!r.ok || !j.ok) {
          setError(j.error ?? "something_went_wrong");
          setSending(false);
          return;
        }
        setSending(false);
        setSent(true);
      } catch {
        setError("network_error");
        setSending(false);
      }
      return;
    }

    // Web3Forms requires a client-side POST on the free tier. The access
    // key is public by design — it's safe to expose in the browser.
    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[lee.lin/portfolio] message from ${name}`,
          from_name: "Portfolio Contact",
          name,
          email,
          message,
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.success) {
        setError(j.message ? "send_failed" : "something_went_wrong");
        setSending(false);
        return;
      }
      setSending(false);
      setSent(true);
    } catch {
      setError("network_error");
      setSending(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-2xl border border-volt/40 bg-volt/[0.04] p-6 mt-2"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="h-mono text-volt">✓ sent</span>
            <span className="h-mono text-stone">/ delivery confirmed</span>
          </div>
          <p className="text-bone text-lg">
            Thanks, {name.split(" ")[0] || "there"}. I'll get back to you within
            a couple days.
          </p>
          <button
            onClick={() => {
              setSent(false);
              setName("");
              setEmail("");
              setMessage("");
            }}
            className="mt-4 h-mono text-stone hover:text-volt transition-colors"
          >
            ← send another
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={submit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-4 mt-4"
        >
          <FormField label="// name">
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="who's writing"
              className="w-full bg-transparent border-b border-fog/60 focus:border-volt outline-none py-3 text-bone placeholder:text-stone/60 transition-colors"
            />
          </FormField>
          <FormField label="// reply to">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@where.com"
              className="w-full bg-transparent border-b border-fog/60 focus:border-volt outline-none py-3 text-bone placeholder:text-stone/60 transition-colors"
            />
          </FormField>
          <FormField label="// message">
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="what's on your mind"
              className="w-full bg-transparent border-b border-fog/60 focus:border-volt outline-none py-3 text-bone placeholder:text-stone/60 transition-colors resize-none"
            />
          </FormField>

          <div className="flex items-center justify-between pt-2">
            <span className="h-mono text-stone">
              {sending
                ? "sending..."
                : error
                ? `error · ${error.replace(/_/g, " ")}`
                : "press enter or click send"}
            </span>
            <button
              type="submit"
              disabled={sending}
              className="group inline-flex items-center gap-3 px-5 py-3 rounded-full bg-bone text-ink font-medium border border-bone hover:bg-ink hover:text-bone transition-colors disabled:opacity-50"
            >
              <span>{sending ? "sending" : "send"}</span>
              <span className="transition-transform group-hover:translate-x-1">
                {sending ? "…" : "→"}
              </span>
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="h-mono text-stone mb-1">{label}</div>
      {children}
    </label>
  );
}
