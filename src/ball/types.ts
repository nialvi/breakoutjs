export interface BallShape {
  create(x: Coordinate, y: Coordinate): BallEntity;
  setPosition(x: Coordinate, y: Coordinate): void;
  get radius(): Radius;
}
