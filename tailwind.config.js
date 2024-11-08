/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        'sofia-pro': ['Sofia Pro', 'sans-serif'],
        'house-md': ['House MD', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

