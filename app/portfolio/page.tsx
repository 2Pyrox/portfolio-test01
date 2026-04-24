import type { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";
import { sanityFetch, ALL_PROJECTS_QUERY, CACHE_TAGS } from "@/lib/sanity";
import { ProjectEntry } from "@/types";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "A full collection of projects across design and development.",
};

export default async function PortfolioPage() {
  const projects = await sanityFetch<ProjectEntry[]>(
    ALL_PROJECTS_QUERY,
    [CACHE_TAGS.projects]
  ).catch(() => []);

  return (
    <div className="pt-16">
      <section className="section-padding bg-surface-muted">
        <div className="container-content">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-600">
            Work
          </p>
          <h1 className="mb-4 text-4xl font-bold text-ink sm:text-5xl">Portfolio</h1>
          <p className="max-w-xl text-lg leading-relaxed text-ink-muted">
            A collection of projects I have designed, built, or contributed to.
            Use the filters to explore by technology or discipline.
          </p>
        </div>
      </section>

      <section className="section-padding bg-surface" aria-label="All projects">
        <div className="container-content">
          {projects.length === 0 ? (
            <p className="py-16 text-center text-ink-muted">
              Projects are on their way. Check back soon.
            </p>
          ) : (
            <ProjectGrid projects={projects} />
          )}
        </div>
      </section>
    </div>
  );
}
