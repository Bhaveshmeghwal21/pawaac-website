// Spec: pawaac-design-language-evolution — Task 30
// Requirements: 7.1, 7.2, 7.3
// Design: design.md -> Data Models -> ChangeProposal; Correctness
//   Properties -> Property 9 "Change_Proposal gating correctness"
//
// Pure validator functions backing Property 9. Intentionally
// dependency-free and side-effect-free.

/**
 * A ChangeProposal record, as defined in design.md's Data Models. Only the
 * fields relevant to Property 9 (task-readiness gating and open-decision
 * question requirement) are required here; other ChangeProposal fields
 * (description, relatedSection, blocksTask) are omitted since they are not
 * consumed by this validator.
 */
export type ChangeProposal = {
  id: string;
  decision: "approved" | "rejected" | "open";
  question?: string;
};

/**
 * Returns true iff every ChangeProposal in `linkedProposals` has
 * `decision === "approved"`, per design.md's Property 9: "the task is
 * ready to begin if and only if every linked ChangeProposal has
 * decision = 'approved'." Vacuously true for an empty list (a task with no
 * linked proposals is not gated).
 */
export function isTaskReady(linkedProposals: ChangeProposal[]): boolean {
  return linkedProposals.every((p) => p.decision === "approved");
}

/**
 * Returns true iff the given ChangeProposal complies with design.md's
 * Property 9's second clause: "for all ChangeProposal records with
 * decision = 'open', the question field is non-empty." Proposals whose
 * decision is `"approved"` or `"rejected"` are unconstrained by this rule.
 */
export function isChangeProposalValid(proposal: ChangeProposal): boolean {
  return (
    proposal.decision !== "open" ||
    (proposal.question !== undefined && proposal.question.length > 0)
  );
}
