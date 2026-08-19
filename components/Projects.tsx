"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "./animations";

interface Project {
  title: string;
  badge?: string;
  description: string;
  stack: string[];
  link?: string;
  linkLabel?: string;
  variation: "default" | "structure-first" | "title-first";
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
    variation: "title-first",
  },
  {
    title: "Decentralized CP Auto-Tracker",
    description:
      "Google Apps Script architecture that automates daily competitive-programming tracking across LeetCode, Codeforces, and AtCoder. Bypasses execution timeouts and API rate limits by distributing a central library across individual client accounts, eliminating manual data entry for the entire engineering batch.",
    stack: ["Google Apps Script"],
    variation: "structure-first",
  },
  {
    title: "Decision Engine CRM",
    badge: "Finalist, Speedathon'26, SRM Institute",
    description:
      "AI-native CRM with an autonomous dynamic pricing algorithm that analyzes purchase history, wishlists, and search patterns, generating personalized discount strategies from real-time shopping behavior.",
    stack: [],
    link: "#",
    linkLabel: "github (coming soon)",
    variation: "default",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  // Determine variant staggers based on variation type
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.15,
        staggerChildren: 0.15,
        delayChildren: index * 0.15 + 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, filter: "blur(8px)", x: -10 },
    visible: { opacity: 1, filter: "blur(0px)", x: 0, transition: { duration: 0.6 } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const badgeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  // Reorder rendering in DOM or adjust animation delay based on variation
  const isTitleFirst = project.variation === "title-first";
  const isStructureFirst = project.variation === "structure-first";

  return (
    <motion.div
      variants={containerVariants}
      className="group relative rounded-xl border p-6 md:p-8 transition-colors duration-500 hover:border-[rgba(125,211,252,0.3)]"
      style={{
        borderColor: "rgba(125, 211, 252, 0.1)",
        background: "rgba(125, 211, 252, 0.02)",
      }}
    >
      {/* Accent line extends on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#7DD3FC] scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100 transition-all duration-500 origin-top" />

      {/* Content wrapper */}
      <div className="flex flex-col h-full relative z-10">
        
        {/* Structure First: render badge/meta then title */}
        {isStructureFirst ? (
          <>
            <motion.div variants={badgeVariants} className="mb-4">
              <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(237, 240, 242, 0.4)" }}>
                Engineering Architecture
              </span>
            </motion.div>
            <motion.h3
              variants={titleVariants}
              className="text-2xl font-medium tracking-wide md:text-3xl transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: "rgba(237, 240, 242, 0.9)" }}
            >
              {project.title}
            </motion.h3>
          </>
        ) : (
          <>
            <motion.h3
              variants={isTitleFirst ? titleVariants : contentVariants}
              className="text-2xl font-medium tracking-wide md:text-3xl transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: "rgba(237, 240, 242, 0.9)" }}
            >
              {project.title}
            </motion.h3>
            {project.badge && (
              <motion.div variants={isTitleFirst ? contentVariants : badgeVariants} className="mt-2 mb-4">
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
              </motion.div>
            )}
          </>
        )}

        <motion.div variants={contentVariants} className="mt-4 flex-grow">
          <p
            className="font-serif text-sm leading-relaxed md:text-base group-hover:text-[rgba(237,240,242,0.7)] transition-colors duration-300"
            style={{ color: "rgba(237, 240, 242, 0.55)" }}
          >
            {project.description}
          </p>
        </motion.div>

        <motion.div variants={contentVariants} className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {project.stack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full px-2.5 py-1 text-[10px] tracking-wider transition-colors duration-300 group-hover:border-[rgba(237,240,242,0.25)]"
                  style={{
                    color: "rgba(237, 240, 242, 0.6)",
                    border: "1px solid rgba(237, 240, 242, 0.15)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {project.link && (
            <a
              href={project.link}
              className="inline-flex items-center gap-2 text-xs tracking-[0.12em] transition-colors duration-300 group-hover:opacity-100 opacity-70"
              style={{ color: "#7DD3FC" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.linkLabel || "view project"}
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <SectionContainer id="projects">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
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
            03 — Projects
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
          Projects
        </motion.h2>

        <div className="mt-8 grid gap-8 md:grid-cols-1 lg:grid-cols-1">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </motion.div>
    </SectionContainer>
  );
}
