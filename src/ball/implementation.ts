import { Settings } from "settings";
import { BallShape } from "./types";

const PADDING = 5;

export class Ball implements BallShape {
  private ball: BallEntity;

  constructor(settings: Settings) {
    this.ball = {
      id: "ball-0",
      type: "ball",
      x: settings.canvas.width / 2,
      y:
        settings.canvas.height -
        settings.ball.radius -
        settings.wall.width -
        settings.paddle.height -
        settings.canvas.borderWidth -
        PADDING,
      radius: settings.ball.radius,
      speed: {
        horizontal: settings.ball.speed.horizontal,
        vertical: settings.ball.speed.vertical,
      },
      direction: {
        horizontal: settings.ball.direction.horizontal,
        vertical: settings.ball.direction.vertical,
      },
    };
  }

  get radius() {
    return this.ball.radius;
  }

  setPosition(x: number, y: number): BallEntity {
    this.ball.x = x;
    this.ball.y = y;

    return this.ball;
  }

  get entity(): BallEntity {
    return this.setPosition(
      this.ball.x +
        this.ball.speed.horizontal.current * this.ball.direction.horizontal,
      this.ball.y +
        this.ball.speed.vertical.current * this.ball.direction.vertical
    );
  }

  changeHorizontalDirection(): void {
    this.ball.direction.horizontal =
      this.ball.direction.horizontal === 1 ? -1 : 1;
  }

  changeVerticalDirection(): void {
    this.ball.direction.vertical = this.ball.direction.vertical === 1 ? -1 : 1;
  }

  resetPosition(): BallEntity {
    return this.setPosition(100, 100);
  }

  setCurrentSpeed(amount: number): void {
    this.ball.speed.horizontal.current = amount;
    this.ball.speed.vertical.current = amount;
  }
}
