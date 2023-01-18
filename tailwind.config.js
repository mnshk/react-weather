/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,tx,jsx,tsx}",
    "./components/**/*.{js,tx,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "Inter": ['Inter', 'sans-serif']
      },
    },
  },
  plugins: [],
}
