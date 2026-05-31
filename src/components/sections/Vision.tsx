"use client";

import { motion } from "framer-motion";

export default function Vision() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-bg px-6 py-28">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/videos/vision_poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/vision.webm" type="video/webm" />
        <source src="/videos/vision.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#15171c,#080808)] opacity-90" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <p className="label">The Long Game</p>
        <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-fg md:text-5xl lg:text-6xl">
          PAWAAC is to physical security what maps are to navigation.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-muted">
          The data layer for physical security, embedded into cities, borders,
          and infrastructure, turning observation into continuous security
          intelligence.
        </p>
        <span className="mx-auto my-8 block h-px w-20 bg-fg/40" />
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="bg-red px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Request a Demo
          </a>
          <a
            href="#contact"
            className="border border-red px-6 py-3 text-sm font-semibold text-red transition hover:bg-red hover:text-white"
          >
            Talk to Investors
          </a>
        </div>
      </motion.div>
    </section>
  );
}
