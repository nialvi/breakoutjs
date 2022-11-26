type Nullable<T> = T | null;

type HexColor = string;
type ObjectId = string;

type ObjectType = "wall" | "ball" | "paddle" | "brick";

type Speed = {
  horizontal: number;
  vertical: number;
};

type Position = "initial" | "left" | "right" | "top" | "bottom";
type Direction = {
  /**
   * - 1 - to the right
   * - -1 - to the left
   */
  horizontal: 1 | -1;
  /**
   * - 1 - to the bottom
   * - -1 - to the top
   */
  vertical: 1 | -1;
};

type CollisionObject = RectangleEntity & {
  id: ObjectId;
  type: ObjectType;
  position: Position;
  status: Status;
};

type Status = "normal" | "dead" | "hidden";
type WallEntity = CollisionObject;
type PaddleEntity = CollisionObject;
type BrickEntity = CollisionObject;

type EventType = "left" | "right" | "top" | "bottom";
