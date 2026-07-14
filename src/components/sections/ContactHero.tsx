// Spec: pawaac-design-language-evolution — Task 14 (Contact_Page Section 1)
// Requirements: 1.1, 1.4, 4.1, 9.1
// Design: design.md -> Page Specifications -> Contact_Page, Section 1
//         (Contact hero)
//
// Persona: Both. Applies the Display_Type oversized background-texture
// pattern (P1), purely decorative (aria-hidden, per Requirement 10.6). The
// Reticle_Frame around the form container itself is rendered inside
// ContactForm.tsx (via Uplink_Form's `withReticle` prop) rather than here,
// since the frame wraps the form element specifically. This is a net-new
// hero built for the dedicated `/contact` route — it does not modify or
// reuse markup from src/components/sections/Contact.tsx, which continues
// to render unchanged on the Homepage until task 16.
export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-bg px-6 pb-8 pt-28 md:pt-36">
      {/* Display_Type oversized background texture (Pattern 1) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-6 select-none text-center font-display text-[18vw] font-bold uppercase leading-none text-fg/[0.04] md:top-10"
      >
        UPLINK
      </span>

      <div className="relative z-10 mx-auto max-w-3xl">
        <p className="label">Contact</p>
        <h1 className="mt-3 text-heading font-display text-fg">
          Request a demo
        </h1>
        <p className="mt-4 max-w-md text-body font-body text-muted">
          Tell us about your deployment and we&apos;ll follow up.
        </p>

        <div className="mt-8 space-y-2 technical-data text-muted">
          <p>kshitij@pawaac.com</p>
          <p>+91 76739 43461</p>
          <p>Jayanagar, Bengaluru 560011</p>
        </div>
      </div>
    </section>
  );
}
