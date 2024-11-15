/** @format */
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
// import babel from "@babel/core";

const isEnvProduction = process.env.NODE_ENV === "production";
export default {
  input: "src/app.jsx",
  output: {
    file: "dist/bundle.mjs",
    format: "umd",
  },
  plugins: [
    !isEnvProduction &&
      serve({
        // 服务器启动的文件夹，默认是项目根目录，需要在该文件下创建index.html
        contentBase: "",
        port: 30366,
      }),
    // watch dist目录，当目录中的文件发生变化时，刷新页面
    !isEnvProduction && livereload("dist"),
  ],
  presets: [
    [
      "@babel/preset-typescript",
      {
        isTSX: true,
        allExtensions: true,
      },
    ],
    "@babel/preset-react",
  ],
};
