export interface BallShape {
  create(x: Coordinate, y: Coordinate, radius: Radius): BallEntity;
  setPosition(x: Coordinate, y: Coordinate): void;
}
