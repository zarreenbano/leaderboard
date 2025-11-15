// tailwind.config.ts (ROOT)
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    // Covers ALL possible locations
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        true_blue: {
          500: '#0466c8',
          600: '#0f85fa',
          700: '#4ba3fb',
        },
        sapphire: {
          500: '#0353a4',
          600: '#0576e8',
          700: '#3698fb',
        },
        oxford_blue: {
          500: '#002855',
          600: '#0050ab',
          700: '#0178ff',
        },
      },
    },
  },
  plugins: [],
};

export default config;