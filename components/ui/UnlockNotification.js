"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/context/GameContext";

const messages = {
  projects: "Nice! You just unlocked Projects!",
  projectDetails: "Awesome! Project Details revealed!",
  skills: "Great matching! Skills unlocked!",
  experience: "Experience section is now open!",
  all: "CHEAT CODE ACTIVATED! Everything unlocked!",
};

export default function UnlockNotification() {
  const { recentUnlock } = useGame();

  return (
    <AnimatePresence>
      {recentUnlock && (
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.8 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 glass rounded-xl px-6 py-4 border border-neon-green/30"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              {recentUnlock === "all" ? "🏆" : "🎉"}
            </span>
            <span className="text-neon-green font-mono text-sm">
              {messages[recentUnlock] || "Section unlocked!"}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
