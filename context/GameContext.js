"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const GameContext = createContext();

const SECTIONS = {
  projects: { name: "Projects", order: 1 },
  projectDetails: { name: "Project Details", order: 2 },
  skills: { name: "Skills", order: 3 },
  experience: { name: "Experience", order: 4 },
};

const STORAGE_KEY = "portfolio-unlocked-sections";

export function GameProvider({ children }) {
  const [unlockedSections, setUnlockedSections] = useState({});
  const [recentUnlock, setRecentUnlock] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUnlockedSections(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
    setIsLoaded(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockedSections));
    }
  }, [unlockedSections, isLoaded]);

  const unlockSection = useCallback((sectionId) => {
    setUnlockedSections((prev) => {
      if (prev[sectionId]) return prev;
      return { ...prev, [sectionId]: true };
    });
    setRecentUnlock(sectionId);
    setTimeout(() => setRecentUnlock(null), 3000);
  }, []);

  const isSectionUnlocked = useCallback(
    (sectionId) => {
      return !!unlockedSections[sectionId];
    },
    [unlockedSections]
  );

  const unlockAll = useCallback(() => {
    const all = {};
    Object.keys(SECTIONS).forEach((key) => {
      all[key] = true;
    });
    setUnlockedSections(all);
    setRecentUnlock("all");
    setTimeout(() => setRecentUnlock(null), 3000);
  }, []);

  const resetProgress = useCallback(() => {
    setUnlockedSections({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const totalSections = Object.keys(SECTIONS).length;
  const unlockedCount = Object.keys(unlockedSections).length;
  const progressPercent = Math.round((unlockedCount / totalSections) * 100);

  return (
    <GameContext.Provider
      value={{
        unlockedSections,
        unlockSection,
        isSectionUnlocked,
        unlockAll,
        resetProgress,
        recentUnlock,
        progressPercent,
        unlockedCount,
        totalSections,
        isLoaded,
        SECTIONS,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
