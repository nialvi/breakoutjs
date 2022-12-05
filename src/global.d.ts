type SessionStorage = WindowSessionStorage["sessionStorage"];

type Nullable<T> = T | null;

type HexColor = string;
type ObjectId = string;

type ObjectType = "wall" | "ball" | "paddle" | "brick";

type Speed = {
  horizontal: {
    current: number;
    max: number;
    min: number;
  };
  vertical: {
    current: number;
    max: number;
    min: number;
  };
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

type BallEntity = CircleEntity & {
  id: ObjectId;
  type: ObjectType;
  speed: Speed;
  direction: Direction;
};

type Status = "normal" | "dead" | "hidden";
type WallEntity = CollisionObject;
type PaddleEntity = CollisionObject & { speed: Speed; acceleration: number };
type BrickEntity = CollisionObject;

type EventType = "left" | "right" | "top" | "bottom";
