"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SkillsListProps {
  skills: string[];
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function SkillsList({ skills }: SkillsListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  if (!skills?.length) return null;

  return (
    <section
      className="section-padding bg-surface-muted"
      aria-labelledby="skills-heading"
    >
      <div className="container-content" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-10"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
            Expertise
          </p>
          <h2
            id="skills-heading"
            className="text-3xl font-bold text-ink sm:text-4xl"
          >
            Skills &amp; Tools
          </h2>
        </motion.div>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap gap-3"
          aria-label="Skills list"
        >
          {skills.map((skill) => (
            <motion.li key={skill} variants={itemVariants}>
              <span className="inline-block rounded-xl border border-surface-border bg-surface px-4 py-2 text-sm font-medium text-ink shadow-sm">
                {skill}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
