import { LevelRoom } from "./types";

import { BallShape } from "ball";
import { Drawer } from "graphics/drawer";
import { Settings } from "settings";
import { Collision } from "collision";
import { PaddleShape } from "paddle";
import { Input } from "input";
import { BricksShape } from "bricks";

export class LevelDefault implements LevelRoom {
  private ballPoint: Point;
  private paddlePoint: Point;
  private speedBall: Speed;
  private direction: Direction;

  constructor(
    private ball: BallShape,
    private drawer: Drawer,

    private settings: Settings,
    private collision: Collision,
    private paddle: PaddleShape,
    private input: Input,
    private bricks: BricksShape
  ) {
    this.ballPoint = {
      x: this.settings.canvas.width / 2,
      y: this.settings.canvas.height - 100,
    };

    this.direction = {
      horizontal: this.settings.ball.direction.horizontal,
      vertical: this.settings.ball.direction.vertical,
    };

    this.speedBall = {
      horizontal: this.settings.ball.speed.horizontal,
      vertical: this.settings.ball.speed.vertical,
    };

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

  private getNextBallPoint(point: Point): Point {
    return {
      x: point.x + this.speedBall.horizontal * this.direction.horizontal,
      y: point.y + this.speedBall.vertical * this.direction.vertical,
    };
  }

  draw(): void {
    this.drawer.clearCanvas();

    this.ballPoint = this.getNextBallPoint(this.ballPoint);

    const { borderWidth } = this.settings.canvas;
    const { width: wallWidth } = this.settings.wall;

    const walls: WallEntity[] = [
      {
        id: "wall-0",
        type: "wall",
        x: borderWidth,
        y: borderWidth,
        height: this.settings.canvas.height - borderWidth - wallWidth,
        width: wallWidth,
        position: "left",
        status: "normal",
      },
      {
        id: "wall-1",
        type: "wall",
        x: this.settings.canvas.width - borderWidth - wallWidth,
        y: borderWidth,
        height: this.settings.canvas.height - borderWidth - wallWidth,
        width: wallWidth,
        position: "right",
        status: "normal",
      },
      {
        id: "wall-2",
        type: "wall",
        x: borderWidth + wallWidth,
        y: borderWidth,
        height: wallWidth,
        width: this.settings.canvas.width - borderWidth - wallWidth * 2,
        position: "top",
        status: "normal",
      },
      {
        id: "wall-3",
        type: "wall",
        x: borderWidth,
        y: this.settings.canvas.height - borderWidth - wallWidth,
        height: wallWidth,
        width: this.settings.canvas.width - borderWidth * 2,
        position: "bottom",
        status: "dead",
      },
    ];

    let bricksMatrix = this.bricks.allBricks;
    const ball = this.ball.create(this.ballPoint.x, this.ballPoint.y);
    const paddle = this.paddle.create(this.paddlePoint.x, this.paddlePoint.y);
    const collisionObject = this.collision.withObjects(
      ball,
      [...walls, paddle, ...bricksMatrix.flatMap((item) => item)],
      this.direction
    );

    switch (collisionObject.type) {
      case "wall":
      case "paddle": {
        if (collisionObject.status === "normal") {
          if (
            collisionObject.position === "left" ||
            collisionObject.position === "right"
          ) {
            this.direction.horizontal =
              this.direction.horizontal === 1 ? -1 : 1;
            break;
          }

          if (
            collisionObject.position === "top" ||
            collisionObject.position === "bottom"
          ) {
            this.direction.vertical = this.direction.vertical === 1 ? -1 : 1;
            break;
          }
        }
      }

      case "brick": {
        bricksMatrix = this.bricks.changeState(collisionObject.id);

        this.direction.vertical = this.direction.vertical === 1 ? -1 : 1;
        console.log(collisionObject);
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
