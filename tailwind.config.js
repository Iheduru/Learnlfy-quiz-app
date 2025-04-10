/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        'card-blue': '#38BDF8',
        'card-purple': '#A855F7',
        'card-orange': '#FB923C',
        'card-indigo': '#4F46E5'
      }
    },
  },
  plugins: [],
}