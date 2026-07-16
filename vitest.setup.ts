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

// jsdom (the test environment) does not implement IntersectionObserver,
// which framer-motion's `whileInView` prop depends on internally. Any
// component using `whileInView` (Reveal.tsx, StaggerHeading.tsx, and now
// Footer.tsx's mission-statement/wordmark entrance) throws
// "IntersectionObserver is not defined" on mount under jsdom without this
// stub. Previously only ReducedMotionMatrix.test.tsx defined a local
// version of this same stub; moved here globally so every test file gets
// it automatically instead of needing to remember to add its own — this
// class of failure (a whileInView component breaking an unrelated test
// file that merely renders it, e.g. via Footer) has already recurred once
// in this codebase's history.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
  takeRecords = () => [];
}

if (typeof globalThis.IntersectionObserver === "undefined") {
  globalThis.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
}
