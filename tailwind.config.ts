import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // ── Brand ──────────────────────────────────────────────────────────
        primary: {
          DEFAULT: "#16A34A",
          hover: "#15803D",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#84CC16",
          foreground: "#111827",
        },
        highlight: {
          DEFAULT: "#FACC15",
        },
        // ── Surfaces ───────────────────────────────────────────────────────
        background: "#FFFFFF",
        surface: "#F8FAFC",
        // ── Foreground ─────────────────────────────────────────────────────
        foreground: "#111827",
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#6B7280",
        },
        // ── Borders ────────────────────────────────────────────────────────
        border: "#E5E7EB",
        input: "#E5E7EB",
        ring: "#16A34A",
        // ── Shadcn card / popover ──────────────────────────────────────────
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#111827",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#111827",
        },
        // ── Status ─────────────────────────────────────────────────────────
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F1F5F9",
          foreground: "#111827",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        // Design system radii
        sm: "4px",
        DEFAULT: "8px",
        md: "8px",
        lg: "12px",   // buttons, inputs
        xl: "16px",
        "2xl": "20px", // cards, sections
        "3xl": "24px",
        full: "9999px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
