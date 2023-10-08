import type { Config } from 'tailwindcss'

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
          light: '#818cf8',
          dark: '#5b54f1'
        }
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
      },

      screens: {
        tablet: '640px', // @media (min-width: 640px)
        laptop: '1024px', // @media (min-width: 1024px)
        desktop: '1280px' // @media (min-width: 1280px)
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },

  plugins: []
}

export default tailwindConfig
