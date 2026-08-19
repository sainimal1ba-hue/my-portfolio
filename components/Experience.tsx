"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "./animations";

const experienceData = [
  {
    role: "Student Intern",
    company: "CecureUs",
    location: "Tamil Nadu, India",
    period: "June 2026 — Present",
    description:
      "Built a cross-platform mobile app for iOS and Android using React Native and TypeScript, cutting development time by 50% compared to maintaining separate native codebases. Integrated a locally-hosted LLaMA model into the app's backend to power an AI support assistant, reducing average response time to under 20 seconds. Integrated the WhatsApp Business API to deliver real-time notifications, increasing user engagement and response rate by 10%.",
  },
];

export default function Experience() {
  return (
    <SectionContainer id="experience">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="flex flex-col"
      >
        <div className="mb-4">
          <motion.span
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.6 } },
            }}
            className="inline-block text-xs tracking-[0.2em] uppercase font-medium"
            style={{ color: "rgba(125, 211, 252, 0.7)" }}
          >
            02 — Experience
          </motion.span>
        </div>

        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="mb-12 text-4xl md:text-5xl lg:text-6xl font-light tracking-wide"
          style={{ color: "rgba(237, 240, 242, 0.9)" }}
        >
          Experience
        </motion.h2>

        <div className="mt-8 space-y-16">
          {experienceData.map((entry, idx) => (
            <div key={idx} className="relative pl-8 md:pl-10">
              {/* Vertical Timeline Draw */}
              <motion.div
                variants={{
                  hidden: { scaleY: 0, transformOrigin: "top" },
                  visible: { scaleY: 1, transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] } },
                }}
                className="absolute left-0 top-2 bottom-0 w-px bg-[rgba(237,240,242,0.1)]"
              />
              {/* Subtle Point Marker */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.4 } },
                }}
                className="absolute left-[-2.5px] top-2 h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "#7DD3FC" }}
              />

              {/* Role */}
              <motion.h3
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
                }}
                className="text-2xl font-medium tracking-wide mb-1"
                style={{ color: "rgba(237, 240, 242, 0.9)" }}
              >
                {entry.role}
              </motion.h3>

              {/* Company */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
                }}
                className="text-lg tracking-wide mb-3"
                style={{ color: "#7DD3FC" }}
              >
                {entry.company}
              </motion.p>

              {/* Metadata */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.6 } },
                }}
                className="flex flex-wrap gap-4 text-xs tracking-wider uppercase mb-6"
                style={{ color: "rgba(237, 240, 242, 0.4)" }}
              >
                <span>{entry.period}</span>
                <span>•</span>
                <span>{entry.location}</span>
              </motion.div>

              {/* Description */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
                }}
              >
                <p
                  className="font-serif text-base leading-relaxed md:text-lg"
                  style={{ color: "rgba(237, 240, 242, 0.6)", maxWidth: "60ch" }}
                >
                  {entry.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </SectionContainer>
  );
}
