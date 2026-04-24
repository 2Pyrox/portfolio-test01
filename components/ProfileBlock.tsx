"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ProfileContent } from "@/types";
import { urlFor } from "@/lib/sanity";

interface ProfileBlockProps {
  profile: ProfileContent;
}

export default function ProfileBlock({ profile }: ProfileBlockProps) {
  const imgSrc = urlFor(profile.avatar).width(640).height(640).fit("crop").url();

  return (
    <section
      className="section-padding bg-surface"
      aria-labelledby="profile-heading"
    >
      <div className="container-content">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="shrink-0"
          >
            <div className="relative h-64 w-64 overflow-hidden rounded-2xl shadow-lg sm:h-72 sm:w-72 lg:h-80 lg:w-80">
              <Image
                src={imgSrc}
                alt="Profile photo"
                fill
                sizes="(max-width: 1024px) 18rem, 20rem"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col gap-4 text-center lg:text-left"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
              About
            </p>
            <h1
              id="profile-heading"
              className="text-3xl font-bold text-ink sm:text-4xl"
            >
              {profile.name}
            </h1>
            <p className="text-base font-medium text-brand-600">{profile.headline}</p>
            <p className="max-w-prose text-base leading-relaxed text-ink-muted whitespace-pre-line">
              {profile.bio}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
