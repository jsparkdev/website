import { defineConfig } from "vitepress";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";

export default defineConfig({
	title: "Junseong Park",
	description: "Junseong Park's personal website",
	lang: "ko-KR",
	head: [["link", { rel: "icon", href: "/favicon.svg" }]],
	cleanUrls: true,
	markdown: { codeTransformers: [transformerTwoslash()] },
	themeConfig: {
		logo: "/favicon.svg",
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Blog", link: "/blog/object-type" },
			{ text: "Projects", link: "/projects/a" },
		],
		sidebar: {
			"/blog": [
				{
					text: "TypeScript",
					items: [
						{
							text: "객체 타입 정의",
							link: "/blog/object-type",
						},
					],
				},
			],
			"/projects": [
				{
					text: "",
					items: [{ text: "A", link: "/projects/a" }],
				},
			],
		},
		socialLinks: [
			{ icon: "github", link: "https://github.com/jsparkdev" },
			{ icon: "x", link: "https://x.com/jsparkdev" },
			{ icon: "linkedin", link: "https://linkedin.com/in/jsparkdev" },
		],
	},
});
