import { GamepadInput } from "./types";
import { EventListener } from "eventListener";

export class Gamepad implements GamepadInput {
  private isKeyPressed: boolean;

  constructor(private window: Window, private eventListener: EventListener) {
    const pollGamepad = () => {
      const gamepads = this.window.navigator.getGamepads();
      for (const gamepad of gamepads) {
        if (!gamepad) {
          continue;
        }

        if (gamepad.buttons[0].pressed) {
          this.eventListener.notify("start");
        }

        if (gamepad.buttons[15].pressed || gamepad.axes[0] >= 0.5) {
          this.isKeyPressed = true;
          this.eventListener.notify("right");
        } else if (gamepad.buttons[14].pressed || gamepad.axes[0] <= -0.5) {
          this.isKeyPressed = true;
          this.eventListener.notify("left");
        } else {
          this.isKeyPressed = false;
          this.eventListener.notify("stop");
        }
      }

      this.window.requestAnimationFrame(pollGamepad);
    };

    pollGamepad();

    this.isKeyPressed = false;
  }

  on(type: EventType, callback: (data: any) => void): void {
    this.eventListener.on(type, callback);
  }

  get keyPressed(): boolean {
    return this.isKeyPressed;
  }
}
