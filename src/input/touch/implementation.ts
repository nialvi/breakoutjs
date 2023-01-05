import { TouchInput } from "./types";
import { EventListener } from "eventListener";
import { Settings } from "settings";

export class TouchScreen implements TouchInput {
  private isKeyPressed: boolean;
  private touchStartX: number | null = null;
  private touchStartY: number | null = null;

  constructor(
    private window: Window,
    private eventListener: EventListener,
    private settings: Settings
  ) {
    this.window.document.addEventListener("touchstart", this.onTouchStart);
    this.window.document.addEventListener("touchend", this.onTouchEnd);
    this.window.document.addEventListener("touchmove", this.onTouchMove);

    this.isKeyPressed = false;
  }

  onTouchStart = (event: TouchEvent) => {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;

    if (
      this.touchStartX > this.settings.canvas.width / 2 &&
      this.touchStartX < this.settings.canvas.width
    ) {
      this.eventListener.notify("right");
    } else {
      this.eventListener.notify("left");
    }
  };

  onTouchEnd = (e: any) => {
    this.eventListener.notify("stop");
  };

  onTouchMove = (event: TouchEvent) => {
    if (!this.touchStartX || !this.touchStartY) {
      return;
    }

    const { clientX: touchMoveX } = event.touches[0];
    const { clientY: touchMoveY } = event.touches[0];

    const xDiff = this.touchStartX - touchMoveX;
    const yDiff = this.touchStartY - touchMoveY;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        console.log("swipe right");
      } else {
        console.log("swipe left");
      }
    } else {
      if (yDiff > 0) {
        console.log("swipe down");
        this.eventListener.notify("start");
      } else {
        console.log("swipe up");
      }
    }

    this.touchStartX = null;
    this.touchStartY = null;
  };

  on(type: EventType, callback: (data: any) => void) {
    this.eventListener.on(type, callback);
  }

  get keyPressed(): boolean {
    return this.isKeyPressed;
  }
}
