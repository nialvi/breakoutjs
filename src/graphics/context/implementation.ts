import { ElementSource, PixelRatioSource } from "dom";
import { Settings } from "settings";
import { DrawingContext, DrawingContextProvider } from "./types";

export class CanvasContextProvider implements DrawingContextProvider {
  private canvas: Nullable<HTMLCanvasElement> = null;
  private context: Nullable<DrawingContext> = null;

  constructor(
    private elementSource: ElementSource,
    private pixelRatioSource: PixelRatioSource,
    private settings: Settings
  ) {
    const { canvas } = this.elementSource;
    if (!canvas) throw new Error("Failed to find a canvas element.");

    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.normalizeScale();
  }

  public getInstance(): DrawingContext {
    return this.context;
  }

  private normalizeScale(): void {
    if (!this.canvas || !this.context) return;

    const ratio = this.pixelRatioSource.devicePixelRatio || 1;
    const { width, height } = this.settings.canvas;

    this.canvas.width = width * ratio;
    this.canvas.height = height * ratio;

    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.context.imageSmoothingEnabled = false;
    this.context.scale(ratio, ratio);
  }
}
