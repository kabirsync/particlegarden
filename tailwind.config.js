/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
      screens: {
        xs: "440px",
      },
      keyframes: {
        "long-ping": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "75%": { transform: "scale(3)", opacity: ".5" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
      },
      animation: {
        "long-ping": "long-ping 2s cubic-bezier(0, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
