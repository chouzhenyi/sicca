/** @format */

import esbuild from "esbuild";
import baseConf from "./base.conf.mjs";

const deployBuild = async () => {
  const build = await esbuild.build({
    ...baseConf,
    // sourcemap: "both",
    metafile: true,
    minify: true,
  });

  const metafileText = await esbuild.analyzeMetafile(build.metafile);
  console.log("metafileText", metafileText);
};

deployBuild();
