export type BrushSettings = {
  color?: Color;
  width?: PixelsAmount;
};

export interface Drawer {
  drawBall(ball: BallEntity, settings?: BrushSettings): void;
  clearCanvas(): void;
}
