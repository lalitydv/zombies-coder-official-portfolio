/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#22c55e',
          dark: '#16a34a',
        },
        secondary: {
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
        },
      },
    },
  },
  plugins: [],
}

