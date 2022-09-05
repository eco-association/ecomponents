module.exports = {
  compact: false,
  presets: [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        development: false,
        runtime: "classic",
      },
    ],
    ["@babel/preset-typescript", { isTSX: true, allExtensions: true }],
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@emotion",
    [
      "module-resolver",
      {
        root: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    ],
  ],
};
