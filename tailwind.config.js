// const colors = require('tailwindcss/colors')

module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      colors: {
        'main': {
          50: "#EFE2E1",
          100: "#E1C5C7",
          200: "#D3A8AD",
          300: "#C58B93",
          400: "#B76E79",
        },
        'lavendar': '#F8E9E9',
        'cherry': '#FFB3C1',
      },
      fontFamily: {
        'pacifico': ['pacifico'],
        'Quicksand': ['Quicksand'],
      },
      fontSize: {
        '9xl': "10rem",
      }
    },
  },
  plugins: [],
}
