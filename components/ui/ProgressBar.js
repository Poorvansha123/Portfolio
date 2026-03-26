"use client";

import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";

export default function ProgressBar() {
  const { progressPercent, unlockedCount, totalSections } = useGame();

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass px-6 py-3"
    >
      <div className="max-w-5xl mx-auto flex items-center gap-4">
        <span className="text-xs font-mono text-neon-green whitespace-nowrap">
          PORTFOLIO PROGRESS
        </span>
        <div className="flex-1 h-2 bg-dark-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #39FF14, #00F0FF, #BF40FF)",
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <span className="text-xs font-mono text-gray-400 whitespace-nowrap">
          {unlockedCount}/{totalSections} ({progressPercent}%)
        </span>
      </div>
    </motion.div>
  );
}
