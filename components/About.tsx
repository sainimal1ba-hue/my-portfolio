"use client";

import {
  SectionContainer,
  Eyebrow,
  SectionTitle,
  BodyText,
} from "./animations";

export default function About() {
  return (
    <SectionContainer id="about">
      <Eyebrow>01 — about</Eyebrow>
      <SectionTitle>about</SectionTitle>
      <BodyText>
        <p
          className="font-serif text-base leading-[1.8] md:text-lg"
          style={{
            color: "rgba(237, 240, 242, 0.57)",
            maxWidth: "65ch",
          }}
        >
          computer science student at St. Joseph&apos;s Institute of Technology,
          currently building things as a student intern at CecureUs. most of
          what&apos;s below is what happens after the part nobody sees — sitting
          down, going quiet, and staying there until a WCAG scan stops taking
          too long, or a competitive-programming tracker stops needing the same
          data typed in three times, or a support inbox actually gets faster.
          IEEE student member; occasional NGO and industrial-visit volunteer.
        </p>
      </BodyText>
    </SectionContainer>
  );
}
