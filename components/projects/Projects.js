"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SectionLock from "@/components/ui/SectionLock";
import CodePuzzle from "@/components/puzzles/CodePuzzle";
import { jsPuzzle } from "@/lib/puzzles";
import ProjectDetails from "@/components/projects/ProjectDetails";

const projects = [
  {
    id: "storefront",
    title: "Storefront System",
    description:
      "A CMS-driven, multi-theme e-commerce storefront with dynamic rendering, component factories, and full checkout flow.",
    tags: ["Next.js", "React", "Tailwind", "Context API"],
    emoji: "🛍️",
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    description:
      'Yes, the one you\'re currently unlocking! A gamified portfolio where you solve puzzles to explore sections.',
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    emoji: "🎮",
  },
];

function JsPuzzleWrapper({ onClose }) {
  return <CodePuzzle puzzle={jsPuzzle} sectionId="projects" onClose={onClose} />;
}

function ProjectCard({ project, onViewDetails }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="glass rounded-xl p-6 flex flex-col"
    >
      <div className="text-4xl mb-4">{project.emoji}</div>
      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
      <p className="text-gray-400 text-sm mb-4 flex-1">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-dark-700 rounded text-neon-blue font-mono text-[10px]"
          >
            {tag}
          </span>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onViewDetails(project.id)}
        className="w-full py-2.5 rounded-lg border border-neon-purple/50 text-neon-purple font-mono text-sm hover:bg-neon-purple/10 transition-colors cursor-pointer"
      >
        🔓 Unlock Details
      </motion.button>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects-section" className="py-20 px-6">
      <SectionLock
        sectionId="projects"
        title="Projects"
        puzzleComponent={JsPuzzleWrapper}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              <span className="text-neon-green">~/</span>projects
            </h2>
            <p className="text-gray-500 font-mono text-sm">
              Things I&apos;ve built with passion
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={setSelectedProject}
              />
            ))}
          </div>

          {selectedProject && (
            <ProjectDetails
              projectId={selectedProject}
              onBack={() => setSelectedProject(null)}
            />
          )}
        </div>
      </SectionLock>
    </section>
  );
}
