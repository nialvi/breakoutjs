import { Settings } from "settings";
import { PaddleShape } from "./types";

export class Paddle implements PaddleShape {
  private _width: PixelsAmount;
  private _height: PixelsAmount;
  private _speed: Speed;

  constructor(settings: Settings) {
    this._width = settings.paddle.width;
    this._height = settings.paddle.height;
    this._speed = settings.paddle.speed;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get speed() {
    return this._speed;
  }

  create(x: number, y: number): PaddleEntity {
    return {
      x,
      y,
      width: this._width,
      height: this._height,
      color: "tomato",
      position: "bottom",
    };
  }
}
