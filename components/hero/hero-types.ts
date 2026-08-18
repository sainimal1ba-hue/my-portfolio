export type CinematicState = "IDLE" | "PLAYING" | "COMPLETING" | "COMPLETE";

export interface CinematicControllerConfig {
  durationMs: number;
  totalFrames: number;
  onProgress: (progress: number, frame: number) => void;
  onStateChange: (state: CinematicState) => void;
  onComplete: () => void;
}
