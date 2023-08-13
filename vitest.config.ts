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
      reporter: ["text", "json", "json-summary", "html", "lcov", "clover"],
      reportsDirectory: "./test-results/unit",
      lines: 60,
      branches: 60,
      functions: 60,
      statements: 60,
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
