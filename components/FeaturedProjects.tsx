"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { ProjectEntry } from "@/types";

interface FeaturedProjectsProps {
  projects: ProjectEntry[];
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (!projects.length) return null;

  return (
    <section className="section-padding bg-surface-muted" aria-labelledby="featured-heading">
      <div className="container-content" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
              Work
            </p>
            <h2
              id="featured-heading"
              className="text-3xl font-bold text-ink sm:text-4xl"
            >
              Featured Projects
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors duration-150 shrink-0"
          >
            View all work &rarr;
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, i) => (
            <motion.div key={project._id} variants={cardVariants}>
              <ProjectCard project={project} priority={i === 0} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
