/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true,
    files: [
      "./public/index.html",
      "./src/**/*.{html,js,jsx}"
    ]
  },
  safelist: "./safelist.txt",
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
  plugins: [
    require('tailwind-safelist-generator')({
      patterns: [
        'text-{colors}',
        'border-{borderWidth}',
        'bg-{colors}',
        '{screens}:gap-{gap}',
      ],
    }),
  ],
}
