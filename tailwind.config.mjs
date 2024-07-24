/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,tsx}'],
	theme: {
		extend: {
			maxWidth: {
				800: '800px',
			},
		},
	},
	plugins: [],
}
