"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

const TOTAL_FRAMES = 240;
const FRAME_PATH = "/frames/frame_";

/* ── Word-by-word stagger component ── */
function StaggeredWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
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

/* ── Beat overlay component ── */
function BeatOverlay({
  scrollProgress,
  rangeStart,
  rangeEnd,
  alignment,
  title,
  subtitle,
  isBeatA = false,
  isCTA = false,
}: {
  scrollProgress: ReturnType<typeof useSpring>;
  rangeStart: number;
  rangeEnd: number;
  alignment: "center" | "left" | "right";
  title: string;
  subtitle: string;
  isBeatA?: boolean;
  isCTA?: boolean;
}) {
  const fadeInEnd = rangeStart + (rangeEnd - rangeStart) * 0.1;
  const fadeOutStart = rangeEnd - (rangeEnd - rangeStart) * 0.1;

  const opacity = useTransform(scrollProgress, [
    rangeStart,
    fadeInEnd,
    fadeOutStart,
    rangeEnd,
  ], [0, 1, 1, 0]);

  const y = useTransform(scrollProgress, [
    rangeStart,
    fadeInEnd,
    fadeOutStart,
    rangeEnd,
  ], [20, 0, 0, -10]);

  // Beat A specific: brightness ramp + letter-spacing contraction
  const beatALetterSpacing = useTransform(
    scrollProgress,
    [rangeStart, fadeInEnd],
    ["0.25em", "0.12em"]
  );

  const beatABrightness = useTransform(
    scrollProgress,
    [rangeStart, fadeInEnd],
    [0.3, 1]
  );

  const beatAFilter = useTransform(beatABrightness, (v) => `brightness(${v})`);

  const [isVisible, setIsVisible] = useState(false);
  useMotionValueEvent(opacity, "change", (v) => {
    setIsVisible(v > 0.05);
  });

  const alignmentClasses = {
    center: "items-center text-center",
    left: "items-start text-left pl-8 md:pl-16 lg:pl-24",
    right: "items-end text-right pr-8 md:pr-16 lg:pr-24",
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className={`absolute inset-0 flex flex-col justify-center ${alignmentClasses[alignment]} pointer-events-none px-6`}
      style={{ opacity, y }}
    >
      {isBeatA ? (
        <>
          <motion.h1
            className="text-7xl md:text-8xl lg:text-9xl font-light lowercase tracking-wide"
            style={{
              color: "rgba(237, 240, 242, 0.9)",
              letterSpacing: beatALetterSpacing,
              filter: beatAFilter,
            }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="mt-4 max-w-xl text-sm md:text-base font-light leading-relaxed"
            style={{ color: "rgba(237, 240, 242, 0.55)" }}
          >
            {isVisible && <StaggeredWords text={subtitle} delay={0.3} />}
          </motion.p>
        </>
      ) : (
        <>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-light lowercase tracking-wide"
            style={{ color: "rgba(237, 240, 242, 0.9)" }}
          >
            {isVisible && <StaggeredWords text={title} />}
          </h2>
          <p
            className="mt-3 max-w-lg text-sm md:text-base font-light leading-relaxed"
            style={{ color: "rgba(237, 240, 242, 0.55)" }}
          >
            {isVisible && <StaggeredWords text={subtitle} delay={0.2} />}
          </p>
          {isCTA && (
            <motion.button
              onClick={() => {
                const el = document.getElementById("about");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="pointer-events-auto mt-6 rounded-full border px-6 py-2.5 text-xs tracking-[0.15em] lowercase transition-all duration-300 hover:bg-[rgba(125,211,252,0.1)]"
              style={{
                borderColor: "rgba(125, 211, 252, 0.3)",
                color: "#7DD3FC",
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              see what he&apos;s building
            </motion.button>
          )}
        </>
      )}
    </motion.div>
  );
}

/* ── Main Hero Component ── */
export default function ThresholdHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
  });

  // State to track if user has started scrolling
  const [hasScrolled, setHasScrolled] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.005 && !hasScrolled) {
      setHasScrolled(true);
    } else if (v === 0 && hasScrolled) {
      setHasScrolled(false);
    }
  });

  // Hero→About transition: dim the canvas as we approach the end
  const canvasDim = useTransform(scrollYProgress, [0.92, 1.0], [1, 0.3]);

  /* ── Preload all frames ── */
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let cancelled = false;

    const loadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = `${FRAME_PATH}${String(index).padStart(3, "0")}.webp`;
        img.onload = () => {
          if (!cancelled) {
            images[index] = img;
            loadedCount++;
            setLoadProgress(loadedCount / TOTAL_FRAMES);
            if (loadedCount === TOTAL_FRAMES) {
              imagesRef.current = images;
              setIsLoaded(true);
            }
          }
          resolve();
        };
        img.onerror = () => {
          // Still count it to avoid hanging
          if (!cancelled) {
            loadedCount++;
            setLoadProgress(loadedCount / TOTAL_FRAMES);
            if (loadedCount === TOTAL_FRAMES) {
              imagesRef.current = images;
              setIsLoaded(true);
            }
          }
          resolve();
        };
      });
    };

    // Load in batches of 10 to avoid overwhelming the browser
    const loadAll = async () => {
      for (let batch = 0; batch < TOTAL_FRAMES; batch += 10) {
        if (cancelled) break;
        const promises: Promise<void>[] = [];
        for (let i = batch; i < Math.min(batch + 10, TOTAL_FRAMES); i++) {
          promises.push(loadFrame(i));
        }
        await Promise.all(promises);
      }
    };

    loadAll();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ── Canvas rendering loop ── */
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = imagesRef.current[frameIndex];

      if (!canvas || !ctx || !img) return;

      // Set canvas to image dimensions on first draw
      if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    },
    []
  );

  useEffect(() => {
    if (!isLoaded) return;

    // Draw initial frame
    drawFrame(0);

    const unsubscribe = springProgress.on("change", (v) => {
      const index = Math.min(TOTAL_FRAMES - 1, Math.floor(v * (TOTAL_FRAMES - 1)));
      if (index !== currentFrameRef.current) {
        currentFrameRef.current = index;
        // Use rAF for smooth drawing
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          drawFrame(index);
        });
      }
    });

    return () => {
      unsubscribe();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isLoaded, springProgress, drawFrame]);

  /* ── Reduced motion: show 3 static frames ── */
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const reducedMotionFrames = useMemo(() => [0, 120, 239], []);

  return (
    <div
      id="hero-wrapper"
      ref={wrapperRef}
      className="relative"
      style={{ height: "500vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: "#050505" }}>
        {/* Loading bar */}
        {!isLoaded && (
          <div className="absolute inset-0 z-20 flex items-center justify-center" style={{ background: "#050505" }}>
            <div className="w-48 md:w-64">
              <div
                className="h-px w-full overflow-hidden rounded-full"
                style={{ background: "rgba(125, 211, 252, 0.1)" }}
              >
                <motion.div
                  className="h-full origin-left"
                  style={{
                    background: "#7DD3FC",
                    scaleX: loadProgress,
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Canvas */}
        {isLoaded && !prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: canvasDim }}
          >
            <canvas
              ref={canvasRef}
              className="h-full w-full"
              style={{ objectFit: "contain" }}
              aria-hidden="true"
            />
          </motion.div>
        )}

        {/* Reduced motion: static frames */}
        {isLoaded && prefersReducedMotion && (
          <div className="absolute inset-0">
            {reducedMotionFrames.map((frameIdx, i) => {
              const start = i / 3;
              const end = (i + 1) / 3;
              return (
                <motion.div
                  key={frameIdx}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    opacity: useTransform(scrollYProgress, [start, end], [1, 0]),
                  }}
                >
                  {imagesRef.current[frameIdx] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imagesRef.current[frameIdx].src}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Beat A: 0-20% */}
        <BeatOverlay
          scrollProgress={springProgress}
          rangeStart={0}
          rangeEnd={0.2}
          alignment="center"
          title="sainimal"
          subtitle="software developer. this starts in the dark, alone — watch what the light finds."
          isBeatA
        />

        {/* Beat B: 25-45% */}
        <BeatOverlay
          scrollProgress={springProgress}
          rangeStart={0.25}
          rangeEnd={0.45}
          alignment="left"
          title="something wakes up"
          subtitle="not loud. just a small rectangle of light, deciding to exist."
        />

        {/* Beat C: 50-70% */}
        <BeatOverlay
          scrollProgress={springProgress}
          rangeStart={0.5}
          rangeEnd={0.7}
          alignment="right"
          title="he doesn't rush toward it"
          subtitle="he just goes, the way you go toward something you already know."
        />

        {/* Beat D: 75-95% */}
        <BeatOverlay
          scrollProgress={springProgress}
          rangeStart={0.75}
          rangeEnd={0.95}
          alignment="center"
          title="now it's the only light left"
          subtitle="see what he's building."
          isCTA
        />


      </div>
    </div>
  );
}
