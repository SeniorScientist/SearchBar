import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'black': '#1A1A1A',
      'white': '#FFFFFF',
      'white-secondary': '#8B8D84',
    },
    fontFamily: {
      lato: ['Lato']
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      letterSpacing: {
        normal: '0',
        wide: '.02rem',
        wider: '.03rem'
      },
      spacing: {

      },
      lineHeight: {
        '34': '2.125rem',
        'normal': '1.2rem'
      },
      borderRadius: {

      }
    }
  },
  plugins: [],
}
export default config
