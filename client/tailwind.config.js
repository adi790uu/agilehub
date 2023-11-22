/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  daisyui: {
    themes: ['sunset', 'autumn'],
  },
  theme: {
    extend: {
      fontFamily: {
        one: ['Ubuntu'],
        two: ['Arvo'],
      },
    },
  },

  plugins: [require('daisyui')],
}
