"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  SectionContainer,
  Eyebrow,
  SectionTitle,
} from "./animations";

interface ContactLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
  primary?: boolean;
}

const contactLinks: ContactLink[] = [
  {
    label: "sainimal1ba@gmail.com",
    href: "mailto:sainimal1ba@gmail.com",
    primary: true,
  },
  {
    label: "linkedin.com/in/sainimal-g-e-503345387",
    href: "https://linkedin.com/in/sainimal-g-e-503345387",
  },
  {
    label: "www.sainimal.com",
    href: "https://www.sainimal.com",
  },
  {
    label: "github (coming soon)",
    href: "#",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <SectionContainer id="contact" slow>
      <div ref={ref}>
        <Eyebrow>06 — contact</Eyebrow>
        <SectionTitle>let&apos;s talk</SectionTitle>

        <div className="mt-8 space-y-6">
          {/* Primary CTA — Email */}
          <motion.a
            href="mailto:sainimal1ba@gmail.com"
            className="group inline-block text-2xl font-light lowercase tracking-wide transition-all duration-300 md:text-3xl lg:text-4xl"
            style={{ color: "#7DD3FC" }}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ x: 4 }}
          >
            <span className="border-b border-[rgba(125,211,252,0.2)] pb-1 transition-all duration-300 group-hover:border-[rgba(125,211,252,0.5)]">
              sainimal1ba@gmail.com
            </span>
          </motion.a>

          {/* Other links */}
          <motion.div
            className="space-y-3 pt-4"
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {contactLinks.slice(1).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex items-center gap-3 text-sm tracking-wide transition-colors duration-300 hover:text-[rgba(237,240,242,0.8)]"
                style={{ color: "rgba(237, 240, 242, 0.45)" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span
                  className="block h-px w-4 transition-all duration-300 group-hover:w-6"
                  style={{ background: "rgba(125, 211, 252, 0.3)" }}
                />
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* Location */}
          <motion.p
            className="pt-6 text-xs tracking-[0.15em]"
            style={{ color: "rgba(237, 240, 242, 0.25)" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Tamil Nadu, India
          </motion.p>
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-24 border-t pt-8"
          style={{ borderColor: "rgba(237, 240, 242, 0.05)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p
            className="text-[10px] tracking-[0.15em] lowercase"
            style={{ color: "rgba(237, 240, 242, 0.2)" }}
          >
            © {new Date().getFullYear()} sainimal g e
          </p>
        </motion.footer>
      </div>
    </SectionContainer>
  );
}
