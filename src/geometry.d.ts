type PixelsAmount = number;
type Coordinate = number;
type Radius = number;

type CircleEntity = {
  x: Coordinate;
  y: Coordinate;
  radius: Radius;
};

type RectangleEntity = {
  x: Coordinate;
  y: Coordinate;
  height: PixelsAmount;
  width: PixelsAmount;
  color?: HexColor;
  borderRadius?: PixelsAmount;
};

type Point = {
  x: Coordinate;
  y: Coordinate;
};
