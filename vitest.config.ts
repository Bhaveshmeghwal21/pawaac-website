import { defineConfig } from "vitest/config";

// Minimal Vitest setup — no test runner was previously configured in this
// repo. This config only needs Node environment (no DOM) for the current
// token-migration test, which reads globals.css as plain text.
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
