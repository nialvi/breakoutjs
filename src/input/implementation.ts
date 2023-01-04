import { Input } from "./types";
import { KeyboardInput } from "./keyboard";

export class InputController implements Input {
  constructor(private keyboard: KeyboardInput) {}

  on(type: EventType, callback: (data: any) => void) {
    this.keyboard.on(type, callback);
  }

  get keyPressed(): boolean {
    return this.keyboard.keyPressed;
  }
}
