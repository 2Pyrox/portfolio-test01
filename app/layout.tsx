import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { sanityFetch, SITE_SETTINGS_QUERY, PROFILE_QUERY, CACHE_TAGS } from "@/lib/sanity";
import { SiteSettings, ProfileContent } from "@/types";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Portfolio",
    template: "%s | Portfolio",
  },
  description: "A personal portfolio showcasing design and development work.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Portfolio",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, profile] = await Promise.all([
    sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY, [CACHE_TAGS.settings]).catch(() => null),
    sanityFetch<ProfileContent>(PROFILE_QUERY, [CACHE_TAGS.profile]).catch(() => null),
  ]);

  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-dvh flex-col antialiased">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} socialLinks={profile?.socialLinks} />
      </body>
    </html>
  );
}
