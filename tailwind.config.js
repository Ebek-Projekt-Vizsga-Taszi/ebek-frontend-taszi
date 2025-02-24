/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx}"],
	theme: {
	  extend: {
		backgroundImage: {
		  "custom-bg": "url('/BackgroundPic.png')",
		},
		fontFamily: {
		  newsreader: ['Newsreader', 'serif'],
		},
	  },
	},
	plugins: [require("daisyui")],
  };
  