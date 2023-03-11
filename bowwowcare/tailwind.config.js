/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'main-color': '#38A8AC',
        'secondary': '#E5EEC1',
        'aggression0': '#FFC329', 
        'aggression1': '#FF9029', 
        'aggression2': '#FF1192'
      },
    },
  },
  plugins: [],
}
