import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
	site: "https://jspark.dev",
	markdown: {
		syntaxHighlight: "shiki",
		shikiConfig: {
			theme: "aurora-x",
		},
	},
	integrations: [tailwind({ applyBaseStyles: false }), sitemap(), mdx()],
});
