import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import {
	transformerNotationDiff,
	transformerNotationErrorLevel,
	transformerNotationHighlight,
} from '@shikijs/transformers'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
	site: 'https://jspark.dev',
	markdown: {
		syntaxHighlight: 'shiki',
		shikiConfig: {
			theme: 'aurora-x',
			transformers: [
				transformerNotationDiff(),
				transformerNotationErrorLevel(),
				transformerNotationHighlight(),
			],
		},
	},
	integrations: [tailwind(), sitemap(), mdx(), icon()],
})
