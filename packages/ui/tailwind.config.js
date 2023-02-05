/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./components/**/*.{js,ts,tsx,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      brand: {
        "main": "#5BB1F1",
        "500": "#2A95E2",
        "600": "#0073C7",
        "700": "#005AB8"
      }
    },
  },
  plugins: [],
}
