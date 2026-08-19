"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "./animations";

interface SkillGroup {
  label: string;
  items: string[];
}

const skillGroups: SkillGroup[] = [
  {
    label: "Technical",
    items: ["Python", "Java", "C", "HTML", "CSS"],
  },
  {
    label: "Tools & Technologies",
    items: ["Git", "GitHub", "MySQL", "MongoDB"],
  },
  {
    label: "Also",
    items: ["Problem Solving", "Teamwork", "Adaptability", "Quick Learner"],
  },
];

export default function Skills() {
  return (
    <SectionContainer id="skills">
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
            04 — Skills
          </motion.span>
        </div>

        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="mb-16 text-4xl md:text-5xl lg:text-6xl font-light tracking-wide"
          style={{ color: "rgba(237, 240, 242, 0.9)" }}
        >
          Skills
        </motion.h2>

        <div className="flex flex-col gap-12 md:gap-16">
          {skillGroups.map((group, groupIdx) => (
            <motion.div
              key={group.label}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: groupIdx * 0.15 },
                },
              }}
              className="flex flex-col md:flex-row md:items-baseline md:gap-16"
            >
              <motion.h3
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
                }}
                className="mb-6 md:mb-0 w-48 shrink-0 text-sm font-medium tracking-wide uppercase"
                style={{ color: "rgba(237, 240, 242, 0.9)" }}
              >
                {group.label}
              </motion.h3>

              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {group.items.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={{
                      hidden: { opacity: 0, x: -5, filter: "blur(2px)" },
                      visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
                    }}
                    className="text-base tracking-wide"
                    style={{ color: "rgba(237, 240, 242, 0.65)" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionContainer>
  );
}
