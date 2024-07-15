import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,tsx}'],
	theme: {
		extend: {
			maxWidth: {
				800: '800px',
			},
			keyframes: {
				'slide-up': {
					from: {
						translate: '0 12px',
						opacity: '0',
					},
					to: {
						translateY: '0 0',
						opacity: '1',
					},
				},
			},
			animation: {
				'slide-up': 'slide-up 0.8s ease-out backwards',
			},
		},
		fontFamily: {
			sans: ["'Inter'", ...defaultTheme.fontFamily.sans],
		},
	},
	plugins: [],
}
