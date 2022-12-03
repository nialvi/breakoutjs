type WallType = "left" | "right" | "top" | "bottom";

export interface Collision {
  withObjects(ball: BallEntity, objects: CollisionObject[]): CollisionObject;
}
