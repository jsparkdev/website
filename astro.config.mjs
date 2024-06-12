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
			title: 'Junseong Park',
			description:
				'프런트엔드 개발자 박준성의 웹 사이트입니다. 이 웹 사이트는 저에 대한 정보를 제공하고, 웹 애플리케이션을 빌드하고 배포하면서 얻은 지식과 경험을 공유합니다.',
			favicon: '/favicons/icon.svg',
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						href: '/favicons/favicon.ico',
						sizes: '32x32',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'apple-touch-icon',
						href: '/favicons/apple-touch-icon.png',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'manifest',
						href: '/manifest.webmanifest',
					},
				},
			],
			logo: {
				src: './src/assets/icon.svg',
				alt: '웹사이트 로고',
				replacesTitle: true,
			},
			components: {
				Header: './src/components/Header.astro',
				Head: './src/components/Head.astro',
			},
			tableOfContents: {
				maxHeadingLevel: 4,
			},
			social: {
				github: 'https://github.com/jsparkdev',
				'x.com': 'https://x.com/jsparkdev',
				linkedin: 'https://www.linkedin.com/in/jsparkdev',
			},
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
					label: '게시물 목록',
					translations: {
						en: 'All Posts',
					},
					autogenerate: {
						directory: 'posts',
					},
				},
			],
		}),
		tailwind(),
	],
})
