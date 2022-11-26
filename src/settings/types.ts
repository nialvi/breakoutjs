export type Settings = {
  canvas: {
    width: PixelsAmount;
    height: PixelsAmount;
    borderWidth: PixelsAmount;
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
