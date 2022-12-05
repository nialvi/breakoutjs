import { Application } from "./types";
import { ElementSource } from "dom";
import { Settings } from "settings";
import { LevelRoom } from "rooms/level";
import { GUI } from "settings/gui/types";

export class App implements Application {
  private timer: number = 0;

  constructor(
    private elementSource: ElementSource,
    private settings: Settings,
    private levelDefault: LevelRoom,
    private guiSettings: GUI
  ) {
    this.guiSettings.create();
    this.guiSettings.onChange((event) => {
      window.location.reload();
    });
  }

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
