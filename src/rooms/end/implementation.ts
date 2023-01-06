import { ElementSource } from "dom";
import { EventListener } from "eventListener";
import { Drawer } from "graphics/drawer";
import { EndRoom } from "./types";

export class EndLevel implements EndRoom {
  constructor(
    private drawer: Drawer,
    private elementSource: ElementSource,
    private eventListener: EventListener
  ) {}

  init() {
    const { canvas } = this.elementSource;
    canvas.addEventListener("click", this.onClick);
  }

  onClick = (event: MouseEvent) => {
    if (
      this.drawer.clickedInsideRetryButton({
        x: event.clientX,
        y: event.clientY,
      })
    ) {
      this.eventListener.notify("startGame");
    } else {
      console.log("outside end room");
    }
  };

  draw(): void {
    this.drawer.drawBackground();

    this.drawer.drawRetryButton();
  }

  destroy(): void {
    const { canvas } = this.elementSource;

    canvas.removeEventListener("click", this.onClick);
  }
}
