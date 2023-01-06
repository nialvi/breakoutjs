import { Settings } from "settings";
import { DrawingContext, DrawingContextProvider } from "../context/types";
import { DEFAULT_COLOR, DEFAULT_WIDTH } from "./constants";
import { Drawer, BrushSettings } from "./types";

function isInside(pos: { x: number; y: number }, rect: RectangleEntity) {
  return (
    pos.x > rect.x &&
    pos.x < rect.x + rect.width &&
    pos.y < rect.y + rect.height &&
    pos.y > rect.y
  );
}

export class CanvasDrawer implements Drawer {
  private context: DrawingContext = null;
  mainButton: RectangleEntity;

  constructor(
    private contextProvider: DrawingContextProvider,
    private settings: Settings
  ) {
    this.context = this.contextProvider.getInstance();

    if (!this.context) throw new Error("Failed to access the drawing context.");

    const { canvas } = this.settings;

    const widthButton = 200;
    const heightButton = 70;

    this.mainButton = {
      x: canvas.width / 2 - widthButton / 2,
      y: canvas.height / 2 - heightButton / 2,
      width: widthButton,
      height: heightButton,
      borderRadius: 10,
    };
  }

  public drawBall(
    { x, y, radius }: BallEntity,
    { color, width }: BrushSettings = {}
  ): void {
    if (!this.context) return;

    this.context.strokeStyle = color ?? DEFAULT_COLOR;
    this.context.lineWidth = width ?? DEFAULT_WIDTH;

    // TODO facade - this.context.line(start, end)
    // Методы beginPath, moveTo, lineTo и stroke —
    // это прямое использование `CanvasRenderingContext2D`:
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, Math.PI * 2, false);
    this.context.fillStyle = color ?? "#ffca18";
    this.context.shadowBlur = 20;
    this.context.shadowColor = "#cd8d3a";
    this.context.fill();
    this.context.shadowColor = "transparent";
    this.context.closePath();
  }

  public drawWall(wall: WallEntity) {
    if (!this.context) return;

    this.context.beginPath();
    this.context.rect(wall.x, wall.y, wall.width, wall.height);
    this.context.fillStyle = wall.color ?? "#242623";
    this.context.fill();
    this.context.closePath();
  }

  public drawPaddle(paddle: PaddleEntity): void {
    if (!this.context) return;

    this.context.beginPath();
    this.context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    this.context.shadowBlur = 30;
    this.context.shadowColor = "#6f3b35";
    this.context.fillStyle = paddle.color ?? "#fa7767";
    this.context.fill();
    this.context.shadowColor = "transparent";
    this.context.closePath();
  }

  drawBricks(bricks: BrickEntity[][]): void {
    bricks.forEach((columnBricks, columnIndex) => {
      columnBricks.forEach((rowBricks, rowIndex) => {
        if (!this.context) return;

        if (bricks[columnIndex][rowIndex].status === "normal") {
          const brick = bricks[columnIndex][rowIndex];

          this.context.beginPath();
          this.context.rect(brick.x, brick.y, brick.width, brick.height);
          this.context.fillStyle = "#38af4d";
          this.context.shadowBlur = 10;
          this.context.shadowColor = "#2fb752";
          this.context.fill();
          this.context.shadowColor = "transparent";
          this.context.closePath();
        }
      });
    });
  }

  clearCanvas(): void {
    this.context?.clearRect(
      0,
      0,
      this.settings.canvas.width,
      this.settings.canvas.height
    );
  }

  drawBackground(): void {
    if (!this.context) return;

    this.context.fillStyle = "#242623";
    this.context.fillRect(
      0,
      0,
      this.settings.canvas.width,
      this.settings.canvas.height
    );
  }

  drawPlayButton(): void {
    if (!this.context) return;

    this.context.beginPath();
    this.context.rect(
      this.mainButton.x,
      this.mainButton.y,
      this.mainButton.width,
      this.mainButton.height
    );
    this.context.fillStyle = "#f5f5f5";
    this.context.fill();
    this.context.lineWidth = 4;
    this.context.strokeStyle = "#1e1e1e";
    this.context.stroke();
    this.context.closePath();
    this.context.font = "600 30pt monospace";
    this.context.fillStyle = "#717171";
    this.context.fillText(
      "Start",
      this.mainButton.x + 40,
      this.mainButton.y + 30 + 20
    );
  }

  clickedInsidePlayButton(point: Point): boolean {
    return isInside(point, this.mainButton);
  }

  clickedInsideRetryButton(point: Point): boolean {
    return isInside(point, this.mainButton);
  }

  drawRetryButton(): void {
    if (!this.context) return;

    this.context.beginPath();
    this.context.rect(
      this.mainButton.x,
      this.mainButton.y,
      this.mainButton.width,
      this.mainButton.height
    );
    this.context.fillStyle = "#f5f5f5";
    this.context.fill();
    this.context.lineWidth = 4;
    this.context.strokeStyle = "#1e1e1e";
    this.context.stroke();
    this.context.closePath();
    this.context.font = "600 30pt monospace";
    this.context.fillStyle = "#717171";
    this.context.fillText(
      "Retry",
      this.mainButton.x + 40,
      this.mainButton.y + 30 + 20
    );
  }
}
