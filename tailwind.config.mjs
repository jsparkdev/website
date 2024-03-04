/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx}"],
  theme: {
    extend: {},
    // surface: 900 (bottom) ~ 600 (top)
    // text: 200 (headings), 300 (hover), 400 (body),
    // accent: sky 400
  },
  plugins: [require("@tailwindcss/typography")],
};
