/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          light: '#FF8A5B',
          dark: '#E55A2B',
        },
        secondary: {
          DEFAULT: '#F7C548',
          light: '#FFD166',
        },
        background: {
          primary: '#0A0A0F',
          secondary: '#12121A',
          tertiary: '#1A1A24',
          card: '#16161F',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          subtle: 'rgba(255, 255, 255, 0.04)',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      fontSize: {
        // Base - larger for readability
        'xs': ['13px', { lineHeight: '1.6' }],
        'sm': ['15px', { lineHeight: '1.6' }],
        'base': ['17px', { lineHeight: '1.7' }],
        'lg': ['19px', { lineHeight: '1.7' }],
        'xl': ['22px', { lineHeight: '1.4' }],
        '2xl': ['26px', { lineHeight: '1.4' }],
        '3xl': ['30px', { lineHeight: '1.3' }],
        '4xl': ['36px', { lineHeight: '1.2' }],
        // Labels & metadata
        'label': ['12px', { lineHeight: '1.5' }],
        'metadata': ['11px', { lineHeight: '1.5' }],
      },
      lineHeight: {
        'relaxed': '1.7',
        'loose': '1.8',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-in': 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-12px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
