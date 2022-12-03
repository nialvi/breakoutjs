import { Settings } from "settings";
import { WallsShape } from "./types";

export class Walls implements WallsShape {
  private walls: WallEntity[];

  constructor(settings: Settings) {
    const {
      borderWidth,
      height: canvasHeight,
      width: canvasWidth,
    } = settings.canvas;
    const { width: wallWidth } = settings.wall;

    this.walls = [
      {
        id: "wall-0",
        type: "wall",
        x: borderWidth,
        y: borderWidth,
        height: canvasHeight - borderWidth - wallWidth,
        width: wallWidth,
        position: "left",
        status: "normal",
      },
      {
        id: "wall-1",
        type: "wall",
        x: canvasWidth - borderWidth - wallWidth,
        y: borderWidth,
        height: canvasHeight - borderWidth - wallWidth,
        width: wallWidth,
        position: "right",
        status: "normal",
      },
      {
        id: "wall-2",
        type: "wall",
        x: borderWidth + wallWidth,
        y: borderWidth,
        height: wallWidth,
        width: canvasWidth - borderWidth - wallWidth * 2,
        position: "top",
        status: "normal",
      },
      {
        id: "wall-3",
        type: "wall",
        x: borderWidth,
        y: canvasHeight - borderWidth - wallWidth,
        height: wallWidth,
        width: canvasWidth - borderWidth * 2,
        position: "bottom",
        status: "dead",
      },
    ];
  }

  get entity(): WallEntity[] {
    return this.walls;
  }
}
