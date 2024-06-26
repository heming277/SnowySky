// tailwind.config.js
module.exports = {
  content: ['./public/**/*.html', './public/**/*.js'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'sky': '#cae8ff', // Custom sky color
        'sea': '#4fa9d6', // Custom sea color
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

