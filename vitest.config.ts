import path from "path";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports: ["vitest"],
      dts: "./src/auto-imports.d.ts",
    }),
  ],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "./src/setupTests.ts",
    include: ["**/*(*.)?{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./test-results/unit/coverage",
    },
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  root: path.resolve(__dirname, "."),
});