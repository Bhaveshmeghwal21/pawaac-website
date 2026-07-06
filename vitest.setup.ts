// Global Vitest setup. Extends expect() with jest-dom matchers
// (toBeInTheDocument, toHaveAttribute, etc.) for the jsdom-environment
// component tests. This import is a no-op for node-environment tests since
// they don't render DOM nodes or use these matchers.
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// @testing-library/react's automatic afterEach(cleanup) registration relies
// on detecting a global `afterEach` (i.e. `test.globals: true`). This repo
// keeps globals off and imports test functions explicitly, so cleanup is
// registered here instead — without it, DOM nodes from one test's render()
// call would leak into the next test in the same file.
afterEach(() => {
  cleanup();
});
