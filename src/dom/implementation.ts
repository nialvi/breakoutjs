import { ElementSource } from "./types";

export class DomSource implements ElementSource {
  constructor(private window: Window) {}

  getElementById(id: string): Nullable<HTMLElement> {
    return this.window.document.getElementById(id);
  }

  animateFrame(callback: (timestamp: number) => void): number {
    return this.window.requestAnimationFrame(callback);
  }

  cancelAnimationFrame(timer: number): void {
    return this.window.cancelAnimationFrame(timer);
  }

  get canvas() {
    return this.window.document.getElementById("app") as HTMLCanvasElement;
  }
}
