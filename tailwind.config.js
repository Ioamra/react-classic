import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    fonts: {
      sans: "Inter, sans-serif",
      mono: "Source Code Pro, monospace",
    },
    fontSizes: {
      xs: "0.75rem",   // 12px
      sm: "0.875rem",  // 14px
      base: "1rem",    // 16px
      md: "1rem",      // 16px
      lg: "1.125rem",  // 18px
      xl: "1.25rem",   // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem",  // 36px
      "5xl": "3rem",    // 48px
      "6xl": "3.75rem", // 60px
    },
    transitions: {
      default: "all 1250ms ease",
      button: "background 1250ms ease",
      avatar: "transform 1250ms ease",
    },
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: "#345d78",
            foreground: "#ffffff",
            "50": "#ebeff2",
            "100": "#d6dfe4",
            "200": "#aebec9",
            "300": "#859eae",
            "400": "#5d7d93",
            "500": "#345d78",
            "600": "#2a4a60",
            "700": "#1f3848",
            "800": "#152530",
            "900": "#0a1318",
          },

          success: { 
            DEFAULT: "#17c964",
            foreground: "#000000",
            "50": "#e8faf0",
            "100": "#d1f4e0",
            "200": "#a2e9c1",
            "300": "#74dfa2",
            "400": "#45d483",
            "500": "#17c964",
            "600": "#12a150",
            "700": "#0e793c",
            "800": "#095028",
            "900": "#052814"
          },

          warning: { 
            DEFAULT: "#f5a524",
            foreground: "#000000",
            "50": "#fef6e9",
            "100": "#fdedd3",
            "200": "#fbdba7",
            "300": "#f9c97c",
            "400": "#f7b750",
            "500": "#f5a524",
            "600": "#c4841d",
            "700": "#936316",
            "800": "#62420e",
            "900": "#312107"
          },

          danger: { 
            DEFAULT: "#f31260",
            foreground: "#ffffff",
            "50": "#fee7ef",
            "100": "#fdd0df",
            "200": "#faa0bf",
            "300": "#f871a0",
            "400": "#f54180",
            "500": "#f31260",
            "600": "#c20e4d",
            "700": "#920b3a",
            "800": "#610726",
            "900": "#310413"
          },

          foreground: { 
            DEFAULT: "#171718",
            "50": "#f1f1f2",
            "100": "#e3e3e4",
            "200": "#c6c6ca",
            "300": "#aaaaaf",
            "400": "#8d8d95",
            "500": "#71717a",
            "600": "#5a5a62",
            "700": "#444449",
            "800": "#2d2d31",
            "900": "#171718"

          },
          
          default: { 
            DEFAULT: "#e3e3e4",
            foreground: "#000000",
            "50": "#f1f1f2",
            "100": "#e3e3e4",
            "200": "#c6c6ca",
            "300": "#aaaaaf",
            "400": "#8d8d95",
            "500": "#71717a",
            "600": "#5a5a62",
            "700": "#444449",
            "800": "#2d2d31",
            "900": "#171718"
          },
          
          focus: "#345d78",
          overlay: "#000000",
          background: "#ffffff",

          divider: "#111111",
          "divider-opacity": 0.15,

          content1: "#ffffff",
          "content1-foreground": "#11181c",
          content2: "#f4f4f5",
          "content2-foreground": "#27272a",
          content3: "#e4e4e7",
          "content3-foreground": "#3f3f46",
          content4: "#d4d4d8",
          "content4-foreground": "#52525b",
        }
      },
      dark: {
        colors: {
          primary: { 
            DEFAULT: "#bef264",
            foreground: "#000000",
            "50": "#72903c",
            "100": "#85a846",
            "200": "#98c150",
            "300": "#abd95a",
            "400": "#bef264",
            "500": "#cbf583",
            "600": "#d8f7a2",
            "700": "#e5fac1",
            "800": "#f2fce0",
            "900": "#f9fef0",
          },

          success: { 
            DEFAULT: "#17c964",
            foreground: "#000000",
            50: "#052814",
            100: "#095028",
            200: "#0e793c",
            300: "#12a150",
            400: "#17c964",
            500: "#45d483",
            600: "#74dfa2",
            700: "#a2e9c1",
            800: "#d1f4e0",
            900: "#e8faf0",
          },

          warning: { 
            DEFAULT: "#f5a524",
            foreground: "#000000",
            50: "#312107",
            100: "#62420e",
            200: "#936316",
            300: "#c4841d",
            400: "#f5a524",
            500: "#f7b750",
            600: "#f9c97c",
            700: "#fbdba7",
            800: "#fdedd3",
            900: "#fef6e9",
          },

          danger: { 
            DEFAULT: "#f31260",
            foreground: "#000000",
            50: "#310413",
            100: "#610726",
            200: "#920b3a",
            300: "#c20e4d",
            400: "#f31260",
            500: "#f54180",
            600: "#f871a0",
            700: "#faa0bf",
            800: "#fdd0df",
            900: "#fee7ef",
          },

          foreground: { 
            DEFAULT: "#f1f1f2",
            50: "#171718",
            100: "#2d2d31",
            200: "#444449",
            300: "#5a5a62",
            400: "#71717a",
            500: "#8d8d95",
            600: "#aaaaaf",
            700: "#c6c6ca",
            800: "#e3e3e4",
            900: "#f1f1f2",

          },
          default: { 
            DEFAULT: "#2d2d31",
            foreground: "#ffffff",
            50: "#171718",
            100: "#2d2d31",
            200: "#444449",
            300: "#5a5a62",
            400: "#71717a",
            500: "#8d8d95",
            600: "#aaaaaf",
            700: "#c6c6ca",
            800: "#e3e3e4",
            900: "#f1f1f2",
          },

          focus: "#bef264",
          overlay: "#000000",
          background: "#000000",

          divider: "#ffffff",
          "divider-opacity": 0.15,

          content1: "#18181b",
          "content1-foreground": "#fafafa",
          content2: "#27272a",
          "content2-foreground": "#f4f4f5",
          content3: "#3f3f46",
          "content3-foreground": "#e4e4e7",
          content4: "#52525b",
          "content4-foreground": "#d4d4d8",
        }
      },
    },
  })],
}