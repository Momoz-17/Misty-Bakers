/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Warm bakery palette inspired by frosting & pastry tones
        blush: {
          50: "#fdf3f2",
          100: "#fbe6e4",
          200: "#f6c9c5",
          300: "#eea39c",
          400: "#e17569",
          500: "#cf5548",
          600: "#b13f34",
          700: "#93322a",
          800: "#792c26",
          900: "#652a25",
        },
        cream: "#fff8f0",
        cocoa: "#4a2f27",
        gold: "#e0a94a",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Poppins'", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        blob: {
          "0%, 100%": { borderRadius: "42% 58% 65% 35% / 45% 45% 55% 55%" },
          "50%": { borderRadius: "58% 42% 35% 65% / 55% 55% 45% 45%" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        blob: "blob 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
