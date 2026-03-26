"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";

export default function CodePuzzle({ puzzle, sectionId, onClose }) {
  const { unlockSection } = useGame();
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null); // 'correct' | 'wrong'

  const handleSelect = (option) => {
    if (result === "correct") return;
    setSelected(option.id);

    if (option.correct) {
      setResult("correct");
      setTimeout(() => {
        unlockSection(sectionId);
        onClose();
      }, 1500);
    } else {
      setResult("wrong");
      setTimeout(() => {
        setResult(null);
        setSelected(null);
      }, 1200);
    }
  };

  return (
    <div>
      <p className="text-gray-300 mb-3 text-sm">{puzzle.question}</p>
      <pre className="bg-dark-900 rounded-lg p-4 mb-6 text-sm font-mono text-neon-blue overflow-x-auto">
        <code>{puzzle.code}</code>
      </pre>

      <div className="space-y-3">
        {puzzle.options.map((option) => {
          let borderColor = "border-dark-600 hover:border-neon-green/50";
          if (selected === option.id) {
            if (result === "correct" && option.correct) {
              borderColor = "border-neon-green bg-neon-green/10";
            } else if (result === "wrong" && !option.correct) {
              borderColor = "border-red-500 bg-red-500/10";
            }
          }

          return (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-4 py-3 rounded-lg border font-mono text-sm transition-colors cursor-pointer ${borderColor}`}
            >
              <span className="text-gray-400 mr-3">{option.id}.</span>
              <span className="text-white">{option.text}</span>
            </motion.button>
          );
        })}
      </div>

      {result === "correct" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-lg bg-neon-green/10 border border-neon-green/30"
        >
          <p className="text-neon-green text-sm font-mono">
            Correct! {puzzle.explanation}
          </p>
        </motion.div>
      )}

      {result === "wrong" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30"
        >
          <p className="text-red-400 text-sm font-mono">
            Not quite! Try again.
          </p>
        </motion.div>
      )}
    </div>
  );
}
