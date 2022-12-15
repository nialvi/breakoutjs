import { Settings } from "settings";
import { PaddleShape } from "./types";

type SpeedUpParams = {
  currentValue: number;
  targetValue: number;
  changeAmount: number;
};

export class Paddle implements PaddleShape {
  private _paddle: PaddleEntity;
  private boundary: { left: number; right: number };

  constructor(private settings: Settings) {
    const { canvas, wall, paddle } = this.settings;

    this._paddle = {
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

    this.boundary = {
      left: canvas.borderWidth + wall.width,
      right:
        canvas.width - wall.width - canvas.borderWidth - this._paddle.width,
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

  private changePosition(): void {
    if (
      this._paddle.x + this._paddle.speed.horizontal.current <
        this.boundary.left ||
      this._paddle.x + this._paddle.speed.horizontal.current >
        this.boundary.right
    ) {
      this.stop();
      return;
    }

    this._paddle.x += this._paddle.speed.horizontal.current;
  }

  changeLeftPostion(): void {
    this._paddle.speed.horizontal.current = this.speedUp({
      currentValue: this._paddle.speed.horizontal.current,
      targetValue: -this._paddle.speed.horizontal.max,
      changeAmount: this._paddle.acceleration,
    });

    this.changePosition();
  }

  changeRightPosition(): void {
    this._paddle.speed.horizontal.current = this.speedUp({
      currentValue: this._paddle.speed.horizontal.current,
      targetValue: this._paddle.speed.horizontal.max,
      changeAmount: this._paddle.acceleration,
    });

    this.changePosition();
  }

  stop(): void {
    if (
      this._paddle.speed.horizontal.current !==
      this._paddle.speed.horizontal.min
    ) {
      this._paddle.speed.horizontal.current = this.speedUp({
        currentValue: this._paddle.speed.horizontal.current,
        targetValue: this._paddle.speed.horizontal.min,
        changeAmount: this._paddle.acceleration,
      });

      this.changePosition();
    }
  }

  private speedUp({ currentValue, targetValue, changeAmount }: SpeedUpParams) {
    if (currentValue < targetValue) {
      currentValue += changeAmount;
      currentValue = Math.min(currentValue, targetValue);
    } else {
      currentValue -= changeAmount;
      currentValue = Math.max(currentValue, targetValue);
    }

    return currentValue;
  }
}
