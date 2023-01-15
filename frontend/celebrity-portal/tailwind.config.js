/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./pages/*.{js,ts,jsx,tsx}', './src/layouts/**/*.{js,ts,jsx,tsx}', "./src/modules/**/*.{js,ts,jsx,tsx}" , './src/**/*.{js,ts,jsx,tsx}', "../../packages/ui/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        red : colors.red
    },
},
  plugins: [],
}
