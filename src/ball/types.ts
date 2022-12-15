export interface BallShape {
  get entity(): BallEntity;
  get radius(): Radius;
  changeHorizontalDirection(): void;
  changeVerticalDirection(): void;
  setPosition(x: Coordinate, y: Coordinate): BallEntity;
  reset(): void;
  setCurrentSpeed(amount: number): void;
}
