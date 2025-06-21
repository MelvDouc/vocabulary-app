import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server/index.ts"],
  outDir: "dist",
  format: "esm",
  platform: "node",
  treeshake: true,
  tsconfig: "src/server/tsconfig.json",
  external: ["vite"]
});