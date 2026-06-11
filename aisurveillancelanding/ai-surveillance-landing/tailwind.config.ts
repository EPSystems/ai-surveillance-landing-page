import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "2rem",
        lg: "2.5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        // Mirrors the CSS variables in app/globals.css — keep both in sync.
        // Hex literals (not var()) so Tailwind /alpha modifiers keep working.
        surface: {
          DEFAULT: "#0a0a0a",
          raised: "#111111",
          card: "#161616",
        },
        accent: {
          DEFAULT: "#B9FF66",
          dim: "#8fcc44",
        },
        ink: {
          DEFAULT: "#F5F5F0",
          secondary: "#999999",
          muted: "#555555",
        },
        edge: {
          DEFAULT: "#222222",
          accent: "#B9FF66",
        },
        alert: "#FF4444",
      },
      boxShadow: {
        hard: "var(--shadow-hard)",
        "hard-white": "var(--shadow-hard-white)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Narrow", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "grid-pan": {
          to: { transform: "translate3d(64px, 64px, 0)" },
        },
        scan: {
          "0%": { top: "0%" },
          "100%": { top: "100%" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0.15" },
        },
        "pulse-frame": {
          "0%, 100%": { opacity: "0.9" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        "grid-pan": "grid-pan 24s linear infinite",
        scan: "scan 7s linear infinite",
        blink: "blink 1.1s steps(1, end) infinite",
        "pulse-frame": "pulse-frame 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
