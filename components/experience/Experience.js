"use client";

import { motion } from "framer-motion";
import SectionLock from "@/components/ui/SectionLock";
import SliderPuzzle from "@/components/puzzles/SliderPuzzle";

function SliderPuzzleWrapper({ onClose }) {
  return <SliderPuzzle onClose={onClose} />;
}

export default function Experience() {
  return (
    <section id="experience-section" className="py-20 px-6">
      <SectionLock
        sectionId="experience"
        title="Experience"
        puzzleComponent={SliderPuzzleWrapper}
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              <span className="text-neon-green">~/</span>experience
            </h2>
            <p className="text-gray-500 font-mono text-sm">
              Where I&apos;ve leveled up
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-neon-green via-neon-blue to-neon-purple" />

            {/* Experience card */}
            <div className="pl-12 relative">
              {/* Dot */}
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute left-2.5 top-6 w-3 h-3 bg-neon-green rounded-full"
              />

              <div className="glass rounded-xl p-6">
                {/* Header */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h3 className="text-xl font-bold text-white">
                    Frontend Developer Intern
                  </h3>
                  <span className="px-2 py-0.5 bg-neon-green/10 border border-neon-green/30 rounded-full text-neon-green font-mono text-xs">
                    8 months full-time
                  </span>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Developed and optimized theme-based UI components in a
                    multi-tenant e-commerce platform, enabling dynamic rendering
                    of storefronts using shared layouts. Worked extensively with
                    React, Next.js, and component-driven architecture to improve
                    scalability and maintainability.
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Focused on performance optimization, reusable UI systems, and
                    seamless user experience across multiple themes. Collaborated
                    with backend teams and designers to deliver consistent and
                    high-quality features.
                  </p>
                </div>

                {/* Tech used */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "React",
                    "Next.js",
                    "Tailwind CSS",
                    "Styled Components",
                    "Context API",
                    "Component Factory Pattern",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-dark-700 rounded text-neon-blue font-mono text-[10px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { label: "Components Built", value: "50+", icon: "🧩" },
                    { label: "Themes Supported", value: "Multi", icon: "🎨" },
                    { label: "Duration", value: "8 months", icon: "⏱️" },
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      whileHover={{ scale: 1.05 }}
                      className="bg-dark-700 rounded-lg p-3 text-center cursor-default"
                    >
                      <div className="text-xl mb-1">{stat.icon}</div>
                      <div className="text-white font-bold text-lg">
                        {stat.value}
                      </div>
                      <div className="text-gray-500 font-mono text-[10px]">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionLock>
    </section>
  );
}
