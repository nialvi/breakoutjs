import { Settings } from "settings";
import { BallShape } from "./types";

export class Ball implements BallShape {
  private ball: BallEntity;

  constructor(settings: Settings) {
    this.ball = { x: 0, y: 0, radius: settings.ball.radius };
  }

  get radius() {
    return this.ball.radius;
  }

  create(x: number, y: number): BallEntity {
    this.ball = {
      ...this.ball,
      x,
      y,
    };

    return this.ball;
  }

  setPosition(x: number, y: number): void {
    this.ball.x = x;
    this.ball.y = y;
  }
}
