import { EventListener } from "eventListener";
import { Drawer } from "graphics/drawer";
import { StartRoom } from "./types";

export class StartLevel implements StartRoom {
  constructor(
    private drawer: Drawer,
    private window: Window,
    private eventListener: EventListener
  ) {
    this.window.document.addEventListener("click", () => {
      this.eventListener.notify("startGame");
    });
  }

  draw(): void {
    this.drawer.drawBackground();
  }
}
