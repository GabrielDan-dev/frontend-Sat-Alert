/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        space: {
          bg: "#0a0f1e",
          card: "#0f172a",
          border: "#1e293b",
        },
        primary: { DEFAULT: "#00d4ff", glow: "#22d3ee" },
        secondary: { DEFAULT: "#22c55e" },
        sev: {
          critico: "#ef4444",
          alto: "#f97316",
          medio: "#eab308",
          baixo: "#22c55e",
        },
        text: { DEFAULT: "#f1f5f9", muted: "#94a3b8" },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: "0 0 30px rgba(0, 212, 255, 0.25)",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(0,212,255,0.35)" },
          "50%": { boxShadow: "0 0 0 16px rgba(0,212,255,0)" },
        },
      },
    },
  },
  plugins: [],
};
