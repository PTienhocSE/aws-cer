/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0f172a',
          accent: '#f59e0b',
          'accent-2': '#fb923c',
          secondary: '#3b82f6',
          danger: '#ef4444',
          success: '#22c55e',
        },
        surface: {
          DEFAULT: '#ffffff',
          card: '#f8fafc',
          dark: '#0f172a',
        },
        text: {
          primary: '#1e293b',
          secondary: '#475569',
          muted: '#94a3b8',
        },
        customBorder: '#e2e8f0',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        card: '12px',
        btn: '8px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px 0 rgba(15, 23, 42, 0.03)',
        'card-hover': '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.04)',
      },
    },
  },
  plugins: [],
};
