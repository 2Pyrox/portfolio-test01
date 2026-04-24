import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import ContactSection from "@/components/ContactSection";
import { sanityFetch, FEATURED_PROJECTS_QUERY, SITE_SETTINGS_QUERY, CACHE_TAGS } from "@/lib/sanity";
import { ProjectEntry, SiteSettings } from "@/types";

export const metadata: Metadata = {
  title: "Home",
  description: "Personal portfolio — design and development work.",
};

export default async function HomePage() {
  const [projects, settings] = await Promise.all([
    sanityFetch<ProjectEntry[]>(FEATURED_PROJECTS_QUERY, [CACHE_TAGS.projects]).catch(() => []),
    sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY, [CACHE_TAGS.settings]).catch(() => null),
  ]);

  const tagline = settings?.siteDescription ?? undefined;

  return (
    <>
      <HeroSection tagline={tagline} />

      <section className="section-padding bg-surface" aria-label="Introduction">
        <div className="container-content">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-600">
              Intro
            </p>
            <h2 className="mb-6 text-3xl font-bold text-ink sm:text-4xl">
              Craft meets purpose.
            </h2>
            <p className="text-lg leading-relaxed text-ink-muted">
              I build websites and web applications with a focus on clean code,
              thoughtful design, and measurable outcomes. Every project is an
              opportunity to make something genuinely useful.
            </p>
          </div>
        </div>
      </section>

      <FeaturedProjects projects={projects} />
      <ContactSection />
    </>
  );
}
