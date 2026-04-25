"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "About",     href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact",   href: "/#contact" },
] as const;

export default function NavBar() {
  const pathname  = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace("/#", "/"));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[#1a1a1e] bg-[#0c0c0e]/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-content flex h-16 items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative h-9 w-9">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              sizes="36px"
              className="object-contain"
              style={{ filter: "invert(1) brightness(0.92)" }}
              priority
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`relative px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-200 ${
                isActive(href)
                  ? "text-[#c9a96e]"
                  : "text-[#7a7874] hover:text-[#f2efe9]"
              }`}
            >
              {label}
              {isActive(href) && (
                <span className="absolute bottom-0 left-4 right-4 h-px bg-[#c9a96e] opacity-60" />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex h-10 w-10 items-center justify-center text-[#7a7874] transition-colors hover:text-[#f2efe9] md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <div className="relative flex h-5 w-5 flex-col justify-between">
            <span className={`block h-px w-full bg-current transition-all duration-300 origin-center ${menuOpen ? "translate-y-2.5 rotate-45" : ""}`} />
            <span className={`block h-px w-full bg-current transition-opacity duration-200 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`block h-px w-full bg-current transition-all duration-300 origin-center ${menuOpen ? "-translate-y-2.5 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="border-t border-[#1a1a1e] bg-[#0c0c0e]/95 backdrop-blur-xl md:hidden"
          >
            <nav className="container-content flex flex-col py-4" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-2 py-3.5 text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-150 border-b border-[#1a1a1e] last:border-0 ${
                    isActive(href) ? "text-[#c9a96e]" : "text-[#7a7874] hover:text-[#f2efe9]"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
