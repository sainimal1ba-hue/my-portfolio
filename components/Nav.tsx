"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "skills" },
  { id: "challenges", label: "challenges" },
  { id: "contact", label: "contact" },
];

export default function Nav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById("hero-wrapper");
    const sectionEls = sections.map((s) => document.getElementById(s.id));

    // Track hero exit for scrim
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setIsPastHero(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );

    if (heroEl) heroObserver.observe(heroEl);

    // Track active section
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the one with highest intersection ratio
          const best = visible.reduce((a, b) =>
            a.intersectionRatio > b.intersectionRatio ? a : b
          );
          setActiveSection(best.target.id);
        }
      },
      { threshold: 0.15, rootMargin: "-80px 0px -40% 0px" }
    );

    sectionEls.forEach((el) => {
      if (el) sectionObserver.observe(el);
    });

    return () => {
      heroObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileOpen(false);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        opacity: isPastHero ? 1 : 0,
        pointerEvents: isPastHero ? "auto" : "none",
        background: "rgba(5, 5, 5, 0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        {/* Name mark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm tracking-[0.15em] lowercase transition-opacity hover:opacity-70"
          style={{ color: "rgba(237, 240, 242, 0.9)" }}
          aria-label="Scroll to top"
        >
          sainimal
        </button>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className="group relative flex items-center gap-2 text-xs tracking-[0.12em] lowercase transition-all duration-300"
              style={{
                color:
                  activeSection === section.id
                    ? "#7DD3FC"
                    : "rgba(237, 240, 242, 0.5)",
              }}
              aria-current={
                activeSection === section.id ? "true" : undefined
              }
            >
              {/* Active dot */}
              <AnimatePresence>
                {activeSection === section.id && (
                  <motion.span
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{
                      scale: [0.85, 1.15, 1],
                      opacity: 1,
                      filter: [
                        "brightness(1)",
                        "brightness(1.8)",
                        "brightness(1)",
                      ],
                    }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: "#7DD3FC" }}
                  />
                )}
              </AnimatePresence>
              <span className="transition-colors duration-300 group-hover:text-[rgba(237,240,242,0.8)]">
                {section.label}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileOpen}
        >
          <motion.span
            animate={isMobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-px w-5"
            style={{ backgroundColor: "rgba(237, 240, 242, 0.7)" }}
          />
          <motion.span
            animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block h-px w-5"
            style={{ backgroundColor: "rgba(237, 240, 242, 0.7)" }}
          />
          <motion.span
            animate={
              isMobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
            }
            className="block h-px w-5"
            style={{ backgroundColor: "rgba(237, 240, 242, 0.7)" }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden border-t border-[rgba(237,240,242,0.05)] md:hidden"
            style={{ background: "rgba(5, 5, 5, 0.9)" }}
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm tracking-[0.1em] lowercase transition-colors"
                  style={{
                    color:
                      activeSection === section.id
                        ? "#7DD3FC"
                        : "rgba(237, 240, 242, 0.5)",
                    background:
                      activeSection === section.id
                        ? "rgba(125, 211, 252, 0.05)"
                        : "transparent",
                  }}
                >
                  {activeSection === section.id && (
                    <span
                      className="block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: "#7DD3FC" }}
                    />
                  )}
                  {section.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
