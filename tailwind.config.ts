import { type Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const tailwindConfig: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    extend: {
      fontFamily: {
        primary: ["'Inter'", "'Noto Sans Thai'", 'sans-serif']
      },

      fontSize: {
        xe: ['11px', '15px']
      },

      colors: {
        theme: {
          DEFAULT: '#6366f1',
          light: '#fafafa',
          dark: '#040404'
        }
      },

      backgroundImage: {
        rainbow:
          'linear-gradient(to right, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722)'
      },

      container: {
        center: true
      },

      grayscale: {
        25: '25%',
        50: '50%',
        75: '75%'
      },

      zIndex: {
        100: '100',
        150: '150',
        max: '9999'
      },

      animation: {
        loader: 'loader 1s cubic-bezier(0.86, 0.01, 0.08, 1)',
        rainbow: 'rainbow 3s linear infinite'
      },

      keyframes: {
        loader: {
          from: { width: '0%' },
          to: { width: '100%' }
        },
        rainbow: {
          from: {
            'background-position': '0 0'
          },
          to: {
            'background-position': '-200% 0'
          }
        }
      }
    }
  },

  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        h1: { fontSize: theme('fontSize.4xl'), lineHeight: 'normal' },
        h2: { fontSize: theme('fontSize.2xl'), lineHeight: 'normal' },
        h3: { fontSize: theme('fontSize.xl'), lineHeight: 'normal' },
        h4: { fontSize: theme('fontSize.base'), lineHeight: 'normal' },
        h5: { fontSize: theme('fontSize.sm'), lineHeight: 'normal' },
        h6: { fontSize: theme('fontSize.xs'), lineHeight: 'normal' }
      })
    })
  ]
}

export default tailwindConfig
