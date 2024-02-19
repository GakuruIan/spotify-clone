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
        light:"rgba(225,255,255,0.2)",
        brown:'rgba(217, 200, 165,0.25)',
        maroon:'rgba(152, 88, 62,0.2)',
        orange:'rgba(255, 75, 31,0.2)',
        ui:'rgba(126, 95, 247,0.25)'
      }
    },
  },
  plugins: [],
}

