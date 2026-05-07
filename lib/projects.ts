export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url?: string;
  role: string;
  period: string;
  metrics: string[];
  stack: string[];
  // visual on the cube face
  faceColor: string;     // base color when no screenshot
  faceAccent: string;    // accent stripe / border
  number: string;        // big number/name shown on face
};

export const projects: Project[] = [
  {
    id: "resume2web",
    name: "Resume2Web",
    tagline: "Resume → portfolio site in 30 seconds.",
    description:
      "AI tool that turns a resume PDF into a personalized portfolio website. Shipped from concept to MVP in 2 weeks; acquired 100+ users via self-led GTM. Iterated CTA + onboarding flow to lift completion rate ~30%.",
    url: "https://r2w.online",
    role: "Solo Builder",
    period: "Feb 2026 — Present",
    metrics: ["100+ users", "2 weeks to MVP", "+30% completion"],
    stack: ["Next.js 15", "FastAPI", "Supabase", "Claude Sonnet", "SSE streaming"],
    faceColor: "#ffffff",
    faceAccent: "#18181b",
    number: "01",
  },
  {
    id: "semori",
    name: "Semori",
    tagline: "Your scattered bookmarks. One brain.",
    description:
      "AI personal knowledge base. Ingests bookmarks from Twitter, YouTube, Xiaohongshu, RSS — organizes into searchable, semantic library. Weekly digest workflow drives re-engagement.",
    url: "https://semori.online",
    role: "Solo Builder",
    period: "Mar 2026 — Present",
    metrics: ["RAG pipeline", "Chrome extension", "Weekly digest"],
    stack: ["Next.js", "Supabase", "Vector embeddings", "Claude Haiku"],
    faceColor: "#ffffff",
    faceAccent: "#18181b",
    number: "02",
  },
];
