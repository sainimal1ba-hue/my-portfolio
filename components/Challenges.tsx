"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "./animations";

interface Challenge {
  platform: string;
  title: string;
  difficulty: string;
  approach?: string;
  link: string;
}

const challenges: Challenge[] = [
  {
    platform: "LeetCode",
    title: "[Placeholder] — waiting for auto-tracker integration",
    difficulty: "Hard",
    approach: "Approach notes will be pulled from tracker",
    link: "#",
  },
  {
    platform: "Codeforces",
    title: "[Placeholder] — waiting for auto-tracker integration",
    difficulty: "2100",
    approach: "Approach notes will be pulled from tracker",
    link: "#",
  },
  {
    platform: "AtCoder",
    title: "[Placeholder] — waiting for auto-tracker integration",
    difficulty: "ABC-F",
    approach: "Approach notes will be pulled from tracker",
    link: "#",
  },
];

export default function Challenges() {
  return (
    <SectionContainer id="challenges">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } },
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
            05 — Challenges
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
          Challenges
        </motion.h2>

        <motion.p
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.6 } },
          }}
          className="mb-8 font-serif text-base leading-relaxed md:text-lg"
          style={{ color: "rgba(237, 240, 242, 0.55)", maxWidth: "60ch" }}
        >
          The harder problems, solved — pulled from LeetCode, Codeforces, and AtCoder.
        </motion.p>

        <div className="flex flex-col">
          {challenges.map((challenge, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.8, delayChildren: 0.2, staggerChildren: 0.1 } },
              }}
              className="group relative flex flex-col gap-4 py-8 md:flex-row md:items-start md:justify-between transition-colors hover:bg-[rgba(125,211,252,0.015)]"
            >
              {/* Horizontal Wipe Line */}
              <motion.div
                variants={{
                  hidden: { scaleX: 0, transformOrigin: "left" },
                  visible: { scaleX: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
                }}
                className="absolute top-0 left-0 right-0 h-px bg-[rgba(237,240,242,0.1)]"
              />

              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 flex-grow">
                {/* Index Number */}
                <motion.span
                  variants={{
                    hidden: { opacity: 0, x: -5 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                  }}
                  className="text-xs font-mono tracking-widest shrink-0 mt-1"
                  style={{ color: "rgba(237, 240, 242, 0.3)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>
                
                <div>
                  <motion.h3
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
                    }}
                    className="text-lg font-medium tracking-wide md:text-xl"
                    style={{ color: "rgba(237, 240, 242, 0.9)" }}
                  >
                    {challenge.title}
                  </motion.h3>
                  
                  {challenge.approach && (
                    <motion.p
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { duration: 0.6 } },
                      }}
                      className="mt-2 font-serif text-sm leading-relaxed"
                      style={{ color: "rgba(237, 240, 242, 0.6)" }}
                    >
                      {challenge.approach}
                    </motion.p>
                  )}
                </div>
              </div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 10 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
                }}
                className="flex items-center gap-6 mt-4 md:mt-0 shrink-0"
              >
                <div className="flex flex-col items-start md:items-end gap-1 text-sm tracking-wide">
                  <span style={{ color: "#7DD3FC" }}>{challenge.platform}</span>
                  <span style={{ color: "rgba(237, 240, 242, 0.4)" }}>{challenge.difficulty}</span>
                </div>
                
                <a
                  href={challenge.link}
                  className="opacity-40 hover:opacity-100 transition-opacity p-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View challenge"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M3 9L9 3M9 3H4M9 3V8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          ))}
          {/* Final closing line */}
          <motion.div
            variants={{
              hidden: { scaleX: 0, transformOrigin: "left" },
              visible: { scaleX: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
            }}
            className="h-px bg-[rgba(237,240,242,0.1)] w-full"
          />
        </div>
      </motion.div>
    </SectionContainer>
  );
}
