"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { ProjectEntry } from "@/types";

interface ProjectGridProps {
  projects: ProjectEntry[];
}

const ALL_LABEL = "All";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeTag, setActiveTag] = useState<string>(ALL_LABEL);

  // Derive unique tags from all projects, preserving insertion order
  const allTags = useMemo<string[]>(() => {
    const seen = new Set<string>();
    projects.forEach((p) => p.tags?.forEach((t) => seen.add(t)));
    return [ALL_LABEL, ...Array.from(seen)];
  }, [projects]);

  const filtered = useMemo<ProjectEntry[]>(
    () =>
      activeTag === ALL_LABEL
        ? projects
        : projects.filter((p) => p.tags?.includes(activeTag)),
    [projects, activeTag]
  );

  return (
    <div className="flex flex-col gap-10">
      {/* Filter bar */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by tag"
      >
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            aria-pressed={activeTag === tag}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-150 ${
              activeTag === tag
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-surface-border bg-surface text-ink-muted hover:border-brand-300 hover:text-ink"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.ul
        className="grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3"
        layout
        aria-live="polite"
        aria-label="Project grid"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.li
              key={project._id}
              layout
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={i}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.li
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-16 text-center text-ink-muted"
          >
            No projects found for &ldquo;{activeTag}&rdquo;.
          </motion.li>
        )}
      </motion.ul>
    </div>
  );
}
