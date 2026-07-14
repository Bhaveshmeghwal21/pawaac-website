import type { Metadata } from "next";

// Spec: pawaac-design-language-evolution — Task 14 (Contact_Page route)
// Requirements: 1.1, 1.4, 4.1, 9.1
// Design: design.md -> Page Specifications -> Contact_Page
//
// Establishes the new, dedicated `/contact` route. The contact form is
// migrated here (restyled with the Uplink_Form shell) from the homepage
// anchor section — src/components/sections/Contact.tsx itself is left
// untouched and continues to render on the Homepage until task 16 removes
// it there. Content is composed from two new section components
// (ContactHero, ContactForm) built fresh for this route, per design.md's
// Contact_Page table. Persona ordering: both sections are tagged "Both",
// so the ordering constraint from Property 7 is trivially satisfied.
import ContactHero from "@/components/sections/ContactHero";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact · PAWAAC Drones",
  description: "Tell us about your deployment and we'll follow up.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
    </>
  );
}
