"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useGame } from "@/context/GameContext";

export default function SectionLock({
  sectionId,
  title,
  puzzleComponent: PuzzleComponent,
  children,
}) {
  const { isSectionUnlocked, recentUnlock } = useGame();
  const [showPuzzle, setShowPuzzle] = useState(false);
  const unlocked = isSectionUnlocked(sectionId);
  const justUnlocked = recentUnlock === sectionId || recentUnlock === "all";

  if (unlocked) {
    return (
      <AnimatePresence>
        <motion.div
          initial={justUnlocked ? { scale: 0.95, opacity: 0 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {justUnlocked && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-center mb-6"
            >
              <span className="text-neon-green font-mono text-sm">
                Nice! You just unlocked {title}!
              </span>
            </motion.div>
          )}
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="relative">
      {/* Locked overlay */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass rounded-2xl p-12 text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          🔒
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-6 font-mono text-sm">
          This section is locked. Solve the puzzle to unlock it!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowPuzzle(true)}
          className="px-6 py-3 bg-dark-600 border border-neon-green/50 rounded-lg text-neon-green font-mono text-sm hover:bg-neon-green/10 transition-colors cursor-pointer"
        >
          Attempt Puzzle
        </motion.button>
      </motion.div>

      {/* Puzzle Modal */}
      <AnimatePresence>
        {showPuzzle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowPuzzle(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass rounded-2xl p-8 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-neon-green font-mono">
                  Unlock: {title}
                </h3>
                <button
                  onClick={() => setShowPuzzle(false)}
                  className="text-gray-500 hover:text-white text-xl cursor-pointer"
                >
                  x
                </button>
              </div>
              <PuzzleComponent onClose={() => setShowPuzzle(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
