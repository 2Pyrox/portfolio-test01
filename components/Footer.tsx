import Link from "next/link";
import PlaceholderLogo from "./PlaceholderLogo";
import { SiteSettings } from "@/types";

interface FooterProps {
  settings: SiteSettings | null;
}

const currentYear = new Date().getFullYear();

export default function Footer({ settings }: FooterProps) {
  const socials = settings?.socialLinks ?? [];

  return (
    <footer className="border-t border-surface-border bg-surface-muted">
      <div className="container-content flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <PlaceholderLogo size={28} />
          <span className="text-sm font-semibold text-ink">Portfolio</span>
        </Link>

        {/* Social links */}
        {socials.length > 0 && (
          <nav className="flex items-center gap-4" aria-label="Social links">
            {socials.map(({ platform, url }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-ink-muted hover:text-ink transition-colors duration-150"
              >
                {platform}
              </a>
            ))}
          </nav>
        )}

        {/* Copyright */}
        <p className="text-xs text-ink-subtle">
          &copy; {currentYear}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
