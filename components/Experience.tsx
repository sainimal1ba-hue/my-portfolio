"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  SectionContainer,
  Eyebrow,
  SectionTitle,
  BodyText,
} from "./animations";

const experienceData = [
  {
    role: "Student Intern",
    company: "CecureUs",
    location: "Tamil Nadu, India",
    period: "June 2026 – Present",
    bullets: [
      "Built a cross-platform mobile app for iOS and Android using React Native and TypeScript, cutting development time by 50% compared to maintaining separate native codebases.",
      "Integrated a locally-hosted LLaMA model into the app's backend to power an AI support assistant, reducing average response time to under 20 seconds.",
      "Integrated the WhatsApp Business API to deliver real-time notifications, increasing user engagement/response rate by 10%.",
    ],
  },
];

export default function Experience() {
  const glowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <SectionContainer id="experience">
      <div ref={sectionRef}>
        <Eyebrow>02 — experience</Eyebrow>
        <SectionTitle>experience</SectionTitle>

        <div className="mt-8 space-y-6">
          {experienceData.map((entry, idx) => (
            <motion.div
              key={idx}
              className="group relative rounded-xl border p-6 md:p-8"
              style={{
                borderColor: "rgba(125, 211, 252, 0.15)",
                background: "rgba(125, 211, 252, 0.03)",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: idx * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {/* Left edge glow — this is the dot that will "travel" to Projects */}
              <div
                ref={glowRef}
                id="experience-glow-dot"
                className="absolute -left-px top-8 h-8 w-1 rounded-full"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, rgba(125, 211, 252, 0.5), transparent)",
                  boxShadow: "0 0 12px rgba(125, 211, 252, 0.2)",
                }}
              />

              <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3
                    className="text-lg font-medium lowercase tracking-wide"
                    style={{ color: "rgba(237, 240, 242, 0.9)" }}
                  >
                    {entry.role}
                  </h3>
                  <p
                    className="text-sm tracking-wide"
                    style={{ color: "#7DD3FC" }}
                  >
                    {entry.company}
                  </p>
                </div>
                <div className="mt-1 flex flex-col items-start md:mt-0 md:items-end">
                  <span
                    className="text-xs tracking-wider"
                    style={{ color: "rgba(237, 240, 242, 0.4)" }}
                  >
                    {entry.period}
                  </span>
                  <span
                    className="text-xs tracking-wider"
                    style={{ color: "rgba(237, 240, 242, 0.3)" }}
                  >
                    {entry.location}
                  </span>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {entry.bullets.map((bullet, bIdx) => (
                  <BodyText key={bIdx}>
                    <li className="flex gap-3 text-sm leading-relaxed">
                      <span
                        className="mt-2 block h-1 w-1 shrink-0 rounded-full"
                        style={{ background: "rgba(125, 211, 252, 0.4)" }}
                      />
                      <span
                        className="font-serif"
                        style={{ color: "rgba(237, 240, 242, 0.57)" }}
                      >
                        {bullet}
                      </span>
                    </li>
                  </BodyText>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
