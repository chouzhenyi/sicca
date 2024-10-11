/** @format */

import esbuild from "esbuild";
import baseConf from "./base.conf.mjs";

const devStart = async () => {
  const context = await esbuild.context({
    ...baseConf,
    sourcemap: "both",
  });
  // 使用上下文，开启监听
  await context.watch({});
  // 开启一个服务
  const { host, port } = await context.serve({
    servedir: "dist",
    port: 8080,
    host: "127.0.0.1",
  });
  console.log(`Serve is listening on http://${host}:${port}`);
};

devStart();
