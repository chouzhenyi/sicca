/** @format */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), ".", dir);
};
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: pathResolve("src") + "/",
      },
    ],
  },
  server: {
    host: true,
  },
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase", // 将类名转换为驼峰式
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, // 允许在LESS中使用JavaScript
      },
    },
  },
});
