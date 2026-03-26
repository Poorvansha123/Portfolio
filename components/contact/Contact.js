"use client";

import { motion } from "framer-motion";

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/Poorvansha123",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    color: "#ffffff",
    label: "@Poorvansha123",
  },
  {
    name: "LinkedIn",
    url: "https://in.linkedin.com/in/poorvansha-5414631bb?trk=public_profile_browsemap",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "#0A66C2",
    label: "Poorvansha",
  },
];

export default function Contact() {
  return (
    <section id="contact-section" className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            <span className="text-neon-green">~/</span>contact
          </h2>
          <p className="text-gray-500 font-mono text-sm">
            Let&apos;s connect and build something cool
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 md:p-10"
        >
          <p className="text-gray-300 text-sm leading-relaxed mb-8 text-center">
            I&apos;m always open to new opportunities, collaborations, or just a
            friendly chat about frontend development. Feel free to reach out!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {socials.map((social, i) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-4 px-6 py-4 rounded-xl border border-dark-600 bg-dark-800 hover:border-opacity-60 transition-colors group"
                style={{ "--hover-color": social.color }}
              >
                <span
                  className="text-gray-400 group-hover:text-white transition-colors"
                  style={{ color: undefined }}
                >
                  <span className="group-hover:hidden">{social.icon}</span>
                  <span
                    className="hidden group-hover:block"
                    style={{ color: social.color }}
                  >
                    {social.icon}
                  </span>
                </span>
                <div>
                  <div className="text-white font-semibold text-sm">
                    {social.name}
                  </div>
                  <div className="text-gray-500 font-mono text-xs">
                    {social.label}
                  </div>
                </div>
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-gray-400 ml-auto transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </motion.a>
            ))}
          </div>

          {/* Terminal-style CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-dark-900 rounded-lg p-4 font-mono text-sm text-center"
          >
            <span className="text-gray-500">$</span>{" "}
            <span className="text-neon-green">echo</span>{" "}
            <span className="text-gray-300">
              &quot;Thanks for visiting my portfolio!&quot;
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
