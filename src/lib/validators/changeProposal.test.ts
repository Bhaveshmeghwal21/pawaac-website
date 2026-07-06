import { describe, expect, it } from "vitest";
import fc from "fast-check";
import {
  isChangeProposalValid,
  isTaskReady,
  type ChangeProposal,
} from "./changeProposal";

// Spec: pawaac-design-language-evolution — Task 30.1
// Requirements: 7.1, 7.2, 7.3
// Design: design.md -> Correctness Properties -> Property 9

const decisionArb: fc.Arbitrary<ChangeProposal["decision"]> =
  fc.constantFrom("approved", "rejected", "open");

const proposalArb: fc.Arbitrary<ChangeProposal> = fc.record({
  id: fc.string({ minLength: 1, maxLength: 10 }),
  decision: decisionArb,
  question: fc.option(fc.string({ maxLength: 30 }), { nil: undefined }),
});

describe("isTaskReady", () => {
  it("returns true for an empty list of linked proposals", () => {
    expect(isTaskReady([])).toBe(true);
  });

  it("returns true when every linked proposal is approved", () => {
    expect(
      isTaskReady([
        { id: "OCP-01", decision: "approved" },
        { id: "OCP-02", decision: "approved" },
      ]),
    ).toBe(true);
  });

  it("returns false when at least one linked proposal is open", () => {
    expect(
      isTaskReady([
        { id: "OCP-01", decision: "approved" },
        { id: "OCP-02", decision: "open", question: "Which figure?" },
      ]),
    ).toBe(false);
  });

  // Feature: pawaac-design-language-evolution, Property 9: For any implementation task linked to a set of ChangeProposal records, the task is ready to begin if and only if every linked ChangeProposal has decision = "approved"; for all ChangeProposal records with decision = "open", the question field is non-empty.
  it("property: isTaskReady matches the every-approved rule for random proposal arrays", () => {
    fc.assert(
      fc.property(fc.array(proposalArb, { maxLength: 20 }), (proposals) => {
        const expected = proposals.every((p) => p.decision === "approved");
        expect(isTaskReady(proposals)).toBe(expected);
      }),
    );
  });
});

describe("isChangeProposalValid", () => {
  it("returns false for an open proposal with no question", () => {
    expect(isChangeProposalValid({ id: "OCP-01", decision: "open" })).toBe(
      false,
    );
  });

  it("returns false for an open proposal with an empty question", () => {
    expect(
      isChangeProposalValid({ id: "OCP-01", decision: "open", question: "" }),
    ).toBe(false);
  });

  it("returns true for an open proposal with a non-empty question", () => {
    expect(
      isChangeProposalValid({
        id: "OCP-01",
        decision: "open",
        question: "Which asset path?",
      }),
    ).toBe(true);
  });

  it("returns true for an approved proposal with no question", () => {
    expect(isChangeProposalValid({ id: "OCP-01", decision: "approved" })).toBe(
      true,
    );
  });

  // Feature: pawaac-design-language-evolution, Property 9: For any implementation task linked to a set of ChangeProposal records, the task is ready to begin if and only if every linked ChangeProposal has decision = "approved"; for all ChangeProposal records with decision = "open", the question field is non-empty.
  it("property: isChangeProposalValid matches the open-requires-non-empty-question rule for random proposals", () => {
    fc.assert(
      fc.property(proposalArb, (proposal) => {
        const expected =
          proposal.decision !== "open" ||
          (proposal.question !== undefined && proposal.question.length > 0);
        expect(isChangeProposalValid(proposal)).toBe(expected);
      }),
    );
  });
});
