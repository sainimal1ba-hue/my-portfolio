"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "./animations";

interface ContactLink {
  label: string;
  href: string;
}

const contactLinks: ContactLink[] = [
  {
    label: "sainimal1ba@gmail.com",
    href: "mailto:sainimal1ba@gmail.com",
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
    label: "GitHub (coming soon)",
    href: "#",
  },
];

export default function Contact() {
  return (
    <SectionContainer id="contact" className="min-h-screen flex flex-col justify-center">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.6 } },
        }}
        className="flex flex-col"
      >
        <div className="mb-4">
          <motion.span
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 1.4, ease: "easeOut" } },
            }}
            className="inline-block text-xs tracking-[0.2em] uppercase font-medium"
            style={{ color: "rgba(125, 211, 252, 0.7)" }}
          >
            06 — Contact
          </motion.span>
        </div>

        <motion.h2
          variants={{
            hidden: { opacity: 0, filter: "blur(8px)" },
            visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 1.4, ease: "easeOut" } },
          }}
          className="mb-16 text-4xl md:text-5xl lg:text-7xl font-light tracking-wide"
          style={{ color: "rgba(237, 240, 242, 0.9)" }}
        >
          Let&apos;s Talk
        </motion.h2>

        <div className="space-y-12">
          {/* Primary CTA — Email */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 1.4, ease: "easeOut" } },
            }}
          >
            <a
              href={contactLinks[0].href}
              className="group inline-block text-2xl font-light tracking-wide transition-opacity duration-700 md:text-4xl lg:text-5xl hover:opacity-70"
              style={{ color: "#7DD3FC" }}
            >
              {contactLinks[0].label}
            </a>
          </motion.div>

          {/* Other links */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 1.4, ease: "easeOut" } },
            }}
            className="space-y-4 pt-4"
          >
            {contactLinks.slice(1).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex items-center gap-4 text-sm tracking-wide transition-colors duration-500 hover:text-[rgba(237,240,242,0.9)]"
                style={{ color: "rgba(237, 240, 242, 0.5)" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* Location */}
          <motion.p
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 1.4, ease: "easeOut" } },
            }}
            className="pt-8 text-xs tracking-[0.15em] uppercase"
            style={{ color: "rgba(237, 240, 242, 0.3)" }}
          >
            Tamil Nadu, India
          </motion.p>
        </div>

        {/* Footer */}
        <motion.footer
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 1.4, delay: 0.8, ease: "easeOut" } },
          }}
          className="mt-32 border-t pt-8"
          style={{ borderColor: "rgba(237, 240, 242, 0.05)" }}
        >
          <p
            className="text-[10px] tracking-[0.15em]"
            style={{ color: "rgba(237, 240, 242, 0.2)" }}
          >
            © {new Date().getFullYear()} sainimal g e
          </p>
        </motion.footer>
      </motion.div>
    </SectionContainer>
  );
}
