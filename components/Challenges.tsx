"use client";

import {
  SectionContainer,
  Eyebrow,
  SectionTitle,
  BodyText,
  StaggeredItem,
} from "./animations";

interface Challenge {
  platform: string;
  title: string;
  difficulty: string;
  approach?: string;
  link: string;
}

// Clearly fake placeholder data — structured for CP Auto-Tracker feed
const challenges: Challenge[] = [
  {
    platform: "LeetCode",
    title: "[placeholder] — waiting for auto-tracker integration",
    difficulty: "Hard",
    approach: "approach notes will be pulled from tracker",
    link: "#",
  },
  {
    platform: "Codeforces",
    title: "[placeholder] — waiting for auto-tracker integration",
    difficulty: "2100",
    approach: "approach notes will be pulled from tracker",
    link: "#",
  },
  {
    platform: "AtCoder",
    title: "[placeholder] — waiting for auto-tracker integration",
    difficulty: "ABC-F",
    approach: "approach notes will be pulled from tracker",
    link: "#",
  },
];

const platformColors: Record<string, string> = {
  LeetCode: "#FFA116",
  Codeforces: "#1F8ACB",
  AtCoder: "#7DD3FC",
};

const difficultyColors: Record<string, string> = {
  Hard: "#FF375F",
  "2100": "#FF8F00",
  "ABC-F": "#7DD3FC",
};

export default function Challenges() {
  return (
    <SectionContainer id="challenges">
      <Eyebrow>05 — challenges</Eyebrow>
      <SectionTitle>challenges</SectionTitle>

      <BodyText>
        <p
          className="mb-10 font-serif text-base leading-relaxed"
          style={{ color: "rgba(237, 240, 242, 0.55)" }}
        >
          the harder problems, solved — pulled from LeetCode, Codeforces, and
          AtCoder.
        </p>
      </BodyText>

      <div className="space-y-3">
        {challenges.map((challenge, i) => (
          <StaggeredItem key={i} index={i}>
            <a
              href={challenge.link}
              className="group flex flex-col gap-3 rounded-lg border p-5 transition-all duration-300 hover:border-[rgba(125,211,252,0.2)] md:flex-row md:items-center md:justify-between"
              style={{
                borderColor: "rgba(237, 240, 242, 0.06)",
                background: "rgba(237, 240, 242, 0.015)",
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-4">
                {/* Platform badge */}
                <span
                  className="shrink-0 rounded-md px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase"
                  style={{
                    color: platformColors[challenge.platform] || "#7DD3FC",
                    border: `1px solid ${platformColors[challenge.platform] || "#7DD3FC"}33`,
                    background: `${platformColors[challenge.platform] || "#7DD3FC"}0A`,
                  }}
                >
                  {challenge.platform}
                </span>

                <div>
                  {/* Problem title */}
                  <p
                    className="text-sm tracking-wide"
                    style={{ color: "rgba(237, 240, 242, 0.7)" }}
                  >
                    {challenge.title}
                  </p>
                  {/* Approach */}
                  {challenge.approach && (
                    <p
                      className="mt-0.5 text-xs italic"
                      style={{ color: "rgba(237, 240, 242, 0.3)" }}
                    >
                      {challenge.approach}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Difficulty tag */}
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] tracking-wider"
                  style={{
                    color: difficultyColors[challenge.difficulty] || "#7DD3FC",
                    border: `1px solid ${difficultyColors[challenge.difficulty] || "#7DD3FC"}33`,
                  }}
                >
                  {challenge.difficulty}
                </span>

                {/* External link icon */}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="shrink-0 opacity-30 transition-opacity group-hover:opacity-60"
                >
                  <path
                    d="M3 9L9 3M9 3H4M9 3V8"
                    stroke="rgba(237, 240, 242, 0.6)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          </StaggeredItem>
        ))}
      </div>
    </SectionContainer>
  );
}
