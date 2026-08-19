"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "./animations";

export default function About() {
  return (
    <SectionContainer id="about">
      {/* Editorial Mask / Focus Reveal Sequence */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
        className="flex flex-col"
      >
        {/* Eyebrow: Clips in horizontally */}
        <div className="overflow-hidden mb-4">
          <motion.span
            variants={{
              hidden: { x: "-100%", opacity: 0 },
              visible: { x: "0%", opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
            }}
            className="inline-block text-xs tracking-[0.2em] uppercase font-medium"
            style={{ color: "rgba(125, 211, 252, 0.7)" }}
          >
            01 — About
          </motion.span>
        </div>

        {/* Heading: Resolves from blur */}
        <motion.h2
          variants={{
            hidden: { filter: "blur(12px)", opacity: 0, y: 10 },
            visible: { filter: "blur(0px)", opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
          }}
          className="mb-8 text-4xl md:text-5xl lg:text-6xl font-light tracking-wide"
          style={{ color: "rgba(237, 240, 242, 0.9)" }}
        >
          About
        </motion.h2>

        {/* Paragraph: Masked vertical crop and subtle opacity transition */}
        <motion.div
          variants={{
            hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0.4 },
            visible: { 
              clipPath: "inset(0 0 0% 0)", 
              opacity: 1,
              transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] } 
            },
          }}
        >
          <p
            className="font-serif text-lg leading-[1.8] md:text-xl lg:text-[22px]"
            style={{
              color: "rgba(237, 240, 242, 0.75)",
              maxWidth: "65ch",
            }}
          >
            Computer science student at St. Joseph&apos;s Institute of Technology,
            currently building things as a student intern at CecureUs. Most of
            what&apos;s below is what happens after the part nobody sees — sitting
            down, going quiet, and staying there until a WCAG scan stops taking
            too long, or a competitive-programming tracker stops needing the same
            data typed in three times, or a support inbox actually gets faster.
            IEEE student member; occasional NGO and industrial-visit volunteer.
          </p>
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}
