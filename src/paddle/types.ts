export interface PaddleShape {
  get entity(): PaddleEntity;
  get width(): number;
  get height(): number;
  get speed(): Speed;
  get x(): PixelsAmount;
  get y(): PixelsAmount;
  changePosition(type: "left" | "right" | "stop"): void;
  reset(): void;
}
