import { Collision } from "./types";

export class GameCollision implements Collision {
  withObjects(ball: BallEntity, objects: CollisionObject[]): CollisionObject {
    let result = {} as CollisionObject;

    objects.forEach((object) => {
      if (object.status === "hidden") {
        return;
      }

      if (
        ball.x + ball.radius * ball.direction.horizontal > object.x &&
        ball.x + ball.radius * ball.direction.horizontal <
          object.x + object.width &&
        ball.y + ball.radius * ball.direction.vertical > object.y &&
        ball.y + ball.radius * ball.direction.vertical <
          object.y + object.height
      ) {
        result = object;
      }
    });

    return result;
  }
}
