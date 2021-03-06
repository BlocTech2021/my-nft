const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        'xxs': '0.6rem'
      },
      colors: {
        charcoal: '#333333',
        pearl: '#ffffff',
        granite: '#666666',
        tundora: '#444444',
        alto: '#dddddd',
      }
    },
  },
  plugins: [],
}
