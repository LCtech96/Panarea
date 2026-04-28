import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        ios: '0 2px 8px -2px rgba(0,0,0,0.06), 0 8px 24px -8px rgba(0,0,0,0.12)',
        'ios-lg': '0 4px 16px -4px rgba(0,0,0,0.08), 0 16px 40px -16px rgba(0,0,0,0.14)',
        'ios-float':
          '0 -8px 32px -8px rgba(0,0,0,0.12), 0 16px 40px -12px rgba(0,0,0,0.08)',
      },
      backdropBlur: {
        ios: '20px',
      },
    },
  },
  plugins: [],
}
export default config

