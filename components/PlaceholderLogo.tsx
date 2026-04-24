"use client";

interface PlaceholderLogoProps {
  className?: string;
  size?: number;
}

/**
 * Swap-ready logo component.
 * Replace the inner JSX with <Image> or an <svg> when brand assets are finalised.
 * The outer wrapper preserves layout and sizing contracts.
 */
export default function PlaceholderLogo({
  className = "",
  size = 36,
}: PlaceholderLogoProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-lg bg-brand-600 font-bold text-white select-none ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
      aria-label="Portfolio logo"
      role="img"
    >
      P
    </span>
  );
}
