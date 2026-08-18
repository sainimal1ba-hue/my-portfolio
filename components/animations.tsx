"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ── Treatment 3: Clip-path wipe eyebrow ── */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="mb-4">
      <motion.span
        className="inline-block text-xs tracking-[0.2em] uppercase"
        style={{
          color: "#7DD3FC",
          clipPath: isInView ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          transition: "clip-path 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      >
        {children}
      </motion.span>
    </div>
  );
}

/* ── Treatment 4: Blur-to-sharp section title ── */
export function SectionTitle({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.h2
      ref={ref}
      className="mb-8 text-4xl font-light lowercase tracking-wide md:text-5xl lg:text-6xl"
      style={{ color: "rgba(237, 240, 242, 0.9)" }}
      initial={{ filter: "blur(8px)", opacity: 0 }}
      animate={
        isInView
          ? { filter: "blur(0px)", opacity: 1 }
          : { filter: "blur(8px)", opacity: 0 }
      }
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.h2>
  );
}

/* ── Treatment 5: Simple body fade+rise ── */
export function BodyText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Treatment 7: Section container reveal ── */
export function SectionContainer({
  children,
  id,
  className = "",
  slow = false,
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
  slow?: boolean;
}) {
  return (
    <motion.section
      id={id}
      className={`relative py-24 md:py-32 ${className}`}
      style={{ background: "#050505" }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: slow ? 1.2 : 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="mx-auto max-w-4xl px-6 md:px-8 lg:max-w-5xl">
        {children}
      </div>
    </motion.section>
  );
}

/* ── Treatment 6: Staggered grid item ── */
export function StaggeredItem({
  children,
  index,
  className = "",
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 12, scale: 0.97 }
      }
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
