/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Single source of truth for the brand palette - every component uses
        // these tokens rather than inline hex, so a colour correction is a
        // one-line change here.
        'evangadi-orange': '#f58220',
        'evangadi-orange-dark': '#d96f18',
        'evangadi-blue': '#4f5bd5',
        'evangadi-blue-dark': '#4149b8',
        'evangadi-dark': '#34495e',
        'evangadi-page': '#f1f2f4',
        // Headings in the design are a dark desaturated navy, not neutral grey.
        'evangadi-heading': '#3f3d56',
      },
    },
  },
  plugins: [],
}
