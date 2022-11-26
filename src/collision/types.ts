type WallType = "left" | "right" | "top" | "bottom";

export interface Collision {
  withWalls(
    ball: BallEntity,
    walls: WallEntity[],
    direction: Direction
  ): Position;
}
