/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f9ff',
          100: '#eaf2ff',
          200: '#d5e3ff',
          300: '#b0c9ff',
          400: '#84a9ff',
          500: '#4d7dff',
          600: '#2855db',
          700: '#1a3baa',
          800: '#122b7a',
          900: '#0a1c4d',
        },
      },
    },
  },
  plugins: [],
} 