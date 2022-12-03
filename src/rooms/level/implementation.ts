import { LevelRoom } from "./types";

import { BallShape } from "ball";
import { Drawer } from "graphics/drawer";
import { Settings } from "settings";
import { Collision } from "collision";
import { PaddleShape } from "paddle";
import { Input } from "input";
import { BricksShape } from "bricks";
import { WallsShape } from "walls";

export class LevelDefault implements LevelRoom {
  constructor(
    private ball: BallShape,
    private drawer: Drawer,

    private settings: Settings,
    private collision: Collision,
    private paddle: PaddleShape,
    private input: Input,
    private bricks: BricksShape,
    private walls: WallsShape
  ) {
    this.input.on("left", () => {
      if (
        this.paddle.x <=
        this.settings.canvas.borderWidth * 2 +
          this.settings.wall.width +
          paddle.speed.horizontal
      ) {
        return;
      }

      this.paddle.changeLeftPostion();
    });

    this.input.on("right", () => {
      if (
        this.paddle.x >=
        this.settings.canvas.width -
          this.settings.wall.width -
          this.settings.canvas.borderWidth -
          paddle.width -
          paddle.speed.horizontal
      ) {
        return;
      }

      this.paddle.changeRightPosition();
    });
  }

  draw(): void {
    this.drawer.clearCanvas();

    let bricksMatrix = this.bricks.entity;
    const walls = this.walls.entity;
    const paddle = this.paddle.entity;
    const ball = this.ball.entity;

    const collisionObject = this.collision.withObjects(ball, [
      ...walls,
      paddle,
      ...bricksMatrix.flatMap((item) => item),
    ]);

    switch (collisionObject.type) {
      case "wall":
      case "paddle": {
        if (collisionObject.status === "normal") {
          if (
            collisionObject.position === "left" ||
            collisionObject.position === "right"
          ) {
            this.ball.changeHorizontalDirection();
            break;
          }

          if (
            collisionObject.position === "top" ||
            collisionObject.position === "bottom"
          ) {
            this.ball.changeVerticalDirection();
            break;
          }
        }
      }

      case "brick": {
        bricksMatrix = this.bricks.changeState(collisionObject.id);

        this.ball.changeVerticalDirection();
      }

      default: {
      }
    }

    this.drawer.drawBall(ball);
    this.drawer.drawPaddle(paddle);
    this.drawer.drawBricks(bricksMatrix);

    walls.forEach((wall) => {
      this.drawer.drawWall(wall);
    });
  }
}
