import { Settings } from "settings";
import { BricksShape } from "./types";

export class Bricks implements BricksShape {
  private _bricks: BrickEntity[][];

  constructor(private settings: Settings) {
    this._bricks = this.initialState();
  }

  private initialState(): BrickEntity[][] {
    const { bricks, wall, canvas } = this.settings;

    return new Array(bricks.amount.column)
      .fill("column")
      .map((_, columnIndex) => {
        return new Array(bricks.amount.row).fill("row").map((_, rowIndex) => {
          return {
            id: `brick-${columnIndex}-${rowIndex}`,
            type: "brick",
            x:
              columnIndex * (bricks.width + bricks.padding.x) +
              canvas.borderWidth +
              wall.width,
            y:
              rowIndex * (bricks.height + bricks.padding.y) +
              canvas.borderWidth +
              wall.width,
            height: bricks.height,
            width: bricks.width,
            position: "top",
            status: "normal",
          };
        });
      });
  }

  get entity(): BrickEntity[][] {
    return this._bricks;
  }

  changeState(id: string): BrickEntity[][] {
    this._bricks.forEach((columnBricks, columnIndex) => {
      columnBricks.forEach((rowBricks, rowIndex) => {
        const brick = this._bricks[columnIndex][rowIndex];

        if (brick.id === id) {
          brick.status = "hidden";
        }
      });
    });

    return this._bricks;
  }

  reset(): void {
    this._bricks = this.initialState();
  }
}
