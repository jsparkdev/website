/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.astro"],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")],
};
