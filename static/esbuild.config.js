import { build } from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";

await build({
  entryPoints: [
    "static/ts/main.ts"
  ],
  outdir: "static/bundle",
  bundle: true,
  treeShaking: true,
  inject: ["static/ts/jsx.ts"],
  format: "esm",
  minify: true,
  tsconfig: "static/tsconfig.json",
  plugins: [
    sassPlugin()
  ]
});