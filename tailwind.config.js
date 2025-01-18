/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "dash-move": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "32px 0" },
        },
        "dash-move-vertical": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 32px" },
        },
      },
      animation: {
        "dash-move": "dash-move 1.5s linear infinite",
        "dash-move-vertical": "dash-move-vertical 1.5s linear infinite",
      },
    },
  },
  plugins: [],
};
