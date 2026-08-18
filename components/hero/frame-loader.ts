export class FrameLoader {
  private images: HTMLImageElement[];
  private totalFrames: number;
  private basePath: string;
  private cancelled: boolean = false;
  private loadedCount: number = 0;

  constructor(totalFrames: number, basePath: string) {
    this.totalFrames = totalFrames;
    this.basePath = basePath;
    this.images = new Array(totalFrames);
  }

  public async preload(onProgress?: (progress: number) => void): Promise<void> {
    this.cancelled = false;
    this.loadedCount = 0;

    // Load first frame immediately for fast TTI
    await this.loadSingleFrame(0);
    if (onProgress) onProgress(this.loadedCount / this.totalFrames);

    // Load in batches to avoid network stalling
    const BATCH_SIZE = 20;
    for (let batch = 1; batch < this.totalFrames; batch += BATCH_SIZE) {
      if (this.cancelled) break;
      const promises: Promise<void>[] = [];
      const end = Math.min(batch + BATCH_SIZE, this.totalFrames);
      
      for (let i = batch; i < end; i++) {
        promises.push(
          this.loadSingleFrame(i).then(() => {
            if (!this.cancelled && onProgress) {
              onProgress(this.loadedCount / this.totalFrames);
            }
          })
        );
      }
      await Promise.all(promises);
    }
  }

  private loadSingleFrame(index: number): Promise<void> {
    return new Promise((resolve) => {
      if (this.images[index]) {
        resolve(); // Already loaded
        return;
      }
      
      const img = new Image();
      img.src = `${this.basePath}${String(index).padStart(3, "0")}.webp`;
      
      img.onload = () => {
        if (!this.cancelled) {
          this.images[index] = img;
          this.loadedCount++;
        }
        resolve();
      };
      
      img.onerror = () => {
        if (!this.cancelled) {
          this.loadedCount++; // Count to prevent hanging
        }
        resolve();
      };
    });
  }

  public getFrame(index: number): HTMLImageElement | undefined {
    return this.images[index];
  }

  public destroy() {
    this.cancelled = true;
    this.images = [];
  }
}
