"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  SectionContainer,
  Eyebrow,
  SectionTitle,
} from "./animations";

interface Project {
  title: string;
  badge?: string;
  description: string;
  stack: string[];
  link?: string;
  linkLabel?: string;
}

const projects: Project[] = [
  {
    title: "AccessAudit",
    badge: "1st Place, Blaze a Trail 3.0 Hackathon",
    description:
      "AI-powered WCAG accessibility auditing platform. Scans any public URL for WCAG 2.1/2.2 violations via axe-core, simulates real user disabilities (color blindness, low vision), and generates AI-powered code fixes using Gemini 2.5 Flash.",
    stack: ["React", "TypeScript", "Express", "Playwright", "MongoDB Atlas"],
    link: "#",
    linkLabel: "live demo (coming soon)",
  },
  {
    title: "Decentralized CP Auto-Tracker",
    description:
      "Google Apps Script architecture that automates daily competitive-programming tracking across LeetCode, Codeforces, and AtCoder. Bypasses execution timeouts and API rate limits by distributing a central library across individual client accounts, eliminating manual data entry for the entire engineering batch.",
    stack: ["Google Apps Script"],
  },
  {
    title: "Decision Engine CRM",
    badge: "Finalist, Speedathon'26, SRM Institute",
    description:
      "AI-native CRM with an autonomous dynamic pricing algorithm that analyzes purchase history, wishlists, and search patterns, generating personalized discount strategies from real-time shopping behavior.",
    stack: [],
    link: "#",
    linkLabel: "github (coming soon)",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="group relative rounded-xl border p-6 md:p-8 transition-all duration-500"
      style={{
        borderColor: "rgba(125, 211, 252, 0.1)",
        background: "rgba(125, 211, 252, 0.02)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        boxShadow: "0 0 40px rgba(125, 211, 252, 0.06), 0 0 80px rgba(125, 211, 252, 0.03)",
        borderColor: "rgba(125, 211, 252, 0.2)",
      }}
    >
      {/* Soft rectangular glow behind card */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(125, 211, 252, 0.04), transparent 40%)",
        }}
      />

      {/* Badge */}
      {project.badge && (
        <div className="mb-4">
          <span
            className="inline-block rounded-full px-3 py-1 text-[10px] tracking-[0.1em] uppercase"
            style={{
              color: "#7DD3FC",
              border: "1px solid rgba(125, 211, 252, 0.2)",
              background: "rgba(125, 211, 252, 0.05)",
            }}
          >
            {project.badge}
          </span>
        </div>
      )}

      {/* Title */}
      <h3
        className="text-xl font-medium lowercase tracking-wide md:text-2xl"
        style={{ color: "rgba(237, 240, 242, 0.9)" }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        className="mt-3 font-serif text-sm leading-relaxed md:text-base"
        style={{ color: "rgba(237, 240, 242, 0.55)" }}
      >
        {project.description}
      </p>

      {/* Stack */}
      {project.stack.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full px-2.5 py-1 text-[10px] tracking-wider"
              style={{
                color: "rgba(237, 240, 242, 0.5)",
                border: "1px solid rgba(237, 240, 242, 0.1)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Link */}
      {project.link && (
        <a
          href={project.link}
          className="mt-5 inline-flex items-center gap-2 text-xs tracking-[0.12em] lowercase transition-colors duration-300 hover:opacity-80"
          style={{ color: "#7DD3FC" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.linkLabel || "view project"}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path
              d="M3 9L9 3M9 3H4M9 3V8"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      )}
    </motion.div>
  );
}

export default function Projects() {
  return (
    <SectionContainer id="projects">
      <Eyebrow>03 — projects</Eyebrow>
      <SectionTitle>projects</SectionTitle>

      <div className="mt-8 grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </SectionContainer>
  );
}
