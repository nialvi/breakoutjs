export interface PaddleShape {
  create(x: Coordinate, y: Coordinate): PaddleEntity;
  get width(): number;
  get height(): number;
  get speed(): Speed;
}
