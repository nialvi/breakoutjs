import { ItemsKeys, SettingsFromStorage } from "../gui/types";
import { Storage } from "./types";

export class GameStorage implements Storage {
  constructor(private window: Window) {}

  getItem(key: string): string | null {
    return this.window.sessionStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    this.window.sessionStorage.setItem(key, value);
  }

  getSettings(): SettingsFromStorage {
    const rowAmount = this.getItem(ItemsKeys.RowAmount);
    const colAmount = this.getItem(ItemsKeys.ColAmount);
    const acceleration = this.getItem(ItemsKeys.PaddleAcceleration);
    const friction = this.getItem(ItemsKeys.PaddleFriction);
    const paddleMinSpeed = this.getItem(ItemsKeys.PaddleMinSpeed);
    const paddleMaxSpeed = this.getItem(ItemsKeys.PaddleMaxSpeed);
    const ballSpeed = this.getItem(ItemsKeys.BallSpeed);

    return {
      ...(rowAmount ? { [ItemsKeys.RowAmount]: Number(rowAmount) } : {}),
      ...(colAmount ? { [ItemsKeys.ColAmount]: Number(colAmount) } : {}),
      ...(friction ? { [ItemsKeys.PaddleFriction]: Number(friction) } : {}),
      ...(ballSpeed ? { [ItemsKeys.BallSpeed]: Number(ballSpeed) } : {}),
      ...(acceleration
        ? { [ItemsKeys.PaddleAcceleration]: Number(acceleration) }
        : {}),
      ...(paddleMinSpeed
        ? { [ItemsKeys.PaddleMinSpeed]: Number(paddleMinSpeed) }
        : {}),
      ...(paddleMaxSpeed
        ? { [ItemsKeys.PaddleMaxSpeed]: Number(paddleMaxSpeed) }
        : {}),
    };
  }

  clear(): void {
    this.window.sessionStorage.clear();
  }
}
