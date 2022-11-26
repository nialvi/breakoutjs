import { BallShape } from "../ball";
import { Drawer } from "graphics/drawer";

import { Application } from "./types";
import { ElementSource } from "dom";
import { Settings } from "settings";
import { Collision } from "collision";
import { PaddleShape } from "paddle";

export class App implements Application {
  private ballPoint: Point;
  private speedBall: Speed;
  private direction: Direction;

  constructor(
    private ball: BallShape,
    private drawer: Drawer,
    private elementSource: ElementSource,
    private settings: Settings,
    private collision: Collision,
    private paddle: PaddleShape
  ) {
    this.ballPoint = {
      x: this.settings.canvasWidth / 2,
      y: this.settings.canvasHeight - 100,
    };

    this.direction = {
      horizontal: this.settings.direction.horizontal,
      vertical: this.settings.direction.vertical,
    };

    this.speedBall = {
      horizontal: this.settings.speed.horizontal,
      vertical: this.settings.speed.vertical,
    };
  }

  start() {
    this.loopGame();
  }

  loopGame() {
    this.elementSource.animateFrame(this.drawFrame);
  }

  getNextBallPoint(point: Point): Point {
    return {
      x: point.x + this.speedBall.horizontal * this.direction.horizontal,
      y: point.y + this.speedBall.vertical * this.direction.vertical,
    };
  }

  drawFrame = (timestamp: number): void => {
    this.drawer.clearCanvas();

    this.ballPoint = this.getNextBallPoint(this.ballPoint);

    const walls: WallEntity[] = [
      {
        x: 1,
        y: 1,
        height: this.settings.canvasHeight - 2,
        width: 10,
        position: "left",
        status: "normal",
      },
      {
        x: this.settings.canvasWidth - 11,
        y: 1,
        height: this.settings.canvasHeight - 2,
        width: 10,
        position: "right",
        status: "normal",
      },
      {
        x: 1,
        y: 1,
        height: 10,
        width: this.settings.canvasWidth - 11,
        position: "top",
        status: "normal",
      },
      {
        x: 1,
        y: this.settings.canvasHeight - 11,
        height: 10,
        width: this.settings.canvasWidth - 11,
        position: "bottom",
        status: "dead",
      },
    ];

    const ball = this.ball.create(this.ballPoint.x, this.ballPoint.y, 15);
    const paddle = this.paddle.create(
      this.settings.canvasWidth / 2,
      this.settings.canvasHeight - 27
    );
    const collisionWallType = this.collision.withWalls(
      ball,
      [...walls, paddle],
      this.direction
    );

    switch (collisionWallType) {
      case "left":
      case "right": {
        this.direction.horizontal = this.direction.horizontal === 1 ? -1 : 1;
        break;
      }

      case "bottom":
      case "top": {
        this.direction.vertical = this.direction.vertical === 1 ? -1 : 1;
        break;
      }

      default: {
      }
    }

    this.drawer.drawBall(ball);
    this.drawer.drawPaddle(paddle);

    walls.forEach((wall) => {
      this.drawer.drawWall(wall);
    });

    this.elementSource.animateFrame(this.drawFrame);
  };
}
