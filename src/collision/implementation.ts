import { Collision } from "./types";

export class GameCollision implements Collision {
  withWalls(
    ball: BallEntity,
    walls: WallEntity[],
    direction: Direction
  ): Position {
    let result: Position = "initial";

    walls.forEach((wall) => {
      if (
        ball.x + ball.radius * direction.horizontal > wall.x &&
        ball.x + ball.radius * direction.horizontal < wall.x + wall.width &&
        ball.y + ball.radius * direction.vertical > wall.y &&
        ball.y + ball.radius * direction.vertical < wall.y + wall.height
      ) {
        result = wall.position;
      }
    });

    return result;
  }
}
