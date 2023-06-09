/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a"}
      },
      animation: {
        scaleInVerTop: 'scaleInVerTop 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      },
      keyframes: {
        scaleInVerTop: {
          '0%': {
            transform: 'scaleY(0)',
            transformOrigin: '100% 0%',
            opacity: 1
          },
          '100%': {
            transform: 'scaleY(1)',
            transformOrigin: '100% 0%',
            opacity: 1
          },
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
