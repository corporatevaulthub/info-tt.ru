/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
   
    container: { center: true, padding: "1rem" },
    extend: {
      screens: { "2xl": "1280px" },
      fontFamily: {
        sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#2384F5",
        content: "#4C5670",
        dark: "#1B1D26",
        gray: "#292A2C",
        'gray-50': '#F7F7F7',
        accent: '#E53737'
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
