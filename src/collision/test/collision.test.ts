import { GameCollision } from "../implementation";
import { Ball } from "../../ball/implementation";
import { Paddle } from "../../paddle/implementation";
import { mockSettings } from "../../settings/test/mock";

describe("Collision", () => {
  it("should not get collision", () => {
    const collision = new GameCollision();
    const ball = new Ball(mockSettings);
    const paddle = new Paddle(mockSettings);

    expect(collision.withObjects(ball.entity, [paddle.entity])).toStrictEqual(
      {}
    );
  });

  it("should return paddle entity", () => {
    const collision = new GameCollision();
    const ball = new Ball(mockSettings);
    const paddle = new Paddle(mockSettings);

    paddle.entity.x = 100;
    paddle.entity.y = 264;

    expect(collision.withObjects(ball.entity, [paddle.entity])).toStrictEqual(
      paddle.entity
    );
  });
});
