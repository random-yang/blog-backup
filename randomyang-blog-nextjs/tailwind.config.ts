import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ebc65a',
          forest: '#6ba8a9',
          grass: '#9dab86',
          sky: '#9be3de',
          sun: '#ffa259',
          sea: '#46b3e6',
        },
        text: {
          primary: '#222',
          secondary: '#333',
          tertiary: '#444',
          light: '#666',
          lighter: '#888',
        },
        background: {
          DEFAULT: '#ffffff',
          auxiliary: '#fffdf6',
        }
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'serif'],
      },
      fontSize: {
        // Small sizes
        'xs': '1.2rem',
        'sm': '1.4rem',
        'base': '1.6rem',
        'lg': '1.8rem',
        // Medium sizes
        'xl': '2.2rem',
        '2xl': '2.8rem',
        '3xl': '3.2rem',
        '4xl': '4.2rem',
        // Large sizes
        '5xl': '5.2rem',
        '6xl': '6.2rem',
        '7xl': '7.8rem',
      },
      screens: {
        'xs': '380px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1580px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;