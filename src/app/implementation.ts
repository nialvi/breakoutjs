import { Application } from "./types";
import { ElementSource } from "dom";
import { GUI } from "settings/gui/types";
import { RoomsController } from "rooms";

export class App implements Application {
  constructor(
    private elementSource: ElementSource,
    private rooms: RoomsController,
    private guiSettings: GUI
  ) {
    this.guiSettings.create();
    this.guiSettings.onChange(() => {
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
    this.rooms.draw();
    this.elementSource.animateFrame(this.drawFrame);
  };
}
