"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ProjectEntry } from "@/types";
import { urlFor } from "@/lib/sanity";

interface ProjectCardProps {
  project: ProjectEntry;
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const imgSrc = urlFor(project.coverImage).width(800).height(480).fit("crop").url();

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group flex flex-col overflow-hidden"
      style={{
        backgroundColor: "#111114",
        border: "1px solid #1a1a1e",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,169,110,0.25)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "#1a1a1e";
      }}
    >
      {/* Thumbnail */}
      <a
        href={project.liveUrl ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-video w-full overflow-hidden"
        style={{ backgroundColor: "#0c0c0e" }}
        tabIndex={0}
        aria-label={`Open ${project.title}`}
      >
        <Image
          src={imgSrc}
          alt={project.coverImage.alt ?? project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "brightness(0.9)" }}
          priority={priority}
        />
        {/* Overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(to top, rgba(201,169,110,0.08), transparent)" }}
        />
      </a>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Tags */}
        {project.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-sm font-semibold leading-snug" style={{ color: "#f2efe9" }}>
          {project.title}
        </h3>

        {/* Description */}
        <p className="flex-1 text-sm leading-relaxed line-clamp-3" style={{ color: "#7a7874" }}>
          {project.summary}
        </p>

        {/* Link */}
        <a
          href={project.liveUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-150"
          style={{ color: "#c9a96e" }}
        >
          Visit Project
          <svg aria-hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
            <path fillRule="evenodd" d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </motion.article>
  );
}
