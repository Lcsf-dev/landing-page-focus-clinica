import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

const sharedTestOptions = {
  environment: "node",
  globals: false,
  clearMocks: true,
  restoreMocks: true,
};

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
    projects: [
      {
        test: {
          ...sharedTestOptions,
          name: "unit",
          include: ["tests/unit/**/*.spec.{js,mjs}"],
        },
      },
      {
        test: {
          ...sharedTestOptions,
          name: "integration",
          include: ["tests/integration/**/*.spec.{js,mjs}"],
        },
      },
      {
        test: {
          ...sharedTestOptions,
          name: "build",
          include: ["tests/build/**/*.spec.{js,mjs}"],
        },
      },
    ],

    coverage: {
      include: ["js/**/*.{js,mjs}", "utils/**/*.{js,mjs}"],
      exclude: [
        "js/main.js",
        "js/menu.js",
        "js/demo-tabs.js",
        "js/image-viewer.js",
        "js/reveal-animations.js",
      ],
    },
  },
});
