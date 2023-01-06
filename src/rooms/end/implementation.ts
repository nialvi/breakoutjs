import { Drawer } from "graphics/drawer";
import { EndRoom } from "./types";

export class EndLevel implements EndRoom {
  constructor(private drawer: Drawer) {}

  draw(): void {
    this.drawer.drawBackground();
  }
}
