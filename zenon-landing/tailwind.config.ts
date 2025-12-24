import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        zenon: {
          bg: '#000001',
          'bg-card': '#0d1117',
          text: '#ffffff',
          'text-muted': '#8b949e',
          green: '#7fff00',
          'green-dark': '#6be600',
          'green-glow': 'rgba(127, 255, 0, 0.15)',
        },
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      letterSpacing: {
        zenon: '0.02em',
      },
    },
  },
  plugins: [],
}

export default config
