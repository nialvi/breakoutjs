import { Application } from "./types";
import { ElementSource } from "dom";
import { Settings } from "settings";
import { LevelRoom } from "rooms/level";

export class App implements Application {
  constructor(
    private elementSource: ElementSource,
    private settings: Settings,
    private levelDefault: LevelRoom
  ) {}

  start() {
    this.loopGame();
  }

  loopGame() {
    this.elementSource.animateFrame(this.drawFrame);
  }

  drawFrame = (timestamp: number): void => {
    this.levelDefault.draw();

    this.elementSource.animateFrame(this.drawFrame);
  };
}
