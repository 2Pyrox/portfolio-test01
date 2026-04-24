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
          50: "#f0f4ff",
          100: "#dde6ff",
          200: "#c2d0ff",
          300: "#9db0ff",
          400: "#7585ff",
          500: "#5560f0",
          600: "#4044e5",
          700: "#3535cb",
          800: "#2c2ea4",
          900: "#292d82",
          950: "#191a4e",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f8f9fb",
          border: "#e4e7ed",
        },
        ink: {
          DEFAULT: "#111318",
          muted: "#6b7280",
          subtle: "#9ca3af",
        },
      },
      spacing: {
        section: "6rem",
        "section-sm": "4rem",
      },
      maxWidth: {
        content: "1280px",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
