/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0D47A1",
        secondary: "#FFC107",
        accent: "#FF5722",
        blue: {
          600: "#1D4ED8",
          700: "#1E40AF",
        },
        green: {
          600: "#16A34A",
          700: "#15803D",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
