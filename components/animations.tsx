import React from "react";

/**
 * Purely structural layout container.
 * No framer-motion animations belong here.
 * Each section is responsible for its own motion signatures.
 */
export function SectionContainer({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative py-24 md:py-32 ${className}`}
      style={{ background: "#050505" }}
    >
      <div className="mx-auto max-w-4xl px-6 md:px-8 lg:max-w-5xl">
        {children}
      </div>
    </section>
  );
}
