/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    container: {
      center: true,
      padding: '15px',
    },
    extend: {
      fontFamily: {
        sans: ['InterVariable', 'Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#2384F5',
        content: '#4C5670',
        dark: '#1B1D26',
        gray: '#292A2C',
      },
    },
  },
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss', require('@tailwindcss/forms')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
