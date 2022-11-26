export type BrushSettings = {
  color?: HexColor;
  width?: PixelsAmount;
};

export interface Drawer {
  drawBall(ball: BallEntity, settings?: BrushSettings): void;
  drawWall(wall: WallEntity): void;
  drawPaddle(paddle: PaddleEntity): void;
  drawBricks(bricks: BrickEntity[][]): void;
  clearCanvas(): void;
}
