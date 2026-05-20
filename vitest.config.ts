import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/__tests__/setup.ts"],
    typecheck: {
      tsconfig: "./tsconfig.test.json",
    },
  },
});
