import { Input } from "./types";
import { EventListener } from "eventListener";

export class InputController implements Input {
  private isKeyPressed: boolean;

  constructor(private window: Window, private eventListener: EventListener) {
    this.window.document.addEventListener("keydown", this.initKeydown);
    this.window.document.addEventListener("keyup", this.initKeyUp);

    this.isKeyPressed = false;
  }

  initKeydown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "a") {
      this.isKeyPressed = true;
      this.eventListener.notify("left");
    } else if (e.key === "ArrowRight" || e.key === "d") {
      this.isKeyPressed = true;
      this.eventListener.notify("right");
    }
  };

  initKeyUp = (e: KeyboardEvent) => {
    if (
      e.key === "ArrowLeft" ||
      e.key === "a" ||
      e.key === "ArrowRight" ||
      e.key === "d"
    ) {
      this.isKeyPressed = false;
    }

    if (e.key === " ") {
      this.eventListener.notify("start");
    }
  };

  on(type: EventType, callback: (data: any) => void) {
    this.eventListener.on(type, callback);
  }

  get keyPressed(): boolean {
    return this.isKeyPressed;
  }
}
