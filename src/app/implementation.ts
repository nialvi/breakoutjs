import { BallShape } from "../ball";
import { Drawer } from "graphics/drawer";

import { Application } from "./types";
import { ElementSource } from "dom";

export class App implements Application {
  private startX: number;
  private startY: number;

  constructor(
    private ball: BallShape,
    private drawer: Drawer,
    private elementSource: ElementSource
  ) {
    this.startX = 0;
    this.startY = 0;
  }

  start() {
    this.loopGame();
  }

  loopGame() {
    this.elementSource.animateFrame(this.drawFrame);
  }

  drawFrame = (timestamp: number): void => {
    this.drawer.clearCanvas();

    this.startX += 5 - Math.floor(Math.random() * 5);
    this.startY += 5 - Math.floor(Math.random() * 5);

    const ball = this.ball.create(this.startX, this.startY, 20);

    this.drawer.drawBall(ball);

    this.elementSource.animateFrame(this.drawFrame);
  };
}
