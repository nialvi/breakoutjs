type Nullable<T> = T | null;

type HexColor = string;

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

type Status = "normal" | "dead";

type CollisionObject = RectangleEntity & {
  position: Position;
};

type WallEntity = CollisionObject & {
  status: Status;
};
type PaddleEntity = CollisionObject;
type BrickEntity = CollisionObject;
