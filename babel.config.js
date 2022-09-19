module.exports = {
  compact: false,
  presets: [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        development: false,
        runtime: "automatic",
        importSource: "@emotion/react",
      },
    ],
    ["@babel/preset-typescript", { isTSX: true, allExtensions: true }],
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@emotion/babel-plugin",
    [
      "module-resolver",
      {
        root: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    ],
  ],
};
