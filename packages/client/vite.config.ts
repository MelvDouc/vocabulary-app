import { join } from "node:path";
import { defineConfig } from "vite";

const ROOT = import.meta.dirname;

export default defineConfig({
  build: {
    outDir: join(ROOT, "dist")
  },
  envDir: join(ROOT, "config"),
  resolve: {
    alias: {
      "$client": join(ROOT, "src")
    }
  },
  server: {
    host: true
  }
});