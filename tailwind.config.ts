import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f6f7f9",
          100: "#eceef2",
          200: "#d5dae2",
          300: "#b1bac8",
          400: "#8694a9",
          500: "#677790",
          600: "#525f77",
          700: "#434e61",
          800: "#232a38",
          900: "#161c28",
          950: "#0e1219",
        },
        brand: {
          50: "#eef6ff",
          100: "#d9eaff",
          500: "#2b6cb0",
          600: "#245a94",
          700: "#1d4a7a",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
