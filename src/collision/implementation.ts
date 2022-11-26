import { Collision } from "./types";

export class GameCollision implements Collision {
  withWalls(
    ball: BallEntity,
    objects: CollisionObject[],
    direction: Direction
  ): Position {
    let result: Position = "initial";

    objects.forEach((object) => {
      if (
        ball.x + ball.radius * direction.horizontal > object.x &&
        ball.x + ball.radius * direction.horizontal < object.x + object.width &&
        ball.y + ball.radius * direction.vertical > object.y &&
        ball.y + ball.radius * direction.vertical < object.y + object.height
      ) {
        result = object.position;
      }
    });

    return result;
  }
}
