"use client";

import { motion } from "framer-motion";
import SectionLock from "@/components/ui/SectionLock";
import DragMatchPuzzle from "@/components/puzzles/DragMatchPuzzle";

const skills = [
  { name: "JavaScript", level: 90, color: "#FFE600" },
  { name: "React", level: 88, color: "#61DAFB" },
  { name: "Next.js", level: 85, color: "#ffffff" },
  { name: "Tailwind CSS", level: 90, color: "#38BDF8" },
  { name: "Styled Components", level: 80, color: "#DB7093" },
  { name: "Context API", level: 85, color: "#BF40FF" },
  { name: "API Handling", level: 82, color: "#39FF14" },
];

function SkillBar({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-sm text-gray-300 group-hover:text-white transition-colors">
          {skill.name}
        </span>
        <span
          className="font-mono text-xs"
          style={{ color: skill.color }}
        >
          {skill.level}%
        </span>
      </div>
      <div className="h-2.5 bg-dark-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: skill.color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

function MatchPuzzleWrapper({ onClose }) {
  return <DragMatchPuzzle onClose={onClose} />;
}

export default function Skills() {
  return (
    <section id="skills-section" className="py-20 px-6">
      <SectionLock
        sectionId="skills"
        title="Skills"
        puzzleComponent={MatchPuzzleWrapper}
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              <span className="text-neon-green">~/</span>skills
            </h2>
            <p className="text-gray-500 font-mono text-sm">
              My technical toolkit
            </p>
          </motion.div>

          <div className="space-y-5">
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} />
            ))}
          </div>

          {/* Skill cards grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {skills.map((skill, i) => (
              <motion.div
                key={`card-${skill.name}`}
                whileHover={{ scale: 1.05, y: -3 }}
                className="glass rounded-xl p-4 text-center cursor-default"
                style={{
                  borderColor: `${skill.color}20`,
                  borderWidth: 1,
                }}
              >
                <div
                  className="w-3 h-3 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: skill.color }}
                />
                <span className="font-mono text-xs text-gray-300">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionLock>
    </section>
  );
}
