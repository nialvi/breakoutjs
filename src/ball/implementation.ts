import { Settings } from "settings";
import { BallShape } from "./types";

const PADDING = 5;

export class Ball implements BallShape {
  private ball: BallEntity;

  constructor(private settings: Settings) {
    this.ball = this.initialState();
  }

  private initialState(): BallEntity {
    const { canvas, ball, wall, paddle } = this.settings;

    return {
      id: "ball-0",
      type: "ball",
      x: canvas.width / 2,
      y:
        canvas.height -
        ball.radius -
        wall.width -
        paddle.height -
        canvas.borderWidth -
        PADDING,
      radius: ball.radius,
      speed: {
        horizontal: ball.speed.horizontal,
        vertical: ball.speed.vertical,
      },
      direction: {
        horizontal: ball.direction.horizontal,
        vertical: ball.direction.vertical,
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

  reset() {
    this.ball = this.initialState();
  }

  setCurrentSpeed(amount: number): void {
    this.ball = {
      ...this.ball,
      speed: {
        ...this.ball.speed,
        vertical: {
          ...this.ball.speed.vertical,
          current: amount,
        },
        horizontal: {
          ...this.ball.speed.horizontal,
          current: amount,
        },
      },
    };
  }
}
