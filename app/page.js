"use client";

import { useGame } from "@/context/GameContext";
import ParticleBackground from "@/components/ui/ParticleBackground";
import ProgressBar from "@/components/ui/ProgressBar";
import UnlockNotification from "@/components/ui/UnlockNotification";
import Landing from "@/components/landing/Landing";
import Projects from "@/components/projects/Projects";
import Skills from "@/components/skills/Skills";
import Experience from "@/components/experience/Experience";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/ui/Footer";

export default function Home() {
  const { isLoaded } = useGame();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-neon-green font-mono text-sm animate-pulse">
          Loading portfolio...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-dark-900 grid-bg noise-overlay relative">
      <ParticleBackground />
      <ProgressBar />
      <UnlockNotification />

      <div className="relative z-10">
        <Landing />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
