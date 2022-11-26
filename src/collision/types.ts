type WallType = "left" | "right" | "top" | "bottom";

export interface Collision {
  withWalls(
    ball: BallEntity,
    objects: CollisionObject[],
    direction: Direction
  ): Position;
}
