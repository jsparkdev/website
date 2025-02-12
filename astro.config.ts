import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://jspark.dev",
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      target: "esnext",
    },
  },
  markdown: {
    shikiConfig: {
      theme: "andromeeda",
    },
  },
  experimental: {
    svg: true,
  },
});
