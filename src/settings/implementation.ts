import { SettingsFromStorage } from "./gui/types";
import { Settings } from "./types";

const wallWidth = 5;
const borderWidth = 1;
const bricksAmountRow = 10;
const bricksAmountColumn = 5;
const bricksPaddingX = 5;

export function getSettings({
  row = bricksAmountRow,
  col = bricksAmountColumn,
  paddleAcceleration = 3.05,
  paddleMaxSpeed = 100,
  paddleMinSpeed = 0,
}: SettingsFromStorage): Settings {
  return {
    canvas: {
      width: window.innerWidth,
      height: window.innerHeight,
      borderWidth: borderWidth,
    },

    bricks: {
      amount: {
        row: row,
        column: col,
      },
      height: 20,
      width: Math.ceil(
        (window.innerWidth -
          wallWidth * 2 -
          borderWidth * 2 -
          bricksPaddingX * col) /
          col
      ),
      padding: {
        x: bricksPaddingX,
        y: 3,
      },
    },

    ball: {
      radius: 10,
      speed: {
        horizontal: {
          max: 2,
          min: 0,
          current: 0,
        },
        vertical: {
          max: 2,
          min: 0,
          current: 0,
        },
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
      acceleration: paddleAcceleration,
      speed: {
        horizontal: {
          max: paddleMaxSpeed,
          min: paddleMinSpeed,
          current: 0,
        },
        vertical: {
          max: 100,
          min: 0,
          current: 0,
        },
      },
    },
  };
}
