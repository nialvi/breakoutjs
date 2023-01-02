import { Settings } from "settings";
import { PaddleShape } from "./types";

type SpeedUpParams = {
  currentValue: number;
  targetValue: number;
  changeAmount: number;
};

const VELOCITY = 0.98;

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
      color: "tomato",
      position: "bottom",
      status: "normal",
      speed: paddle.speed,
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
    if (type === "stop") {
      this._paddle.speed.horizontal.current = this.speedUp({
        currentValue: this._paddle.speed.horizontal.current,
        targetValue: this._paddle.speed.horizontal.min,
        changeAmount: this._paddle.acceleration,
      });
    } else {
      const value = type === "right" ? 1 : -1;

      this._paddle.speed.horizontal.current +=
        value * this._paddle.acceleration;
    }

    this.correctCurrentSpeed();

    this._paddle.x += this._paddle.speed.horizontal.current;
  }

  private speedUp({ currentValue, targetValue, changeAmount }: SpeedUpParams) {
    if (currentValue < targetValue) {
      currentValue += changeAmount;
      const value = Math.min(currentValue, targetValue);
      currentValue = Math.round(value * 10) / 10;
    } else {
      currentValue -= changeAmount;
      const value = Math.max(currentValue, targetValue);
      currentValue = Math.round(value * 10) / 10;
    }

    return currentValue;
  }

  private correctCurrentSpeed() {
    if (
      this._paddle.speed.horizontal.current >= this._paddle.speed.horizontal.max
    ) {
      this._paddle.speed.horizontal.current = this._paddle.speed.horizontal.max;
    } else if (
      this._paddle.speed.horizontal.current <=
      -this._paddle.speed.horizontal.max
    ) {
      this._paddle.speed.horizontal.current =
        -this._paddle.speed.horizontal.max;
    }
  }

  reset(): void {
    this._paddle = this.initialState();
  }
}
