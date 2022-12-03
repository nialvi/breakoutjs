import { Settings } from "settings";
import { PaddleShape } from "./types";

const INITIAL_ACC = 1.05;
const MAX_SPEED = 100;
const MIN_SPEED = 0;

type SpeedUpParams = {
  currentValue: number;
  targetValue: number;
  changeAmount: number;
};

export class Paddle implements PaddleShape {
  private _paddle: PaddleEntity;
  private acceleration: number;
  private boundary: { left: number; right: number };

  constructor(private settings: Settings) {
    const { canvas, wall, paddle } = this.settings;

    this._paddle = {
      id: "p1",
      type: "paddle",
      x: canvas.width / 2,
      y: canvas.height - canvas.borderWidth * 3 - wall.width - paddle.height,
      width: paddle.width,
      height: paddle.height,
      color: "tomato",
      position: "bottom",
      status: "normal",
      speed: paddle.speed,
    };

    this.acceleration = INITIAL_ACC;

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
      this._paddle.x + this._paddle.speed.horizontal < this.boundary.left ||
      this._paddle.x + this._paddle.speed.horizontal > this.boundary.right
    ) {
      this.stop();
      return;
    }

    this._paddle.x += this._paddle.speed.horizontal;
  }

  changeLeftPostion(): void {
    this._paddle.speed.horizontal = this.speedUp({
      currentValue: this._paddle.speed.horizontal,
      targetValue: -MAX_SPEED,
      changeAmount: this.acceleration,
    });

    this.changePosition();
  }

  changeRightPosition(): void {
    this._paddle.speed.horizontal = this.speedUp({
      currentValue: this._paddle.speed.horizontal,
      targetValue: MAX_SPEED,
      changeAmount: this.acceleration,
    });

    this.changePosition();
  }

  stop(): void {
    if (this._paddle.speed.horizontal !== MIN_SPEED) {
      this._paddle.speed.horizontal = this.speedUp({
        currentValue: this._paddle.speed.horizontal,
        targetValue: MIN_SPEED,
        changeAmount: this.acceleration,
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
