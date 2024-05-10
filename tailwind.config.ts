import { type Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const tailwindConfig: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    extend: {
      fontFamily: {
        primary: ["'Inter'", "'Noto Sans Thai'", 'sans-serif']
      },

      colors: {
        theme: {
          DEFAULT: '#6366f1',
          light: '#fafafa',
          dark: '#040404'
        }
      },

      grayscale: {
        25: '25%',
        50: '50%',
        75: '75%'
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
