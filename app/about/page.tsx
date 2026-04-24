import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProfileBlock from "@/components/ProfileBlock";
import SkillsList from "@/components/SkillsList";
import ContactSection from "@/components/ContactSection";
import { sanityFetch, PROFILE_QUERY, CACHE_TAGS } from "@/lib/sanity";
import { ProfileContent } from "@/types";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about who I am and what I do.",
};

export default async function AboutPage() {
  const profile = await sanityFetch<ProfileContent>(
    PROFILE_QUERY,
    [CACHE_TAGS.profile]
  ).catch(() => null);

  if (!profile) notFound();

  return (
    <>
      <ProfileBlock profile={profile} />
      <SkillsList skills={profile.skills} />
      <ContactSection />
    </>
  );
}
