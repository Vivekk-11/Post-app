/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      desktop: { max: "1200px" },
      tab: { max: "850px" },
      mobile: { max: "475px" },
    },
  },
  plugins: [],
};
