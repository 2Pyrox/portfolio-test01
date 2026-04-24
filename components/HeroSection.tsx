"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface HeroSectionProps {
  tagline?: string;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function HeroSection({ tagline }: HeroSectionProps) {
  const headline = tagline ?? "Building thoughtful digital experiences.";

  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden bg-surface pt-16">
      {/* Subtle background gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-50 via-transparent to-transparent"
      />

      <div className="container-content relative z-10 py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-600"
          >
            Welcome
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-4xl font-bold leading-tight text-ink text-balance sm:text-5xl lg:text-6xl"
          >
            {headline}
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            variants={itemVariants}
            className="mb-10 max-w-xl text-lg leading-relaxed text-ink-muted"
          >
            I design and develop clean, performant websites and web applications
            that make an impression and get results.
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4"
          >
            <Link href="/portfolio" className="btn-primary">
              View My Work
            </Link>
            <Link href="/#contact" className="btn-outline">
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
