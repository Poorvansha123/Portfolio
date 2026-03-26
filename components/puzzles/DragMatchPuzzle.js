"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { skillMatchItems, skillCategories } from "@/lib/puzzles";

export default function DragMatchPuzzle({ onClose }) {
  const { unlockSection } = useGame();
  const [matches, setMatches] = useState({});
  const [activeItem, setActiveItem] = useState(null);
  const [result, setResult] = useState(null);

  const handleItemClick = useCallback((item) => {
    setActiveItem((prev) => (prev?.id === item.id ? null : item));
  }, []);

  const handleCategoryClick = useCallback(
    (category) => {
      if (!activeItem) return;
      setMatches((prev) => ({ ...prev, [activeItem.id]: category }));
      setActiveItem(null);
    },
    [activeItem]
  );

  const checkAnswers = () => {
    const allMatched = skillMatchItems.every((item) => matches[item.id]);
    if (!allMatched) {
      setResult("incomplete");
      setTimeout(() => setResult(null), 1500);
      return;
    }

    const allCorrect = skillMatchItems.every(
      (item) => matches[item.id] === item.category
    );

    if (allCorrect) {
      setResult("correct");
      setTimeout(() => {
        unlockSection("skills");
        onClose();
      }, 1500);
    } else {
      setResult("wrong");
      setTimeout(() => {
        setResult(null);
        setMatches({});
      }, 1500);
    }
  };

  return (
    <div>
      <p className="text-gray-300 mb-4 text-sm">
        Tap a tech, then tap its category to match them:
      </p>

      {/* Items */}
      <div className="flex flex-wrap gap-2 mb-6">
        {skillMatchItems.map((item) => {
          const isActive = activeItem?.id === item.id;
          const isMatched = !!matches[item.id];

          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleItemClick(item)}
              className={`px-3 py-2 rounded-lg font-mono text-xs border cursor-pointer transition-colors ${
                isActive
                  ? "border-neon-green bg-neon-green/20 text-neon-green"
                  : isMatched
                  ? "border-neon-blue/50 bg-neon-blue/10 text-neon-blue"
                  : "border-dark-600 text-gray-300 hover:border-gray-500"
              }`}
            >
              {item.text}
              {isMatched && (
                <span className="ml-1 text-[10px] opacity-60">
                  ({matches[item.id]})
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {skillCategories.map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleCategoryClick(cat)}
            className={`px-4 py-3 rounded-lg border font-mono text-sm text-center cursor-pointer transition-colors ${
              activeItem
                ? "border-neon-green/50 bg-neon-green/5 text-neon-green hover:bg-neon-green/10"
                : "border-dark-600 text-gray-400"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={checkAnswers}
        className="w-full py-3 rounded-lg bg-neon-green/20 border border-neon-green/50 text-neon-green font-mono text-sm hover:bg-neon-green/30 transition-colors cursor-pointer"
      >
        Check Matches
      </motion.button>

      {result === "correct" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-neon-green text-sm font-mono text-center"
        >
          Perfect matches! Unlocking Skills...
        </motion.p>
      )}
      {result === "wrong" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-red-400 text-sm font-mono text-center"
        >
          Some matches are wrong. Try again!
        </motion.p>
      )}
      {result === "incomplete" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-neon-yellow text-sm font-mono text-center"
        >
          Match all items first!
        </motion.p>
      )}
    </div>
  );
}
