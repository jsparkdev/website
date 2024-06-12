import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import starlight from '@astrojs/starlight'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
	site: 'https://jspark.dev',
	integrations: [
		sitemap(),
		icon(),
		starlight({
			title: 'JSPARK.DEV',
			description: '블로그 게시글 목록입니다.',
			favicon: '/favicons/icon.svg',
			credits: true,
			social: {
				github: 'https://github.com/jsparkdev',
				'x.com': 'https://x.com/jsparkdev',
			},
			customCss: ['./src/styles/tailwind.css'],
			locales: {
				root: {
					label: '한국어',
					lang: 'ko-KR',
				},
				en: {
					label: 'English',
				},
			},
			sidebar: [
				{
					label: 'Posts',
					autogenerate: {
						directory: 'posts',
					},
				},
			],
		}),
		mdx(),
		tailwind(),
	],
})
