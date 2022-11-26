import { Input } from "./types";
import { EventListener } from "eventListener";

export class InputController implements Input {
  constructor(private window: Window, private eventListener: EventListener) {
    this.window.document.addEventListener("keydown", this.initKeydown);
    // this.window.document.addEventListener("keyup", this.initKeydown);
  }

  initKeydown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      this.eventListener.notify("left");
    } else if (e.key === "ArrowRight") {
      this.eventListener.notify("right");
    }
  };

  on(type: EventType, callback: () => void) {
    this.eventListener.on(type, callback);
  }
}
