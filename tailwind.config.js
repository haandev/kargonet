/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    
    extend: {
      colors: {
        earth: {
          50: '#F2E8E6',
          100: '#CBB7B2',
          200: '#AB9089',
          300: '#8D6E66',
          400: '#735149',
          500: '#5C3831',
          600: '#472019',
          700: '#3D1C17',
          800: '#341813',
          900: '#2A120E',
        },
      },
    },
  },
  plugins: [],
}
