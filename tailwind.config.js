import colors from "./src/styles/colors";

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Founders Grotesk"],
      },
      colors: {
        "eco-blue-primary": colors.bluePrimary,
        "eco-blue-dark": colors.blueDark,
        "eco-red-danger": colors.redDanger,
        "eco-yellow-warning": colors.yellowWarning,
        "eco-green-success": colors.greenSuccess,
        "eco-teal-accent": colors.tealAccent,
        "eco-orange-accent": colors.orangeAccent,
        "eco-off-black": colors.offBlack,
        "eco-dark-gray": colors.darkGray,
        "eco-medium-gray": colors.mediumGray,
        "eco-light-gray": colors.lightGray,
      },
    },
  },
  plugins: [],
};
