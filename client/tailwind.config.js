/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#121212', // Deep Charcoal
        primary: '#FF5252',    // Fire Red
        secondary: '#E0E0E0',  // Light Gray
        accent: '#FFEB3B',     // Bright Yellow
        card: '#1E1E1E',       // Card/Surface
        text: '#FAFAFA',       // Main Text
      },
      fontFamily: {
        display: ['Oswald', 'Montserrat', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

