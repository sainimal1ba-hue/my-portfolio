import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "sainimal — software developer",
  description:
    "Portfolio of Sainimal G E — computer science student, software developer, and builder of accessible, intelligent tools.",
  keywords: [
    "Sainimal",
    "software developer",
    "portfolio",
    "computer science",
    "React",
    "TypeScript",
    "accessibility",
  ],
  authors: [{ name: "Sainimal G E" }],
  openGraph: {
    title: "sainimal — software developer",
    description:
      "Portfolio of Sainimal G E — computer science student, software developer, and builder of accessible, intelligent tools.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${newsreader.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
