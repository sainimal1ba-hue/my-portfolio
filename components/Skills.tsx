"use client";

import {
  SectionContainer,
  Eyebrow,
  SectionTitle,
  StaggeredItem,
} from "./animations";

interface SkillGroup {
  label: string;
  items: string[];
}

const skillGroups: SkillGroup[] = [
  {
    label: "technical",
    items: ["Python", "Java", "C", "HTML", "CSS"],
  },
  {
    label: "tools & technologies",
    items: ["Git", "GitHub", "MySQL", "MongoDB"],
  },
  {
    label: "also",
    items: ["Problem Solving", "Teamwork", "Adaptability", "Quick Learner"],
  },
];

export default function Skills() {
  let globalIndex = 0;

  return (
    <SectionContainer id="skills">
      <Eyebrow>04 — skills</Eyebrow>
      <SectionTitle>skills</SectionTitle>

      <div className="mt-8 space-y-10">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <p
              className="mb-4 text-xs tracking-[0.15em] uppercase"
              style={{ color: "rgba(237, 240, 242, 0.35)" }}
            >
              {group.label}
            </p>
            <div className="flex flex-wrap gap-3">
              {group.items.map((skill) => {
                const idx = globalIndex++;
                return (
                  <StaggeredItem key={skill} index={idx}>
                    <span
                      className="inline-block cursor-default rounded-full px-4 py-2 text-sm tracking-wide transition-all duration-300 hover:border-[rgba(125,211,252,0.6)] hover:text-[rgba(237,240,242,0.95)] hover:shadow-[0_0_16px_rgba(125,211,252,0.08)]"
                      style={{
                        color: "rgba(237, 240, 242, 0.6)",
                        border: "1px solid rgba(125, 211, 252, 0.2)",
                        background: "transparent",
                      }}
                    >
                      {skill}
                    </span>
                  </StaggeredItem>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
