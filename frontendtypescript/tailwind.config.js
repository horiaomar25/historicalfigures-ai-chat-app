import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,tsx}",
    "./src/**/*.{js,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    extend: {},
  },
  daisyui: {
    themes: [],
  },
  plugins: [daisyui],
}
