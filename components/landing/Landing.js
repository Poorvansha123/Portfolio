"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";

const techStack = [
  "JavaScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Styled Components",
  "Context API",
  "Git",
];

const hobbies = [
  { emoji: "🎤", text: "Singing" },
  { emoji: "📚", text: "Reading" },
  { emoji: "🏸", text: "Playing Badminton" },
  { emoji: "😴", text: "Sleeping" },
];

const introText =
  "I'm Poorvansha Baliyan, a frontend developer with 1+ years of experience building scalable and user-centric web applications. I enjoy turning complex problems into simple, beautiful, and intuitive designs. I love crafting clean UI, optimizing performance, and building systems that scale.";

function useTypingEffect(text, speed = 25) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setIsDone(false);
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, isDone };
}

export default function Landing() {
  const { unlockAll } = useGame();
  const [logoClicks, setLogoClicks] = useState(0);
  const { displayed: typedIntro, isDone } = useTypingEffect(introText, 20);
  const sectionRef = useRef(null);

  const handleLogoClick = () => {
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);
    if (newCount >= 5) {
      unlockAll();
      setLogoClicks(0);
    }
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById("projects-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center px-6 py-20 relative"
    >
      {/* Terminal-style header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-2 font-mono text-xs text-gray-500"
      >
        ~/portfolio $<span className="text-neon-green"> whoami</span>
      </motion.div>

      {/* Name - clickable for easter egg */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        onClick={handleLogoClick}
        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-2 cursor-pointer select-none text-center"
      >
        <span className="text-glow-green">Poorvansha</span>
      </motion.h1>

      {/* Role badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-2 mb-8"
      >
        <span className="px-3 py-1 bg-neon-green/10 border border-neon-green/30 rounded-full text-neon-green font-mono text-sm">
          SDE-1
        </span>
        <span className="text-gray-500 font-mono text-sm">
          Frontend Developer
        </span>
        {logoClicks > 0 && logoClicks < 5 && (
          <span className="text-gray-600 font-mono text-xs">
            ({5 - logoClicks} clicks to cheat)
          </span>
        )}
      </motion.div>

      {/* Typing intro */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="max-w-2xl text-center mb-10"
      >
        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
          {typedIntro}
          {!isDone && (
            <span className="inline-block w-0.5 h-4 bg-neon-green ml-0.5 animate-pulse" />
          )}
        </p>
      </motion.div>

      {/* Hobbies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="flex flex-wrap justify-center gap-3 mb-10"
      >
        {hobbies.map((hobby, i) => (
          <motion.span
            key={hobby.text}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 + i * 0.1 }}
            whileHover={{ scale: 1.1, y: -2 }}
            className="px-3 py-1.5 glass rounded-full text-sm text-gray-300 cursor-default"
          >
            {hobby.emoji} {hobby.text}
          </motion.span>
        ))}
      </motion.div>

      {/* Tech Stack Pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="flex flex-wrap justify-center gap-2 mb-12 max-w-xl"
      >
        {techStack.map((tech, i) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 + i * 0.08 }}
            whileHover={{ scale: 1.1 }}
            className="px-3 py-1.5 bg-dark-700 border border-neon-blue/20 rounded-lg text-neon-blue font-mono text-xs animate-float cursor-default"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToNext}
        className="px-8 py-4 bg-neon-green/10 border border-neon-green/50 rounded-xl text-neon-green font-mono text-sm hover:bg-neon-green/20 transition-all animate-pulse-glow cursor-pointer"
      >
        Start Exploring →
      </motion.button>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-gray-600 text-sm font-mono"
        >
          scroll down
        </motion.div>
      </motion.div>
    </section>
  );
}
