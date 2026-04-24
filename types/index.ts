export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
    url?: string;
  };
  alt?: string;
  hotspot?: { x: number; y: number };
}

export interface ProjectEntry {
  _id: string;
  title: string;
  slug: { current: string };
  summary: string;
  coverImage: SanityImage;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  order?: number;
  publishedAt: string;
}

export interface ProfileContent {
  _id: string;
  name: string;
  headline: string;
  bio: string;
  avatar: SanityImage;
  skills: string[];
  socialLinks: Array<{ platform: string; url: string }>;
}

export interface SiteSettings {
  _id?: string;
  siteTitle: string;
  siteDescription?: string;
  navLinks: Array<{ label: string; href: string }>;
  footerText?: string;
  contactEmail?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
}
