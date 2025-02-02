import * as path from "node:path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  esbuild: {
    target: "es2020",
  },
  optimizeDeps: {
    // exclude: ["bun:sqlite"]
  },
  resolve: {
    alias: {
      "@effect/eslint-plugin/test": path.join(__dirname, "test"),
      "@effect/eslint-plugin": path.join(__dirname, "src"),
    },
  },
  test: {
    // setupFiles: [path.join(__dirname, "setupTests.ts")],
    fakeTimers: {
      toFake: undefined,
    },
    sequence: {
      concurrent: true,
    },
    include: ["test/**/*.test.ts"],
  },
})
