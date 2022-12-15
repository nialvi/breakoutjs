export interface BricksShape {
  get entity(): BrickEntity[][];
  changeState(id: ObjectId): BrickEntity[][];
  reset(): void;
}
