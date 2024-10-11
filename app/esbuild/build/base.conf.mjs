/** @format */

import esbuildPluginVue3 from "esbuild-plugin-vue3";
import LessNpmImport from "less-plugin-npm-import";
import { lessLoader } from "esbuild-plugin-less";
import alias from "esbuild-plugin-alias";
import path from "path";
import url from "url";

const __dirname = url.fileURLToPath(new URL("../", import.meta.url));
export default {
  entryPoints: ["src/index.ts"],
  bundle: true,
  outdir: "dist",
  plugins: [
    esbuildPluginVue3({
      generateHTML: "public/index.html",
    }),
    lessLoader({
      javascriptEnabled: true,
      plugins: [
        new LessNpmImport({ prefix: "~" }),
        alias({
          "@": path.resolve(__dirname, "src"),
          // "@": "../src",
        }),
      ],
    }),
  ],
  alias: {
    "@": "src",
  },
};
