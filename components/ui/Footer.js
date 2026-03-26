"use client";

import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";

export default function Footer() {
  const { progressPercent, resetProgress } = useGame();

  return (
    <footer className="py-12 px-6 border-t border-dark-600">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {progressPercent === 100 ? (
            <p className="text-neon-green font-mono text-sm mb-4">
              🏆 You&apos;ve unlocked 100% of the portfolio! Achievement
              complete!
            </p>
          ) : (
            <p className="text-gray-500 font-mono text-sm mb-4">
              Keep solving puzzles to unlock more sections!
              <br />
              Progress: {progressPercent}% complete
            </p>
          )}

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={resetProgress}
              className="px-4 py-2 text-gray-600 font-mono text-xs hover:text-red-400 transition-colors cursor-pointer"
            >
              Reset Progress
            </button>
          </div>

          <p className="text-gray-600 font-mono text-xs">
            Designed & built by{" "}
            <span className="text-neon-green">Poorvansha Baliyan</span>
          </p>
          <p className="text-gray-700 font-mono text-[10px] mt-1">
            Next.js 14 + Framer Motion + Tailwind CSS
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
