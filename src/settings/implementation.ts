import { Settings } from "./types";

export const settings: Settings = {
  canvas: {
    width: window.innerWidth,
    height: window.innerHeight,
    borderWidth: 1,
  },

  ball: {
    radius: 15,
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
    width: 11,
  },

  paddle: {
    width: 100,
    height: 15,
    speed: {
      horizontal: 10,
      vertical: 0,
    },
  },
};
