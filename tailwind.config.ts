import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      grey: {
        100: "#f9fafb",
        200: "#f4f6f8",
        300: "#dfe3e8",
        400: "#c4cdd5",
        500: "#919eab",
        600: "#637381",
        700: "#454f5b",
        800: "#212b36",
        900: "#161c24",
      },
      primary: {
        darker: "#0c2b63",
        dark: "#205795",
        main: "#4095d0",
        light: "#8cd3f0",
        lighter: "#d9f6fc",
        contrastText: "#FFFFFF",
      },
      secondary: {
        lighter: "#e7e8fb",
        light: "#b3b4ec",
        main: "#7374c0",
        dark: "#393a8a",
        darker: "#16165c",
        contrastText: "#FFFFFF",
      },
      info: {
        lighter: "#d8fef9",
        light: "#8af7f9",
        main: "#3dcfed",
        dark: "#1e7daa",
        darker: "#0b4171",
        contrastText: "#FFFFFF",
      },
      success: {
        lighter: "#eafbd5",
        light: "#acec7e",
        main: "#56c12c",
        dark: "#278a16",
        darker: "#095c08",
        contrastText: "#FFFFFF",
      },
      warning: {
        lighter: "#fef4d3",
        light: "#fed37c",
        main: "#fca325",
        dark: "#b56412",
        darker: "#783607",
        contrastText: "#212b36",
      },
      error: {
        lighter: "#ffe7d8",
        light: "#ffa68b",
        main: "#ff4c3f",
        dark: "#b71f2e",
        darker: "#7a0c29",
        contrastText: "#FFFFFF",
      },
      black: {
        main: "#000000",
        contrastText: "#FFFFFF",
      },
      white: {
        main: "#ffffff",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    keyframes: {
      blob: {
        "0%": {
          transform: "translate(0px, 0px) scale(1)",
        },
        "33%": {
          transform: "translate(30px, -50px) scale(1.1)",
        },
        "66%": {
          transform: "translate(-20px, 20px) scale(0.9)",
        },
        "100%": {
          transform: "translate(0px, 0px) scale(1)",
        },
      },
    },
    animation: {
      blob: "blob 7s infinite",
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
