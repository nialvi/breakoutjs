import { GamepadInput } from "./types";
import { EventListener } from "eventListener";

enum GamepadButtons {
  ArrowRight = 15,
  ArrowLeft = 14,
  Select = 8,
  ThirdButton = 0,
}

enum GamepadSticks {
  FirstLeftRight = 0,
  FirstUpDown = 1,
  SecondLeftRight = 2,
  SecondUpDonw = 3,
}

export class Gamepad implements GamepadInput {
  private isAnyControllPressed: boolean = false;
  private isNeedFireStopEvent: boolean = false;

  constructor(private window: Window, private eventListener: EventListener) {
    const pollGamepad = () => {
      const gamepads = this.window.navigator.getGamepads();
      for (const gamepad of gamepads) {
        if (!gamepad) {
          continue;
        }

        const controllButtonIndexes = Object.keys(GamepadButtons)
          .filter((key: any) => isNaN(Number(GamepadButtons[key])))
          .map((i) => Number(i));

        const controllStickIndexes = Object.keys(GamepadSticks)
          .filter((key: any) => isNaN(Number(GamepadSticks[key])))
          .map((i) => Number(i));

        controllButtonIndexes.forEach((index) => {
          switch (index) {
            case GamepadButtons.ArrowRight: {
              if (gamepad.buttons[index].pressed) {
                this.isNeedFireStopEvent = true;
                this.eventListener.notify("right");
                break;
              }
            }

            case GamepadButtons.ArrowLeft: {
              if (gamepad.buttons[index].pressed) {
                this.isNeedFireStopEvent = true;
                this.eventListener.notify("left");
                break;
              }
            }

            case GamepadButtons.Select: {
              if (gamepad.buttons[index].pressed) {
                this.isNeedFireStopEvent = true;
                this.window.location.reload();
                break;
              }
            }

            case GamepadButtons.ThirdButton: {
              if (gamepad.buttons[index].pressed) {
                this.isNeedFireStopEvent = true;
                this.eventListener.notify("start");
                break;
              }
            }

            default:
              break;
          }
        });

        controllStickIndexes.forEach((index) => {
          switch (index) {
            case GamepadSticks.FirstLeftRight: {
              if (gamepad.axes[index] >= 0.5) {
                this.isNeedFireStopEvent = true;
                this.eventListener.notify("right");
                break;
              }

              if (gamepad.axes[index] <= -0.5) {
                this.isNeedFireStopEvent = true;
                this.eventListener.notify("left");
                break;
              }
            }

            default:
              break;
          }
        });

        this.isAnyControllPressed =
          controllButtonIndexes.some(
            (index) => gamepad.buttons[index].pressed
          ) ||
          controllStickIndexes.some(
            (index) => gamepad.axes[index] >= 0.5 || gamepad.axes[index] <= -0.5
          );

        if (!this.isAnyControllPressed && this.isNeedFireStopEvent) {
          this.eventListener.notify("stop");
          this.isNeedFireStopEvent = false;
        }
      }

      this.window.requestAnimationFrame(pollGamepad);
    };

    pollGamepad();
  }

  on(type: EventType, callback: (data: any) => void): void {
    this.eventListener.on(type, callback);
  }

  get keyPressed(): boolean {
    return this.isAnyControllPressed;
  }
}
