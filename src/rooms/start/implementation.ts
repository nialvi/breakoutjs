import { BallShape } from "ball";
import { ElementSource } from "dom";
import { EventListener } from "eventListener";
import { Drawer } from "graphics/drawer";
import { PaddleShape } from "paddle";
import { StartRoom } from "./types";

export class StartLevel implements StartRoom {
  constructor(
    private drawer: Drawer,
    private ball: BallShape,
    private elementSource: ElementSource,
    private eventListener: EventListener,
    private paddle: PaddleShape
  ) {}

  init() {
    const { canvas } = this.elementSource;

    canvas.addEventListener("click", this.onClick);
  }

  onClick = (event: MouseEvent) => {
    if (
      this.drawer.clickedInsidePlayButton({
        x: event.clientX,
        y: event.clientY,
      })
    ) {
      this.eventListener.notify("startGame");
    } else {
      console.log("outside start room");
    }
  };

  draw(): void {
    this.drawer.drawBackground();

    this.drawer.drawPlayButton();
    this.drawer.drawBall(this.ball.entity);
    this.drawer.drawPaddle(this.paddle.entity);
  }

  destroy(): void {
    const { canvas } = this.elementSource;

    canvas.removeEventListener("click", this.onClick);
  }
}
