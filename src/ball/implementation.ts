import { BallShape } from "./types";

export class Ball implements BallShape {
  private ball: BallEntity;

  constructor() {
    this.ball = { x: 0, y: 0, radius: 0 };
  }

  create(x: number, y: number, radius: number): BallEntity {
    this.ball = {
      x,
      y,
      radius,
    };

    return this.ball;
  }

  setPosition(x: number, y: number): void {
    this.ball.x = x;
    this.ball.y = y;
  }
}
