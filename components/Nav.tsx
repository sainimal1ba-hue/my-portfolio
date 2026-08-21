"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "challenges", label: "Challenges" },
  { id: "contact", label: "Contact" },
];

export default function Nav({ isCinematicComplete = false }: { isCinematicComplete?: boolean }) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position for adaptive glass opacity
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionEls = sections.map((s) => document.getElementById(s.id));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
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

  // Adaptive glass: more transparent over dark hero, slightly more opaque over content
  const isOverHero = scrollY < (typeof window !== "undefined" ? window.innerHeight * 0.8 : 600);
  const glassBg = isOverHero
    ? "rgba(5, 5, 5, 0.35)"
    : "rgba(5, 5, 5, 0.65)";
  const glassBlur = isOverHero ? "blur(16px)" : "blur(20px)";
  const glassBorder = isOverHero
    ? "1px solid rgba(237, 240, 242, 0.04)"
    : "1px solid rgba(237, 240, 242, 0.06)";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        opacity: isCinematicComplete ? 1 : 0,
        pointerEvents: isCinematicComplete ? "auto" : "none",
        background: glassBg,
        backdropFilter: glassBlur,
        WebkitBackdropFilter: glassBlur,
        borderBottom: glassBorder,
        boxShadow: isOverHero
          ? "0 1px 8px rgba(0, 0, 0, 0.15)"
          : "0 1px 12px rgba(0, 0, 0, 0.25)",
        transition: "opacity 1s ease, background 0.6s ease, backdrop-filter 0.6s ease, border-bottom 0.6s ease, box-shadow 0.6s ease",
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        {/* Name mark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm tracking-[0.15em] uppercase transition-opacity duration-300 hover:opacity-70"
          style={{ color: "rgba(237, 240, 242, 0.9)" }}
          aria-label="Scroll to top"
        >
          SAINIMAL G E
        </button>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className="group relative flex flex-col items-center gap-0.5 text-xs tracking-[0.12em] transition-all duration-300"
                style={{
                  color: isActive
                    ? "#7DD3FC"
                    : "rgba(237, 240, 242, 0.5)",
                }}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="transition-colors duration-300 group-hover:text-[rgba(237,240,242,0.85)]">
                  {section.label}
                </span>
                {/* Subtle underline indicator */}
                <motion.span
                  animate={{
                    scaleX: isActive ? 1 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="block h-[1px] w-full origin-center"
                  style={{ backgroundColor: "#7DD3FC" }}
                />
              </button>
            );
          })}
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

      {/* Mobile menu — glass panel */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden md:hidden"
            style={{
              background: "rgba(5, 5, 5, 0.85)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderTop: "1px solid rgba(237, 240, 242, 0.05)",
            }}
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm tracking-[0.1em] transition-colors"
                    style={{
                      color: isActive
                        ? "#7DD3FC"
                        : "rgba(237, 240, 242, 0.5)",
                      background: isActive
                        ? "rgba(125, 211, 252, 0.05)"
                        : "transparent",
                    }}
                  >
                    {isActive && (
                      <span
                        className="block h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: "#7DD3FC" }}
                      />
                    )}
                    {section.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
