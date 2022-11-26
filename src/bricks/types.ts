export interface BricksShape {
  get allBricks(): BrickEntity[][];
  changeState(id: ObjectId): BrickEntity[][];
}
