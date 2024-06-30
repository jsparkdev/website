import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

export default defineConfig({
	site: 'https://jspark.dev',
	integrations: [
		sitemap(),
		tailwind({
			applyBaseStyles: false,
		}),
	],
})
