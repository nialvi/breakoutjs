export type Settings = {
  canvas: {
    width: PixelsAmount;
    height: PixelsAmount;
    borderWidth: PixelsAmount;
  };

  bricks: {
    amount: {
      row: number;
      column: number;
    };
    height: PixelsAmount;
    width: PixelsAmount;
    padding: {
      x: PixelsAmount;
      y: PixelsAmount;
    };
  };

  wall: {
    width: PixelsAmount;
  };

  paddle: {
    width: PixelsAmount;
    height: PixelsAmount;
    speed: Speed;
  };

  ball: {
    radius: Radius;
    speed: Speed;
    direction: Direction;
  };
};
