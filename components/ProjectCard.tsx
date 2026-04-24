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
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.09)" }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-surface-border bg-surface"
    >
      {/* Thumbnail */}
      <a
        href={project.liveUrl ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-video w-full overflow-hidden bg-surface-muted"
        tabIndex={0}
        aria-label={`Open ${project.title}`}
      >
        <Image
          src={imgSrc}
          alt={project.coverImage.alt ?? project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
        />
      </a>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        {/* Tags */}
        {project.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-base font-semibold text-ink leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="flex-1 text-sm leading-relaxed text-ink-muted line-clamp-3">
          {project.summary}
        </p>

        {/* Link */}
        <a
          href={project.liveUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors duration-150"
        >
          Visit Project
          <svg
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-3.5 h-3.5"
          >
            <path
              fillRule="evenodd"
              d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </motion.article>
  );
}
