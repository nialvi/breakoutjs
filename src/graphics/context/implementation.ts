import { ElementSource, PixelRatioSource } from "dom";
import { DrawingContext, DrawingContextProvider } from "./types";

export class CanvasContextProvider implements DrawingContextProvider {
  private element: Nullable<HTMLCanvasElement> = null;
  private context: Nullable<DrawingContext> = null;

  constructor(
    private elementSource: ElementSource,
    private pixelRatioSource: PixelRatioSource,
    private window: Window
  ) {
    const element = this.elementSource.getElementById("app");
    if (!element) throw new Error("Failed to find a canvas element.");

    this.element = element as HTMLCanvasElement;
    this.context = this.element.getContext("2d");
    this.normalizeScale();
  }

  public getInstance(): DrawingContext {
    return this.context;
  }

  private normalizeScale(): void {
    if (!this.element || !this.context) return;

    const ratio = this.pixelRatioSource.devicePixelRatio || 1;
    const { innerWidth: width, innerHeight: height } = this.window;

    this.element.width = width * ratio;
    this.element.height = height * ratio;

    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;

    this.context.imageSmoothingEnabled = false;
    this.context.scale(ratio, ratio);
  }
}
