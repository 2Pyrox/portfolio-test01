import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        brand: {
          50:  "#fdf8ec",
          100: "#f9edcc",
          200: "#f2d89a",
          300: "#e8be66",
          400: "#d4a853",
          500: "#c9a96e",
          600: "#b8892e",
          700: "#9a7024",
          800: "#7d591e",
          900: "#624419",
          950: "#2a1c08",
        },
        surface: {
          DEFAULT: "#0c0c0e",
          muted:   "#101012",
          elevated:"#161618",
          border:  "#1e1e22",
        },
        ink: {
          DEFAULT: "#f2efe9",
          muted:   "#7a7874",
          subtle:  "#3a3836",
        },
      },
      spacing: {
        section:    "7rem",
        "section-sm": "4.5rem",
      },
      maxWidth: {
        content: "1280px",
      },
      animation: {
        "fade-up":    "fadeUp 0.6s ease forwards",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%":      { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
