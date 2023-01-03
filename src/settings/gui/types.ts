export enum ItemsKeys {
  RowAmount = "row",
  ColAmount = "col",
  PaddleMinSpeed = "paddleMinSpeed",
  PaddleMaxSpeed = "paddleMaxSpeed",
  PaddleFriction = "paddleFriction",
  PaddleAcceleration = "paddleAcceleration",
}

export type SettingsFromStorage = {
  [key in ItemsKeys]?: number;
};

export type Config = SettingsFromStorage & { resetSettings(): void };

export interface GUI {
  create(): void;
  onChange(callback: (event: any) => void): void;
}
