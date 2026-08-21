"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "./animations";
import { type IconType } from "react-icons";
import {
  SiPython,
  SiJavascript,
  SiC,
  SiHtml5,
  SiCss,
  SiGit,
  SiGithub,
  SiMysql,
  SiMongodb,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

interface Skill {
  name: string;
  icon?: IconType;
}

interface SkillGroup {
  label: string;
  items: Skill[];
}

const skillGroups: SkillGroup[] = [
  {
    label: "Technical",
    items: [
      { name: "Python", icon: SiPython },
      { name: "Java", icon: FaJava },
      { name: "C", icon: SiC },
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss },
      { name: "JavaScript", icon: SiJavascript },
    ],
  },
  {
    label: "Tools & Technologies",
    items: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "MySQL", icon: SiMysql },
      { name: "MongoDB", icon: SiMongodb },
    ],
  },
  {
    label: "Also",
    items: [
      { name: "Problem Solving" },
      { name: "Teamwork" },
      { name: "Adaptability" },
      { name: "Quick Learner" },
    ],
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

              <div className="flex flex-wrap gap-x-8 gap-y-5">
                {group.items.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <motion.span
                      key={skill.name}
                      variants={{
                        hidden: { opacity: 0, x: -5, filter: "blur(2px)" },
                        visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
                      }}
                      className="group flex items-center gap-2 text-base tracking-wide transition-all duration-300 hover:brightness-125 hover:-translate-y-px cursor-default"
                      style={{ color: "rgba(237, 240, 242, 0.65)" }}
                    >
                      {Icon && (
                        <Icon
                          size={22}
                          className="shrink-0 transition-all duration-300 group-hover:text-[rgba(237,240,242,0.9)]"
                          style={{ color: "rgba(237, 240, 242, 0.45)" }}
                        />
                      )}
                      {skill.name}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionContainer>
  );
}
