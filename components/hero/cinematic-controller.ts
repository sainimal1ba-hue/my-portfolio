import { CinematicControllerConfig } from "./hero-types";

type CinematicState = "IDLE" | "PLAYING" | "COMPLETING" | "COMPLETE";

export class CinematicController {
  private state: CinematicState = "IDLE";
  private startTimestamp: number = 0;
  private duration: number;
  private totalFrames: number;
  private rafId: number = 0;
  private boundTick: (now: number) => void;
  
  // Callbacks
  private onProgress: (progress: number, frame: number) => void;
  private onStateChange: (state: CinematicState) => void;
  private onComplete: () => void;

  // Interaction tracking
  private scrollLockPadding: string = "";
  private initialTouchY: number | null = null;
  private boundWheel: (e: WheelEvent) => void;
  private boundTouchStart: (e: TouchEvent) => void;
  private boundTouchMove: (e: TouchEvent) => void;
  private boundKeyDown: (e: KeyboardEvent) => void;

  constructor(config: {
    durationMs: number;
    totalFrames: number;
    onProgress: (p: number, f: number) => void;
    onStateChange: (s: CinematicState) => void;
    onComplete: () => void;
  }) {
    this.duration = config.durationMs;
    this.totalFrames = config.totalFrames;
    this.onProgress = config.onProgress;
    this.onStateChange = config.onStateChange;
    this.onComplete = config.onComplete;

    this.boundTick = this.tick.bind(this);
    this.boundWheel = this.handleWheel.bind(this);
    this.boundTouchStart = this.handleTouchStart.bind(this);
    this.boundTouchMove = this.handleTouchMove.bind(this);
    this.boundKeyDown = this.handleKeyDown.bind(this);
  }

  public init() {
    this.setState("IDLE");
    this.lockScroll();
    this.attachListeners();
    // Emit initial frame
    this.onProgress(0, 0);
  }

  public destroy() {
    this.detachListeners();
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.unlockScroll();
  }

  private setState(newState: CinematicState) {
    if (this.state === newState) return;
    this.state = newState;
    this.onStateChange(newState);
  }

  private trigger() {
    if (this.state !== "IDLE") return;
    
    this.setState("PLAYING");
    this.startTimestamp = performance.now();
    this.rafId = requestAnimationFrame(this.boundTick);
    
    // We no longer need trigger listeners once playing starts
    this.detachListeners();
  }

  private tick(now: number) {
    if (this.state !== "PLAYING") return;

    const elapsed = now - this.startTimestamp;
    const progress = Math.min(1, Math.max(0, elapsed / this.duration));
    const frame = Math.min(this.totalFrames - 1, Math.floor(progress * this.totalFrames));

    this.onProgress(progress, frame);

    if (progress < 1) {
      this.rafId = requestAnimationFrame(this.boundTick);
    } else {
      this.finishCinematic();
    }
  }

  private finishCinematic() {
    this.setState("COMPLETING");
    if (this.rafId) cancelAnimationFrame(this.rafId);
    
    // Ensure final state
    this.onProgress(1.0, this.totalFrames - 1);
    
    this.setState("COMPLETE");
    this.unlockScroll();
    this.onComplete();
  }

  // --- Interaction Listeners ---
  
  private attachListeners() {
    window.addEventListener("wheel", this.boundWheel, { passive: false });
    window.addEventListener("touchstart", this.boundTouchStart, { passive: false });
    window.addEventListener("touchmove", this.boundTouchMove, { passive: false });
    window.addEventListener("keydown", this.boundKeyDown, { passive: false });
  }

  private detachListeners() {
    window.removeEventListener("wheel", this.boundWheel);
    window.removeEventListener("touchstart", this.boundTouchStart);
    window.removeEventListener("touchmove", this.boundTouchMove);
    window.removeEventListener("keydown", this.boundKeyDown);
  }

  private handleWheel(e: WheelEvent) {
    if (this.state !== "IDLE") return;
    // We only trigger if it's a meaningful downward scroll
    if (e.deltaY > 10) {
      this.trigger();
    }
  }

  private handleTouchStart(e: TouchEvent) {
    if (this.state !== "IDLE") return;
    this.initialTouchY = e.touches[0].clientY;
  }

  private handleTouchMove(e: TouchEvent) {
    if (this.state !== "IDLE" || this.initialTouchY === null) return;
    const currentY = e.touches[0].clientY;
    const diff = this.initialTouchY - currentY;
    // Swiping up (scrolling down the page)
    if (diff > 10) {
      this.trigger();
      this.initialTouchY = null;
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (this.state === "IDLE") {
      if (["ArrowDown", "PageDown", " ", "Enter"].includes(e.key)) {
        e.preventDefault();
        this.trigger();
      }
    }
  }

  // --- Scroll Lock ---
  
  private lockScroll() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    this.scrollLockPadding = document.body.style.paddingRight;
    
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  private unlockScroll() {
    document.body.style.overflow = "";
    document.body.style.paddingRight = this.scrollLockPadding;
  }
}
