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

type Position = "initial" | "left" | "right" | "top" | "bottom";

type WallEntity = RectangleEntity & {
  status: "normal" | "dead";
  position: Position;
};

type Point = {
  x: Coordinate;
  y: Coordinate;
};

type Direction = {
  /**
   * - 1 - to the right
   * - -1 - to the left
   */
  horizontal: 1 | -1;
  /**
   * - 1 - to the bottom
   * - -1 - to the top
   */
  vertical: 1 | -1;
};
