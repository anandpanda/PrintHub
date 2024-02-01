/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.js",
    "./public/index.html"
  ],
  theme: {
    extend: {},
    fontFamily: {
      'lucida' : ['"Lucida Sans"', '"Lucida Sans Regular"', '"Lucida Grande"', '"Lucida Sans Unicode"', 'Geneva', 'Verdana', 'sans-serif'],
      'gill' : ['"Gill Sans"', '"Gill Sans MT"', 'Calibri', '"Trebuchet MS"', 'sans-serif'],
    },
  },
  plugins: [],
}