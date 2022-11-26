import { Settings } from "settings";
import { DrawingContext, DrawingContextProvider } from "../context/types";
import { DEFAULT_COLOR, DEFAULT_WIDTH } from "./constants";
import { Drawer, BrushSettings } from "./types";

export class CanvasDrawer implements Drawer {
  private context: DrawingContext = null;

  constructor(
    private contextProvider: DrawingContextProvider,
    private settings: Settings
  ) {
    this.context = this.contextProvider.getInstance();

    if (!this.context) throw new Error("Failed to access the drawing context.");
  }

  public drawBall(
    { x, y, radius }: BallEntity,
    { color = "", width }: BrushSettings = {}
  ): void {
    if (!this.context) return;

    this.context.strokeStyle = color ?? DEFAULT_COLOR;
    this.context.lineWidth = width ?? DEFAULT_WIDTH;

    // TODO facade - this.context.line(start, end)
    // Методы beginPath, moveTo, lineTo и stroke —
    // это прямое использование `CanvasRenderingContext2D`:
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, Math.PI * 2, false);
    this.context.fillStyle = color;
    this.context.fill();
    this.context.closePath();
  }

  public drawWall(wall: WallEntity) {
    if (!this.context) return;

    this.context.beginPath();
    this.context.rect(wall.x, wall.y, wall.width, wall.height);
    this.context.fillStyle = wall.color ?? "black";
    this.context.fill();
    this.context.closePath();
  }

  clearCanvas(): void {
    this.context?.clearRect(
      0,
      0,
      this.settings.canvasWidth,
      this.settings.canvasHeight
    );
  }
}
