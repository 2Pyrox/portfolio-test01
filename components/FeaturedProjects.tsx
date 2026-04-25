"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { ProjectEntry } from "@/types";

interface FeaturedProjectsProps { projects: ProjectEntry[]; }

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const cardVariants = {
  hidden:   { opacity: 0, y: 32 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (!projects.length) return null;

  return (
    <section
      className="section-padding"
      style={{ backgroundColor: "#0c0c0e" }}
      aria-labelledby="featured-heading"
    >
      <div className="container-content" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="label-overline mb-4">Selected Work</p>
            <h2
              id="featured-heading"
              className="font-bold leading-tight tracking-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#f2efe9" }}
            >
              Featured Projects
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="shrink-0 text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-200"
            style={{ color: "#c9a96e" }}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = "#d4b87a")}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = "#c9a96e")}
          >
            View all work &rarr;
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
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
