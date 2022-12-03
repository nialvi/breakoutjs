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
  private paddlePoint: Point;

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
    this.paddlePoint = {
      x: this.settings.canvas.width / 2,
      y:
        this.settings.canvas.height -
        this.settings.canvas.borderWidth * 3 -
        this.settings.wall.width -
        paddle.height,
    };

    this.input.on("left", () => {
      if (
        this.paddlePoint.x <=
        this.settings.canvas.borderWidth * 2 +
          this.settings.wall.width +
          paddle.speed.horizontal
      ) {
        return;
      }

      this.paddlePoint.x -= paddle.speed.horizontal;
    });

    this.input.on("right", () => {
      if (
        this.paddlePoint.x >=
        this.settings.canvas.width -
          this.settings.wall.width -
          this.settings.canvas.borderWidth -
          paddle.width -
          paddle.speed.horizontal
      ) {
        return;
      }

      this.paddlePoint.x += paddle.speed.horizontal;
    });
  }

  draw(): void {
    this.drawer.clearCanvas();

    const walls = this.walls.entity;
    let bricksMatrix = this.bricks.entity;
    const ball = this.ball.getNextBallEntity();
    const paddle = this.paddle.create(this.paddlePoint.x, this.paddlePoint.y);
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
