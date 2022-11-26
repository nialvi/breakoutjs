export type BrushSettings = {
  color?: HexColor;
  width?: PixelsAmount;
};

export interface Drawer {
  drawBall(ball: BallEntity, settings?: BrushSettings): void;
  drawWall(wall: WallEntity): void;
  clearCanvas(): void;
}
