import { join } from "node:path";
import { defineConfig } from "vite";

const ROOT = join(import.meta.dirname, "..", "..");

export default defineConfig({
  build: {
    outDir: join(ROOT, "dist")
  },
  resolve: {
    alias: {
      "$client": join(ROOT, "src", "client", "src")
    }
  }
});