import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  root: import.meta.dirname,

  build: {
    outDir: "dist",
    emptyOutDir: true,

    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
      },
    },
  },

  test: {
    environment: "node",
    include: [
      "tests/unit/**/*.spec.{js,mjs}",
      "tests/integration/**/*.spec.{js,mjs}",
    ],
    globals: false,
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      include: ["js/**/*.{js,mjs}", "utils/**/*.{js,mjs}"],
      exclude: ["src/**/*.spec.{js,mjs}", "src/**/main.{js,mjs}"],
    },
  },
});
