import { Input } from "./types";
import { KeyboardInput } from "./keyboard";
import { GamepadInput } from "./gamepad";
import { TouchInput } from "./touch";

export class InputController implements Input {
  constructor(
    private keyboard: KeyboardInput,
    private gamepad: GamepadInput,
    private touchScreen: TouchInput
  ) {}

  on(type: EventType, callback: (data: any) => void) {
    this.keyboard.on(type, callback);
    this.gamepad.on(type, callback);
    this.touchScreen.on(type, callback);
  }

  get keyPressed(): boolean {
    return this.keyboard.keyPressed;
  }
}
