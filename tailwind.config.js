const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        custom: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          text: 'var(--text-primary)',
          'text-secondary': 'var(--text-secondary)',
          border: 'var(--border-color)',
          button: 'var(--button-bg)',
          'button-hover': 'var(--button-hover)',
        },
      },
    },
  },  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff6363',
        secondary: {
          100: '#E2E2D5',
          200: '#888883',
        },
      },
    },
  },
  plugins: [],
};
