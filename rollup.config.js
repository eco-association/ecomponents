import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
import externals from "rollup-plugin-node-externals";

import pkg from "./package.json";

const config = [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        exports: "named",
        sourcemap: false,
        strict: false,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: false,
      },
    ],
    plugins: [
      commonjs({
        esmExternals: true,
        defaultIsModuleExports: true,
        transformMixedEsModules: true,
      }),
      typescript(),
      copy({
        targets: [
          { src: ["src/fonts/*.woff", "src/fonts/*.woff2"], dest: "lib/fonts" },
        ],
      }),
      postcss({
        extract: true,
      }),
      externals(),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/charts/index.ts",
    output: [
      {
        file: "lib/charts/index.cjs",
        format: "cjs",
        exports: "named",
        sourcemap: false,
        strict: false,
      },
      {
        file: "lib/charts/index.mjs",
        format: "esm",
        sourcemap: false,
      },
    ],
    plugins: [
      // nodeResolve({
      //   resolveOnly: ["react-apexcharts"],
      // }),
      commonjs({
        transformMixedEsModules: true,
      }),
      typescript({
        tsconfigOverride: {
          include: ["src/charts/*"],
        },
      }),
      postcss({
        extract: true,
      }),
    ],
    external: ["react", "react-dom"],
  },
];
export default config;
