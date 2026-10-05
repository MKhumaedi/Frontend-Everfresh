import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B4F8A',
          hover: '#083C68',
          light: '#EBF4FC',
          dark: '#072F53',
        },
        cyan: {
          DEFAULT: '#4FC3F7',
          hover: '#29B6F6',
          light: '#E1F5FE',
          dark: '#0288D1',
        },
        accent: {
          DEFAULT: '#2ECC71',
          hover: '#27AE60',
          light: '#E8F8F0',
        },
        ice: {
          DEFAULT: '#F4F8FB',
          surface: '#FFFFFF',
          muted: '#EBF1F6',
        },
        navy: {
          DEFAULT: '#0F1F2E',
          muted: '#5A6E7F',
          light: '#8FA2B2',
        },
        border: {
          DEFAULT: '#E3EAF0',
          hover: '#CBD8E2',
          active: '#4FC3F7',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'Poppins', 'sans-serif'],
        sans: ['DM Sans', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '10px',
        md: '12px',
        lg: '16px',
      },
      boxShadow: {
        flat: '0 1px 3px rgba(15, 31, 46, 0.05)',
        'flat-md': '0 4px 12px rgba(11, 79, 138, 0.06)',
        'flat-lg': '0 8px 24px rgba(11, 79, 138, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
