type PixelsAmount = number;
type Coordinate = number;
type Radius = number;

type BallEntity = {
  x: Coordinate;
  y: Coordinate;
  radius: Radius;
};

type RectangleEntity = {
  x: Coordinate;
  y: Coordinate;
  height: number;
  width: number;
  color?: HexColor;
};

type Point = {
  x: Coordinate;
  y: Coordinate;
};
