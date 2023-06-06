/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1C112B",
        primaryText: "#FFF",
        secondaryText: "#A48CAB",
        accent: "#FF00FF",
        accent2: "#00FFFF",
        accent3: "#F97316",
        link: "#6A00FF",
        button: "#FF4081",
        buttonText: "#FFF",
        hover: "#4A148C",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        spaceMono: ["Space Mono", "monospace"],
      },
      animation: {
        text: "text 4s ease infinite",
        "swing-in-top-fwd":
          "swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275)   both",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "swing-in-top-fwd": {
          "0%": {
            transform: "rotateX(-100deg)",
            "transform-origin": "top",
            opacity: "0",
          },
          to: {
            transform: "rotateX(0deg)",
            "transform-origin": "top",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};
