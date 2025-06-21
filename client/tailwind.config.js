// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 this must match your JSX file paths
  ],
  theme: {
    extend: {
      animation: {
        glitch: "glitch 0.5s infinite",
      },
      keyframes: {
        glitch: {
          "0%": { transform: "translate(0, 0)", opacity: "1" },
          "25%": { transform: "translate(-3px, 3px) skew(-5deg)", opacity: "0.8" },
          "50%": { transform: "translate(3px, -3px) skew(5deg)", opacity: "0.6" },
          "75%": { transform: "translate(-1px, 1px) skew(-3deg)", opacity: "0.9" },
          "100%": { transform: "translate(0, 0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
