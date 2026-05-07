"use client";

import { useState } from "react";
import { CursorTrail } from "./components/CursorTrail";
import { Hero } from "./components/Hero";
import { HobbySection } from "./components/HobbySection";
import { ProjectModal } from "./components/ProjectModal";
import { ProjectsBento } from "./components/ProjectsBento";
import {
  AboutSection,
  ContactSection,
  ExperiencesSection,
} from "./components/Sections";
import { type Project } from "@/lib/projects";

export default function Home() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <main className="relative">
      <CursorTrail />
      <Hero />
      <AboutSection />
      <ProjectsBento onSelect={setActive} />
      <ExperiencesSection />
      <HobbySection />
      <ContactSection />
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </main>
  );
}
