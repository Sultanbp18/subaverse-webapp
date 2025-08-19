import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#1a73e8',
          foreground: '#ffffff',
          '50': '#f3f8fe',
          '100': '#e6f0fd',
          '200': '#c6ddfb',
          '300': '#92bef7',
          '400': '#5b9bf1',
          '500': '#1a73e8',
          '600': '#1557d0',
          '700': '#1344ab',
          '800': '#15398b',
          '900': '#163272',
        },
        accent: {
          DEFAULT: '#fbbc05',
          foreground: '#000000',
          '50': '#fff9e6',
          '100': '#fef2cc',
          '200': '#fde499',
          '300': '#fcd666',
          '400': '#fbc733',
          '500': '#fbbc05',
          '600': '#d19c04',
          '700': '#a77c03',
          '800': '#7d5c02',
          '900': '#533d02',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'hsl(var(--foreground))',
            a: {
              color: '#1a73e8',
              '&:hover': {
                color: '#1557d0',
              },
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config