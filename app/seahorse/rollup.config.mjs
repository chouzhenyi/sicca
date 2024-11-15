/** @format */
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
import resolve from "@rollup/plugin-node-resolve";
import path from "path";
const extensions = [".ts", ".tsx", ".js", ".jsx"];

export default {
  input: "./index.js",
  output: {
    dir: "dist",
    format: "umd",
    name: "handle",
  },
  external: [/@babel\/runtime/],
  plugins: [
    resolve({ extensions }),
    commonjs(),
    babel({
      extensions,
      presets: [
        "@babel/preset-env",
        [
          "@babel/preset-typescript",
          {
            isTSX: true,
            allExtensions: true,
          },
        ],
      ],
      plugins: ["@babel/transform-runtime"],
      babelrc: false, // 忽略工程内的 babel 配置文件，使用 rollup 这里的配置
      babelHelpers: "runtime", // 当工程作为程序应用时推荐使用 bundled（默认值），当构建库时推荐使用 runtime。
    }),
    alias({
      entries: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    }),
  ],
};
