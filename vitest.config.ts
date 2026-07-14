import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Vitest setup — the default environment stays "node" since the majority of
// existing tests (globals.css text checks, pure validator/property tests)
// need no DOM. Component-rendering tests that need a DOM (React Testing
// Library) opt into jsdom on a per-file basis via a
// `// @vitest-environment jsdom` control comment at the top of the file,
// rather than switching the whole suite to jsdom — see
// https://vitest.dev/guide/environment for the per-file override mechanism.
export default defineConfig({
  resolve: {
    alias: {
      // Mirrors tsconfig.json's "@/*" -> "./src/*" path alias so component
      // tests can import components the same way the app does.
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    setupFiles: ["./vitest.setup.ts"],
  },
});
