import { PaddleShape } from "./types";

export class Paddle implements PaddleShape {
  constructor() {}

  create(x: number, y: number): PaddleEntity {
    return {
      x,
      y,
      width: 100,
      height: 15,
      color: "tomato",
      position: "bottom",
    };
  }
}
