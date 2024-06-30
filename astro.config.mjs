import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import { defineConfig } from 'astro/config'

export default defineConfig({
	site: 'https://jspark.dev',
	adapter: vercel({
		webAnalytics: { enabled: true },
	}),
	integrations: [
		sitemap(),
		tailwind({
			applyBaseStyles: false,
		}),
	],
})
