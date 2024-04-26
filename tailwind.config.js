/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,vue,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F3743D'
      },
      screens: {
        mobileAvatar: '540px'
      }
    }
  },
  plugins: []
}
