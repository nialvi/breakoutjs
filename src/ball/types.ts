export interface BallShape {
  create(x: Coordinate, y: Coordinate): BallEntity;
  setPosition(x: Coordinate, y: Coordinate): BallEntity;
  getNextBallEntity(): BallEntity;
  changeHorizontalDirection(): void;
  changeVerticalDirection(): void;
  get radius(): Radius;
}
