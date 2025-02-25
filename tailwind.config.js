/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx}"],
	theme: {
	  extend: {
		backgroundImage: {
		  "custom-bg": "url('/BackgroundPic.png')",
		},
		fontFamily: {
		  newsreader: ["Newsreader", "serif"],
		},
		animation: {
		  shine: "shine var(--duration) infinite linear",
		},
		keyframes: {
		  shine: {
			"0%": {
			  "background-position": "0% 0%",
			},
			"50%": {
			  "background-position": "100% 100%",
			},
			to: {
			  "background-position": "0% 0%",
			},
		  },
		},
	  },
	},
	plugins: [require("daisyui")],
  };