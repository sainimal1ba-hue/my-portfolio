"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
          className="mb-12 text-4xl md:text-5xl lg:text-6xl font-light tracking-wide"
          style={{ color: "rgba(237, 240, 242, 0.9)" }}
        >
          About
        </motion.h2>

        {/* Two-column layout: copy + portrait */}
        <div className="flex flex-col-reverse md:flex-row md:gap-16 lg:gap-24 items-start">
          {/* Left: About copy */}
          <motion.div
            variants={{
              hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0.4 },
              visible: {
                clipPath: "inset(0 0 0% 0)",
                opacity: 1,
                transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }
              },
            }}
            className="flex-1 mt-10 md:mt-0"
          >
            <p
              className="font-serif text-lg leading-[1.8] md:text-xl lg:text-[22px]"
              style={{
                color: "rgba(237, 240, 242, 0.75)",
                maxWidth: "55ch",
              }}
            >
              I&apos;m Sainimal G E — a second-year Information Technology student at
              St. Joseph&apos;s Institute of Technology, Chennai, and an Oracle
              Foundations Associate. I build accessible, intelligent software that
              solves real problems, from AI-powered accessibility auditing platforms
              to decentralized competitive-programming trackers. I&apos;ve contributed
              to open-source projects like Sugar OS and interned where my work was
              recognized by senior leadership. I&apos;m driven by curiosity, thrive in
              teams, and learn fast.
            </p>
          </motion.div>

          {/* Right: Portrait placeholder */}
          {/*
            To replace the placeholder with your real portrait:
            1. Place your photo at: /public/images/profile/portrait.jpg
            2. Change the src below from the SVG to "/images/profile/portrait.jpg"
            That's it — no component changes needed.
          */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.97 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }
              },
            }}
            className="relative w-full md:w-[280px] lg:w-[320px] shrink-0 overflow-hidden rounded-lg"
            style={{
              aspectRatio: "3 / 4",
              border: "1px solid rgba(237, 240, 242, 0.06)",
            }}
          >
            <Image
              src="/images/profile/portrait-placeholder.svg"
              alt="Portrait of Sainimal G E — placeholder for professional photo"
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 320px"
            />
          </motion.div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
