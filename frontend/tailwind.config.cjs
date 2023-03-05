/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // "./node_modules/flowbite/**/*.js",
    // "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/daisyui/dist/**/*.js",
    // "./node_modules/react-daisyui/dist/**/*.js",
  ],
  daisyui: {
    themes: false,
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
