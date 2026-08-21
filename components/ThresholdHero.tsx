"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FrameLoader } from "./hero/frame-loader";
import { CanvasRenderer } from "./hero/canvas-renderer";
import { CinematicController } from "./hero/cinematic-controller";
import { CinematicState } from "./hero/hero-types";

const TOTAL_FRAMES = 240;
const FRAME_PATH = "/frames/frame_";

function StaggeredWords({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.05,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function ThresholdHero({ onComplete }: { onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const [state, setState] = useState<CinematicState>("IDLE");
  const [progress, setProgress] = useState(0);

  const controllerRef = useRef<CinematicController | null>(null);
  const loaderRef = useRef<FrameLoader | null>(null);
  const rendererRef = useRef<CanvasRenderer | null>(null);

  // Initialize systems
  useEffect(() => {
    loaderRef.current = new FrameLoader(TOTAL_FRAMES, FRAME_PATH);

    if (canvasRef.current) {
      rendererRef.current = new CanvasRenderer(canvasRef.current);
    }

    loaderRef.current.preload((p) => {
      setLoadProgress(p);
      // We consider it "ready" once the first 10% is loaded or it finishes
      if (p > 0.1 && !isReady) {
        setIsReady(true);
      }
    });

    return () => {
      loaderRef.current?.destroy();
      controllerRef.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize Controller once ready
  useEffect(() => {
    if (!isReady || controllerRef.current) return;

    controllerRef.current = new CinematicController({
      durationMs: 10000,
      totalFrames: TOTAL_FRAMES,
      onProgress: (p, f) => {
        setProgress(p);
        const img = loaderRef.current?.getFrame(f);
        if (img) rendererRef.current?.draw(img);
      },
      onStateChange: (s) => setState(s),
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    controllerRef.current.init();

    // Check reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      // Instead of skipping, we just let it play out or we can immediately finish it
      // if finishCinematic was public, but we just leave it playing fast or normal
      // since the CSS takes care of reduced motion for other UI elements.
    }
  }, [isReady, onComplete]);

  type HeroTextState = "identity" | "statement" | "quote";

  let textState: HeroTextState = "identity";
  if (progress < 0.22) {
    textState = "identity";
  } else if (progress < 0.68) {
    textState = "statement";
  } else {
    textState = "quote";
  }

  return (
    <section
      id="hero-wrapper"
      className="relative w-full h-[100vh] bg-[#050505] overflow-hidden"
    >
      {/* Loading Indicator */}
      <AnimatePresence>
        {!isReady && (
          <motion.div
            exit={{ opacity: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[1px] bg-[rgba(237,240,242,0.1)]"
          >
            <motion.div
              className="h-full bg-[#7DD3FC]"
              style={{ width: `${loadProgress * 100}%` }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* Dim overlay that fades in slightly towards the end */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          backgroundColor: "#050505",
          opacity: state === "COMPLETE" ? 0.7 : 0
        }}
      />

      {isReady && (
        <>
          {/* Hero Typography States */}
          <div className="absolute inset-0 pointer-events-none">
            <AnimatePresence>
              {textState === "identity" && (
                <motion.div
                  key="identity"
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 1 } }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute inset-0 flex flex-col justify-center items-end text-right pr-8 md:pr-16 lg:pr-24"
                >
                  <h1
                    className="text-6xl md:text-7xl lg:text-8xl font-light tracking-wide"
                    style={{ color: "rgba(237, 240, 242, 0.9)" }}
                  >
                    SAINIMAL G E
                  </h1>
                  <p
                    className="mt-2 text-lg md:text-xl font-light tracking-[0.15em]"
                    style={{ color: "rgba(237, 240, 242, 0.7)" }}
                  >
                    Software Developer
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {textState === "statement" && (
                <motion.div
                  key="statement"
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 1 } }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute inset-0 flex flex-col justify-center items-end text-right pr-8 md:pr-16 lg:pr-24"
                >
                  <p
                    className="max-w-sm text-lg md:text-xl font-light leading-relaxed"
                    style={{ color: "rgba(237, 240, 242, 0.8)" }}
                  >
                    I build software where ideas<br />
                    become systems people can use.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {textState === "quote" && (
                <motion.div
                  key="quote"
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 1 } }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute inset-0 flex flex-col justify-center items-end text-right pr-8 md:pr-16 lg:pr-24 pointer-events-auto"
                >
                  <blockquote
                    className="max-w-md text-sm md:text-base font-light leading-relaxed mb-4"
                    style={{ color: "rgba(237, 240, 242, 0.7)" }}
                  >
                    &ldquo;Computer science is no more about<br />
                    computers than astronomy is about<br />
                    telescopes.&rdquo;
                  </blockquote>
                  <cite
                    className="text-xs md:text-sm tracking-[0.1em] uppercase font-medium not-italic mb-12"
                    style={{ color: "rgba(237, 240, 242, 0.5)" }}
                  >
                    — Edsger W. Dijkstra
                  </cite>

                  {state === "COMPLETE" && (
                    <motion.a
                      href="#projects"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="group text-sm font-light tracking-widest uppercase inline-flex items-center gap-2 hover:opacity-100 transition-opacity cursor-pointer"
                      style={{ color: "#7DD3FC" }}
                    >
                      Check the projects
                      <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </motion.a>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </>
      )}
    </section>
  );
}
