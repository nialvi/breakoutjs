import { Settings } from "settings";
import { PaddleShape } from "./types";

export class Paddle implements PaddleShape {
  private _paddle: PaddleEntity;

  constructor(settings: Settings) {
    this._paddle = {
      id: "p1",
      type: "paddle",
      x: settings.canvas.width / 2,
      y:
        settings.canvas.height -
        settings.canvas.borderWidth * 3 -
        settings.wall.width -
        settings.paddle.height,
      width: settings.paddle.width,
      height: settings.paddle.height,
      color: "tomato",
      position: "bottom",
      status: "normal",
      speed: settings.paddle.speed,
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

  changeLeftPostion(): void {
    this._paddle.x -= this._paddle.speed.horizontal;
  }

  changeRightPosition(): void {
    this._paddle.x += this._paddle.speed.horizontal;
  }
}
