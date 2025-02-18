import { sassPlugin } from "esbuild-sass-plugin";
import { defineConfig } from "tsup";

export default defineConfig(({ watch }) => [
  {
    entry: ["server/src/index.ts"],
    outDir: "server/dist",
    format: "esm",
    platform: "node",
    minify: !watch,
    onSuccess: watch ? "npm start" : undefined
  },
  {
    entry: ["client/ts/main.ts"],
    outDir: "client/bundle",
    format: "esm",
    platform: "browser",
    minify: !watch,
    tsconfig: "client/tsconfig.json",
    inject: ["client/ts/_inject.ts"],
    esbuildPlugins: [
      sassPlugin({
        filter: /\.module\.scss$/,
        type: "local-css"
      }),
      sassPlugin()
    ]
  }
]);