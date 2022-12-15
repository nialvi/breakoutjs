export interface BallShape {
  get entity(): BallEntity;
  get radius(): Radius;
  changeHorizontalDirection(): void;
  changeVerticalDirection(): void;
  setPosition(x: Coordinate, y: Coordinate): BallEntity;
  resetPosition(): BallEntity;
  setCurrentSpeed(amount: number): void;
}
