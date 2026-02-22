import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#edf6f0',
          100: '#c8e5d4',
          200: '#9dcdb3',
          300: '#98AE4A',
          400: '#97B344',
          500: '#468663',
          600: '#3c7557',
          700: '#2f5e45',
          800: '#224733',
          900: '#163022',
        },
        background: '#FFFFFF',
        foreground: '#1a2e22',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
