export type Experience = {
  org: string;
  role: string;
  when: string;
  location?: string;
  bullets: string[];
  accent: string;
};

export type EventActivity = {
  org: string;
  role: string;
  when: string;
  location?: string;
  description: string;
  accent: string;
  // photo slots — Lee will fill
  photos?: string[];
  // descriptive alt text for each photo (parallel to `photos`)
  photoAlts?: string[];
};

// Internships + Co-Founder roles
export const internships: Experience[] = [
  {
    org: "COR Senior Friends",
    role: "Co-Founder",
    when: "May 2025 — Mar 2026",
    location: "Boston, MA",
    bullets: [
      "Co-founded a peer mentorship platform connecting Chinese high schoolers with US college students.",
      "Recruited 20–30 mentors across campuses; partnered with 30–50 high school student orgs to drive acquisition.",
      "Grew audience to 100+ followers; ran 3 virtual events (20–30 attendees each) and iterated on retention format.",
    ],
    accent: "#ea580c",
  },
  {
    org: "Kolect AI",
    role: "Growth & Operations Intern",
    when: "Mar — Oct 2025",
    location: "Boston, MA",
    bullets: [
      "Led early-stage market expansion via direct outreach to 15+ local merchants in Harvard Square.",
      "Co-authored the founding sales script — distilled product capabilities into plain-language value props.",
      "Mapped the merchant lifecycle in n8n; identified email sequence issues; revisions adopted by the team.",
    ],
    accent: "#a78bfa",
  },
  {
    org: "Scale Partners",
    role: "Venture Capital Summer Analyst",
    when: "May — Aug 2024",
    location: "Beijing, China",
    bullets: [
      "20+ weekly investment memos across AI, renewables, semiconductors, robotics.",
      "Drafted China photovoltaic industry deep-dive from drivers + value-chain perspectives.",
      "On-site visits and interviews with target companies alongside the investment team.",
    ],
    accent: "#5eead4",
  },
];

// Organizing / Activities (with photo slots)
export const organizing: EventActivity[] = [
  {
    org: "Babson AI Innovators Bootcamp",
    role: "Organizer & Demo Presenter",
    when: "Apr 2026",
    location: "Babson Park, MA",
    description:
      "Co-organized a full-day bootcamp for 27 small-business owners. Delivered live AI product demos and 1-on-1 coaching sessions.",
    accent: "#18181b",
    photos: ["/photos/babson/01.jpg"],
    photoAlts: [
      "Group photo of attendees and organizers at the Babson AI Innovators Bootcamp inside The Generator Interdisciplinary AI Lab.",
    ],
  },
  {
    org: "Harvard China Innovation & Investment Conference (CIIC)",
    role: "Event Operations",
    when: "Aug 2025",
    location: "Boston + Shanghai",
    description:
      "Directed on-site stage management, speaker coordination, and audio/visual production for conferences in Boston and Shanghai (300+ attendees).",
    accent: "#18181b",
    photos: ["/photos/ciic/01.jpg"],
    photoAlts: [
      "Harvard China Innovation & Investment Conference team on stage in front of the conference banner.",
    ],
  },
];
