import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import ContactSection from "@/components/ContactSection";
import { sanityFetch, FEATURED_PROJECTS_QUERY, SITE_SETTINGS_QUERY, PROFILE_QUERY, CACHE_TAGS } from "@/lib/sanity";
import { ProjectEntry, SiteSettings, ProfileContent } from "@/types";

export const metadata: Metadata = {
  title: "Home",
  description: "Personal portfolio — design and development work.",
};

const HIGHLIGHTS = [
  { label: "Design", detail: "Clean interfaces built with intent and clarity." },
  { label: "Development", detail: "Performant, accessible, maintainable code." },
  { label: "Delivery", detail: "From concept to production without shortcuts." },
  { label: "Collaboration", detail: "Transparent process, no surprises." },
];

export default async function HomePage() {
  const [projects, settings, profile] = await Promise.all([
    sanityFetch<ProjectEntry[]>(FEATURED_PROJECTS_QUERY, [CACHE_TAGS.projects]).catch(() => []),
    sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY, [CACHE_TAGS.settings]).catch(() => null),
    sanityFetch<ProfileContent>(PROFILE_QUERY, [CACHE_TAGS.profile]).catch(() => null),
  ]);

  return (
    <>
      <HeroSection
        name={profile?.name}
        headline={profile?.headline}
        description={profile?.bio}
        tagline={settings?.siteDescription}
        socialLinks={profile?.socialLinks}
      />

      {/* Intro */}
      <section className="section-padding bg-surface-muted" aria-label="Introduction">
        <div className="container-content">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* Left — text */}
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-600">
                About
              </p>
              <h2 className="mb-5 text-3xl font-bold text-ink sm:text-4xl">
                Craft meets purpose.
              </h2>
              <p className="mb-4 text-lg leading-relaxed text-ink-muted">
                {profile?.bio
                  ? profile.bio
                  : "I build websites and web applications with a focus on clean code, thoughtful design, and measurable outcomes."}
              </p>
              <p className="text-base leading-relaxed text-ink-muted">
                Every project gets the same attention — whether it is a landing page or a full-scale
                web application. The goal is always the same: something that works beautifully and
                holds up over time.
              </p>
            </div>

            {/* Right — highlight grid */}
            <div className="grid grid-cols-2 gap-4">
              {HIGHLIGHTS.map(({ label, detail }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-surface-border bg-surface p-5 transition-shadow duration-200 hover:shadow-sm"
                >
                  <p className="mb-1 font-semibold text-ink">{label}</p>
                  <p className="text-sm leading-relaxed text-ink-muted">{detail}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <FeaturedProjects projects={projects} />
      <ContactSection />
    </>
  );
}
