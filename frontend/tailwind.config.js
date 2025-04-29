// tailwind.config.js
module.exports = {
  darkMode: 'class', // This enables class-based dark mode
  theme: {
    extend: {
      colors: {
        navy: {
          800: '#1e2a47',
        },
      },
    },
  },
  plugins: [],
}
module.exports = {
  theme: {
    extend: {
      transitionProperty: {
        'all': 'all 0.3s ease-in-out'
      }
    }
  }
}
