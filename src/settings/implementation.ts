import { Settings } from "./types";

const wallWidth = 5;
const borderWidth = 1;
const bricksAmountRow = 10;
const bricksAmountColumn = 5;
const bricksPaddingX = 5;

export const settings: Settings = {
  canvas: {
    width: window.innerWidth,
    height: window.innerHeight,
    borderWidth: borderWidth,
  },

  bricks: {
    amount: {
      row: bricksAmountRow,
      column: bricksAmountColumn,
    },
    height: 20,
    width: Math.ceil(
      (window.innerWidth -
        wallWidth * 2 -
        borderWidth * 2 -
        bricksPaddingX * bricksAmountColumn) /
        bricksAmountColumn
    ),
    padding: {
      x: bricksPaddingX,
      y: 3,
    },
  },

  ball: {
    radius: 10,
    speed: {
      horizontal: 2,
      vertical: 2,
    },
    direction: {
      horizontal: 1,
      vertical: 1,
    },
  },

  wall: {
    width: wallWidth,
  },

  paddle: {
    width: 100,
    height: 15,
    speed: {
      horizontal: 0,
      vertical: 0,
    },
  },
};
