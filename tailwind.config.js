/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 10s linear infinite", // Adjust '10s' to the desired speed
      },
      screens: {
        xs: "576px", // Equivalent to Bootstrap's "sm"
        sm: "640px", // Equivalent to Bootstrap's "md"
        md: "768px", // Equivalent to Bootstrap's "lg"
        lg: "992px", // Equivalent to Bootstrap's "xl"
        xl: "1200px", // Equivalent to Bootstrap's "xxl"
        "2xl": "1400px", // Larger than Bootstrap's "xxl"
      },
    },
  },
  plugins: [],
};
