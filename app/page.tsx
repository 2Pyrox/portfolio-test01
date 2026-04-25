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

const PILLARS = [
  { index: "01", label: "Design",        detail: "Interfaces built with intent. Every pixel earns its place." },
  { index: "02", label: "Development",   detail: "Clean, performant, maintainable — no shortcuts." },
  { index: "03", label: "Delivery",      detail: "Concept to production. On time, without compromise." },
  { index: "04", label: "Craft",         detail: "The work is not done until it is genuinely good." },
];

export default async function HomePage() {
  const [projects, settings, profile] = await Promise.all([
    sanityFetch<ProjectEntry[]>(FEATURED_PROJECTS_QUERY, [CACHE_TAGS.projects]).catch(() => []),
    sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY, [CACHE_TAGS.settings]).catch(() => null),
    sanityFetch<ProfileContent>(PROFILE_QUERY, [CACHE_TAGS.profile]).catch(() => null),
  ]);

  const bio = profile?.bio ?? "I build websites and web applications with a focus on clean code, thoughtful design, and measurable outcomes. Every project is an opportunity to make something genuinely useful.";

  return (
    <>
      <HeroSection
        name={profile?.name}
        headline={profile?.headline}
        description={bio}
        tagline={settings?.siteDescription}
        socialLinks={profile?.socialLinks}
      />

      {/* Intro — dark two-column */}
      <section className="section-padding" style={{ backgroundColor: "#101012" }} aria-label="Introduction">
        <div className="container-content">

          {/* Top rule */}
          <div className="mb-16 rule-gold" />

          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-start">

            {/* Left — bio text */}
            <div>
              <p className="label-overline mb-6">About</p>
              <h2
                className="mb-8 font-bold leading-tight tracking-tight"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#f2efe9" }}
              >
                Craft meets purpose.
              </h2>
              <p className="mb-6 text-base leading-[1.9]" style={{ color: "#7a7874" }}>
                {bio}
              </p>
              <p className="text-sm leading-[1.9]" style={{ color: "#3a3836" }}>
                Every project gets the same attention — whether it is a landing page or a full-scale
                web application. The goal is always the same: something that works and holds up over time.
              </p>
            </div>

            {/* Right — pillars */}
            <div className="space-y-0">
              {PILLARS.map(({ index, label, detail }, i) => (
                <div
                  key={label}
                  className="group flex items-start gap-6 py-6 transition-all duration-200"
                  style={{
                    borderBottom: i < PILLARS.length - 1 ? "1px solid #1a1a1e" : "none",
                  }}
                >
                  <span
                    className="shrink-0 pt-0.5 text-xs font-mono tracking-widest"
                    style={{ color: "rgba(201,169,110,0.4)" }}
                  >
                    {index}
                  </span>
                  <div>
                    <p
                      className="mb-1 text-sm font-semibold uppercase tracking-wider transition-colors duration-200 group-hover:text-[#c9a96e]"
                      style={{ color: "#f2efe9", letterSpacing: "0.1em" }}
                    >
                      {label}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "#7a7874" }}>
                      {detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Bottom rule */}
          <div className="mt-16 rule-gold" />

        </div>
      </section>

      <FeaturedProjects projects={projects} />
      <ContactSection />
    </>
  );
}
