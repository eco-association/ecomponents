const { babel } = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const inject = require("@rollup/plugin-inject");
const { nodeResolve: resolve } = require("@rollup/plugin-node-resolve");
const { default: dts } = require("rollup-plugin-dts");
const svgr = require("@svgr/rollup");
const externals = require("rollup-plugin-node-externals");

const EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];

const transpile = {
  input: "src/index.ts",
  plugins: [
    // Dependency resolution
    externals({
      deps: true,
      peerDeps: true,
    }),
    resolve({ extensions: EXTENSIONS }), // resolves third-party modules within node_modules/

    // Source code transformation
    svgr({ jsxRuntime: "automatic" }), // imports svgs as React components (without re-importing React)
    commonjs(), // transforms cjs dependencies into tree-shakeable ES modules

    babel({
      babelHelpers: "runtime",
      extensions: EXTENSIONS,
    }),
    inject({ React: "react" }), // imports React (on the top-level, un-renamed), for the classic runtime
  ],
  onwarn: (warning, warn) => {
    // This pipeline is for transpilation - checking is done through tsc.
    if (warning.code === "UNUSED_EXTERNAL_IMPORT") return;

    warn(warning);
    console.log(warning.loc, "\n");
  },
};

const esm = {
  ...transpile,
  output: {
    dir: "dist",
    format: "esm",
    sourcemap: false,
  },
};

const cjs = {
  ...transpile,
  output: {
    dir: "dist/cjs",
    entryFileNames: "[name].cjs",
    chunkFileNames: "[name]-[hash].cjs",
    format: "cjs",
    sourcemap: false,
  },
  watch: false,
};

const types = {
  input: "dts/index.d.ts",
  output: { file: "dist/index.d.ts" },
  plugins: [dts({ compilerOptions: { baseUrl: "dts" } })],
  watch: false,
};

const config = [esm, cjs, types];
config.config = { ...esm, output: { ...esm.output, sourcemap: true } };
module.exports = config;
