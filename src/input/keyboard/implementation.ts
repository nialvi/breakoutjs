import { KeyboardInput } from "./types";
import { EventListener } from "eventListener";

export class Keyboard implements KeyboardInput {
  private isKeyPressed: boolean;

  constructor(private window: Window, private eventListener: EventListener) {
    this.window.document.addEventListener("keydown", this.initKeydown);
    this.window.document.addEventListener("keyup", this.initKeyUp);

    this.isKeyPressed = false;
  }

  initKeydown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "ф") {
      this.isKeyPressed = true;
      this.eventListener.notify("left");
    } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "в") {
      this.isKeyPressed = true;
      this.eventListener.notify("right");
    }
  };

  initKeyUp = (e: KeyboardEvent) => {
    if (
      e.key === "ArrowLeft" ||
      e.key === "a" ||
      e.key === "ф" ||
      e.key === "ArrowRight" ||
      e.key === "d" ||
      e.key === "в"
    ) {
      this.isKeyPressed = false;
      this.eventListener.notify("stop");
    }

    if (e.key === " ") {
      this.eventListener.notify("start");
    }

    if (e.key === "Enter") {
      this.window.location.reload();
    }
  };

  on(type: EventType, callback: (data: any) => void) {
    this.eventListener.on(type, callback);
  }

  get keyPressed(): boolean {
    return this.isKeyPressed;
  }
}
