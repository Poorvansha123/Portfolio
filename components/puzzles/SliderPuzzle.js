"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";

export default function SliderPuzzle({ onClose }) {
  const { unlockSection } = useGame();
  const [values, setValues] = useState({ r: 50, g: 50, b: 50 });
  const [result, setResult] = useState(null);

  // Target: make the color match neon green (#39FF14) → r≈57, g≈255, b≈20
  // We'll accept ranges: r: 20-80, g: 220-255, b: 0-50
  const targetHint = "Mix the sliders to create a NEON GREEN color!";

  const currentColor = `rgb(${Math.round(values.r * 2.55)}, ${Math.round(
    values.g * 2.55
  )}, ${Math.round(values.b * 2.55)})`;

  const checkColor = () => {
    const r = values.r;
    const g = values.g;
    const b = values.b;

    // Neon green: low red, high green, low blue
    if (r < 35 && g > 80 && b < 30) {
      setResult("correct");
      setTimeout(() => {
        unlockSection("experience");
        onClose();
      }, 1500);
    } else {
      setResult("wrong");
      setTimeout(() => setResult(null), 1500);
    }
  };

  return (
    <div>
      <p className="text-gray-300 mb-2 text-sm">{targetHint}</p>
      <p className="text-gray-500 mb-4 text-xs font-mono">
        Hint: Think low red, HIGH green, low blue
      </p>

      {/* Color preview */}
      <div
        className="w-full h-20 rounded-lg mb-6 border border-dark-600 transition-colors"
        style={{ backgroundColor: currentColor }}
      />

      {/* Sliders */}
      <div className="space-y-4 mb-6">
        {[
          { key: "r", label: "Red", color: "#ff4444" },
          { key: "g", label: "Green", color: "#39FF14" },
          { key: "b", label: "Blue", color: "#4444ff" },
        ].map(({ key, label, color }) => (
          <div key={key}>
            <div className="flex justify-between mb-1">
              <span
                className="text-xs font-mono"
                style={{ color }}
              >
                {label}
              </span>
              <span className="text-xs font-mono text-gray-500">
                {values[key]}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={values[key]}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  [key]: parseInt(e.target.value),
                }))
              }
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #1a1a2e ${100 - values[key]}%, ${color} ${values[key]}%)`,
                accentColor: color,
              }}
            />
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={checkColor}
        className="w-full py-3 rounded-lg bg-neon-green/20 border border-neon-green/50 text-neon-green font-mono text-sm hover:bg-neon-green/30 transition-colors cursor-pointer"
      >
        Check Color
      </motion.button>

      {result === "correct" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-neon-green text-sm font-mono text-center"
        >
          That&apos;s neon green! Unlocking...
        </motion.p>
      )}
      {result === "wrong" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-red-400 text-sm font-mono text-center"
        >
          Not quite the right shade. Keep mixing!
        </motion.p>
      )}
    </div>
  );
}
