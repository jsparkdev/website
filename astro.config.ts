import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";

export default defineConfig({
  site: "https://jspark.dev",
  integrations: [
    sitemap(),
    expressiveCode({
      themes: ["andromeeda"],
      styleOverrides: { codeFontFamily: "JetBrains Mono" },
    }),
    mdx(),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      target: "esnext",
    },
  },
  experimental: {
    svg: true,
  },
});
