/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/daisyui/dist/**/*.js",
  ],
  daisyui: {
    themes: ["light"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
