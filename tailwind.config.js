/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'high-contrast': {
          'black': '#000000',
          'white': '#FFFFFF',
          'dark': '#1a1a1a',
          'light': '#f5f5f5',
        },
        'accessible': {
          'primary': '#0066CC',
          'secondary': '#333333',
          'success': '#00AA00',
          'error': '#CC0000',
          'warning': '#FF9900',
        },
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '32px',
      },
      spacing: {
        '3xs': '4px',
        '2xs': '8px',
        'xs': '12px',
        'sm': '16px',
        'md': '20px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '40px',
      },
      minHeight: {
        'touch-target': '44px',
      },
      minWidth: {
        'touch-target': '44px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  safelist: [
    'sr-only',
  ],
}
