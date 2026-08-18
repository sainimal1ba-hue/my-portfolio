export class CanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false }); // alpha false for optimization
  }

  public draw(img: HTMLImageElement | undefined) {
    if (!this.ctx || !img) return;

    // Set internal resolution strictly to the image size for 1:1 mapping
    // We let CSS object-fit/cover or width:100% handle viewport scaling
    if (this.canvas.width !== img.naturalWidth || this.canvas.height !== img.naturalHeight) {
      this.canvas.width = img.naturalWidth;
      this.canvas.height = img.naturalHeight;
    }

    this.ctx.drawImage(img, 0, 0);
  }
}
