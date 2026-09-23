/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0B1220',
          900: '#111A2E',
          850: '#141F36',
          800: '#18233C',
          750: '#1E2C4A',
          700: '#233354',
          600: '#334B75',
          500: '#4A6999',
        },
        cream: {
          50: '#FAF8F5',
          100: '#F5EFE0',
          200: '#EBE2CD',
          300: '#DDD0B3',
        },
        brand: {
          blue: '#1A73E8',
          dark: '#0A0E1A',
          card: 'rgba(255, 255, 255, 0.65)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glass': '0 20px 50px rgba(8, 112, 184, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.6) inset',
        'glass-dark': '0 25px 60px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
        'lift': '0 22px 40px -12px rgba(15, 23, 42, 0.15)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 7s ease-in-out infinite 1s',
      },
    },
  },
  plugins: [],
}

