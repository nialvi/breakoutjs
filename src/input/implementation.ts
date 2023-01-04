import { Input } from "./types";
import { KeyboardInput } from "./keyboard";
import { GamepadInput } from "./gamepad";

export class InputController implements Input {
  constructor(private keyboard: KeyboardInput, private gamepad: GamepadInput) {}

  on(type: EventType, callback: (data: any) => void) {
    this.keyboard.on(type, callback);
    this.gamepad.on(type, callback);
  }

  get keyPressed(): boolean {
    return this.keyboard.keyPressed;
  }
}
