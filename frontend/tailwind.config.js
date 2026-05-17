/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        campus: {
          50: '#f6f8fb',
          100: '#e9eef5',
          200: '#cbd5e1',
          500: '#31547a',
          600: '#243f5f',
          700: '#1e3552',
          800: '#172a44',
          900: '#102033',
        },
        ink: '#152238',
      },
      boxShadow: {
        soft: '0 6px 18px rgba(15, 23, 42, 0.06)',
      },
    },
  },
  plugins: [],
}
