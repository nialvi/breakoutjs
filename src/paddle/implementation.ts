import { Settings } from "settings";
import { PaddleShape } from "./types";

export class Paddle implements PaddleShape {
  private _paddle: PaddleEntity;
  private _boundary: { left: number; right: number };

  constructor(private settings: Settings) {
    const { canvas, wall } = this.settings;

    this._paddle = this.initialState();

    this._boundary = {
      left: canvas.borderWidth + wall.width,
      right:
        canvas.width - wall.width - canvas.borderWidth - this._paddle.width,
    };
  }

  private initialState(): PaddleEntity {
    const { canvas, wall, paddle } = this.settings;

    return {
      id: "p1",
      type: "paddle",
      x: canvas.width / 2 - paddle.width / 2,
      y: canvas.height - canvas.borderWidth * 3 - wall.width - paddle.height,
      width: paddle.width,
      height: paddle.height,
      position: "bottom",
      status: "normal",
      speed: paddle.speed,
      friction: paddle.friction,
      acceleration: paddle.acceleration,
    };
  }

  get width() {
    return this._paddle.width;
  }

  get height() {
    return this._paddle.height;
  }

  get speed() {
    return this._paddle.speed;
  }

  get entity(): PaddleEntity {
    return this._paddle;
  }

  get x(): number {
    return this._paddle.x;
  }

  get y(): number {
    return this._paddle.y;
  }

  changePosition(type: "left" | "right" | "stop"): void {
    const { current: currentSpeed, max: maxSpeed } =
      this._paddle.speed.horizontal;
    const { friction, acceleration } = this._paddle;

    if (type === "right") {
      if (currentSpeed < maxSpeed) {
        this._paddle.speed.horizontal.current += 1 * acceleration;
      }
    } else if (type === "left") {
      if (currentSpeed > -maxSpeed) {
        this._paddle.speed.horizontal.current -= 1 * acceleration;
      }
    } else {
      this._paddle.speed.horizontal.current *= friction;
    }

    this._paddle.x += this._paddle.speed.horizontal.current;
  }

  reset(): void {
    this._paddle = this.initialState();
  }
}
