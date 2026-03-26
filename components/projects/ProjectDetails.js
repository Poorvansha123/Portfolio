"use client";

import { motion } from "framer-motion";
import SectionLock from "@/components/ui/SectionLock";
import CodePuzzle from "@/components/puzzles/CodePuzzle";
import { reactPuzzle } from "@/lib/puzzles";

function ReactPuzzleWrapper({ onClose }) {
  return (
    <CodePuzzle puzzle={reactPuzzle} sectionId="projectDetails" onClose={onClose} />
  );
}

const storefrontContent = {
  title: "Storefront System",
  emoji: "🛍️",
  sections: [
    {
      heading: "Problem",
      content:
        "Building a scalable e-commerce storefront that supports multiple themes and dynamic layouts while maintaining clean architecture and separation of concerns.",
    },
    {
      heading: "Approach",
      content:
        "I built a CMS-driven, multi-theme e-commerce storefront using Next.js 14, React 18, Tailwind CSS, and Context API. The architecture has a clear separation of concerns across layers.",
    },
    {
      heading: "Architecture",
      content:
        "At the top, each page is just an orchestrator — it reads a layout configuration, fetches the relevant mock data, and passes everything to a Main component. Pages have zero UI code.\n\nMain goes through a MainContainer that transforms the layout data, then MainUI loops over the layouts array. For each layout, it renders a SectionHeading if it's a collection type — the heading checks a loadMoreType field, and if it's SEEALL, it renders a 'View All' link that encodes the collection metadata into URL query params and links to the products page. Then it calls a LayoutComponent which resolves the current theme's Component Factory.\n\nThe Component Factory is the core pattern — it's a switch statement that maps layout names to React components. Each theme has its own factory, so the same layout name renders completely different UIs. All components are lazy-loaded using next/dynamic for code splitting.",
    },
    {
      heading: "State Management",
      content:
        "State management uses 5 Context providers — Theme, User, Cart, Address, and Order. Cart and Order persist to localStorage so they survive page refresh. The checkout flow reads from Cart, Address, and Order contexts simultaneously. When an order is placed, OrderProvider creates the order object, CartProvider clears the cart, and the user is redirected to the success page.",
    },
    {
      heading: "URL-Driven Filtering",
      content:
        "Filtering and search are entirely URL-driven. When a user applies a filter on the category page, the URL updates with encoded query params. The page watches the URL with useEffect, re-filters the product data, and re-renders. This makes filters shareable and bookmarkable.",
    },
    {
      heading: "Composable Layouts",
      content:
        "The product detail page creates two layouts in its pageData — the main product info and a recommended products collection below it, filtered by same category. This shows how the layout system is composable — any page can stack multiple layout blocks.",
    },
    {
      heading: "Order Flow",
      content:
        "For the order flow, I have a complete lifecycle — place order on checkout, order success confirmation, order listing showing all past orders, and order details with a status timeline. Everything is mock data stored in localStorage, simulating what a real backend would provide.",
    },
  ],
};

const portfolioContent = {
  title: "This Portfolio",
  emoji: "🎮",
  sections: [
    {
      heading: "Concept",
      content:
        "A gamified portfolio where sections are initially locked and visitors must solve interactive puzzles to unlock them. This transforms a traditional portfolio into an engaging experience that showcases both my work and my creativity.",
    },
    {
      heading: "Why It Stands Out",
      content:
        "Instead of a static resume-style site, this portfolio is an interactive journey. Each puzzle tests real developer knowledge — JavaScript quirks, React concepts, tech categorization, and UI interaction. It demonstrates not just what I know, but how I think about user engagement.",
    },
    {
      heading: "Technical Highlights",
      content:
        "Built with Next.js 14 App Router, Framer Motion for animations, and a global game state managed through React Context with localStorage persistence. Every section transition is animated, progress is tracked visually, and there's even an easter egg (try clicking my name 5 times!).",
    },
    {
      heading: "Focus on Engagement",
      content:
        "The portfolio uses progressive disclosure — each unlock reveals more content and motivates the visitor to continue. Visual feedback, smooth transitions, and playful micro-interactions create a memorable experience that goes beyond a typical developer portfolio.",
    },
  ],
};

function DetailContent({ content }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{content.emoji}</span>
        <h3 className="text-2xl font-bold text-white">{content.title}</h3>
      </div>

      {content.sections.map((section, i) => (
        <motion.div
          key={section.heading}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass rounded-xl p-5"
        >
          <h4 className="text-neon-green font-mono text-sm mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-neon-green rounded-full" />
            {section.heading}
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
            {section.content}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function ProjectDetails({ projectId, onBack }) {
  const content =
    projectId === "storefront" ? storefrontContent : portfolioContent;

  return (
    <div className="mt-8">
      <SectionLock
        sectionId="projectDetails"
        title="Project Details"
        puzzleComponent={ReactPuzzleWrapper}
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onBack}
          className="mb-6 px-4 py-2 text-gray-400 font-mono text-sm hover:text-neon-green transition-colors cursor-pointer"
        >
          ← Back to projects
        </motion.button>
        <DetailContent content={content} />
      </SectionLock>
    </div>
  );
}
