/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'evangadi-orange': '#ff6b35',
        'evangadi-blue': '#4285f4',
        'evangadi-dark': '#34495e',
        'evangadi-light-blue': '#e8f4f8',
      },
    },
  },
  plugins: [],
}

