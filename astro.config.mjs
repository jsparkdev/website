import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationHighlight,
} from "@shikijs/transformers";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://jspark.dev",
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "aurora-x",
      transformers: [
        transformerNotationDiff(),
        transformerNotationErrorLevel(),
        transformerNotationHighlight(),
      ],
    },
  },
  integrations: [tailwind(), sitemap(), mdx(), icon()],
});
