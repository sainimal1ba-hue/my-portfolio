import Nav from "@/components/Nav";
import ThresholdHero from "@/components/ThresholdHero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Challenges from "@/components/Challenges";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative" style={{ background: "#050505" }}>
      <Nav />
      <ThresholdHero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Challenges />
      <Contact />
    </main>
  );
}
