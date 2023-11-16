/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        dark:{
          100:'#212121',
          200:"#222222",
          300:'#232323',
          400:'#242424',
          500:'#252525',
          600:"#262626",
          700:'#272727',
          800:'#282828',
          900:'#292929'
        },
        spotify:{
          900:'#1DB954'
        },
        light:"rgba(225,255,255,0.2)"
      }
    },
  },
  plugins: [],
}

