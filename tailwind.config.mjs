import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
		extend: {
			maxWidth: {
				800: '800px',
			},
		},
		fontFamily: {
			sans: ["'Inter'", ...defaultTheme.fontFamily.sans],
		},
	},
	plugins: [],
}
