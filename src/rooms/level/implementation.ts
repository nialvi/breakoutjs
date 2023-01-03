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
  private paddleMovement: "left" | "right" | "stop";

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
    this.paddleMovement = "stop";

    this.input.on("left", () => {
      this.paddleMovement = "left";
    });

    this.input.on("right", () => {
      this.paddleMovement = "right";
    });

    this.input.on("stop", () => {
      this.paddleMovement = "stop";
    });

    this.input.on("start", () => {
      this.ball.setCurrentSpeed(this.ball.entity.speed.horizontal.max);
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

    this.paddle.changePosition(this.paddleMovement);

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

        if (collisionObject.status === "dead") {
          this.ball.reset();
          this.paddle.reset();
          this.bricks.reset();
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
