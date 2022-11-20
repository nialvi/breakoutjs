import { BallShape } from "../ball";
import { Drawer } from "graphics/drawer";

import { Application } from "./types";

export class App implements Application {
  constructor(private ball: BallShape, private drawer: Drawer) {}

  start() {
    const ball = this.ball.create(100, 100, 20);

    this.drawer.drawBall(ball);
  }
}
