import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
	site: 'https://jspark.dev',
	integrations: [
		sitemap(),
		tailwind({
			applyBaseStyles: false,
		}),
	],
	output: 'static',
	adapter: vercel({
		webAnalytics: true,
	}),
})
