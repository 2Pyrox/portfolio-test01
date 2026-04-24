import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2024-01-01";

export const sanityClient = createClient({ projectId, dataset, apiVersion, useCdn: true });

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export const CACHE_TAGS = {
  projects: "projects",
  profile: "profile",
  settings: "settings",
} as const;

export async function sanityFetch<T>(
  query: string,
  tags: string[] = [],
  params: Record<string, unknown> = {}
): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: { tags },
  });
}

export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true] | order(order asc, publishedAt desc) [0...3] {
    _id, title, slug, summary, coverImage { ..., asset-> }, tags, liveUrl, repoUrl, featured, order, publishedAt
  }
`;

export const ALL_PROJECTS_QUERY = `
  *[_type == "project"] | order(order asc, publishedAt desc) {
    _id, title, slug, summary, coverImage { ..., asset-> }, tags, liveUrl, repoUrl, featured, order, publishedAt
  }
`;

export const PROFILE_QUERY = `
  *[_type == "profile"][0] {
    _id, name, headline, "bio": pt::text(bio), avatar { ..., asset-> }, skills,
    socialLinks[] { platform, url }
  }
`;

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    _id, siteTitle, siteDescription, navLinks[] { label, href }, footerText, contactEmail
  }
`;
