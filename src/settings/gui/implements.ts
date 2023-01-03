import LilGui from "lil-gui";

import { Settings } from "settings/types";
import { Storage } from "../storage/types";
import { Config, ItemsKeys, GUI } from "./types";

export class GUISettings implements GUI {
  private config: Config;
  private gui: LilGui;

  constructor(
    private settings: Settings,
    private storage: Storage,
    private window: Window
  ) {
    this.gui = new LilGui();

    this.config = {
      row: this.settings.bricks.amount.row,
      col: this.settings.bricks.amount.column,
      paddleFriction: this.settings.paddle.friction,
      paddleAcceleration: this.settings.paddle.acceleration,
      paddleMinSpeed: this.settings.paddle.speed.horizontal.min,
      paddleMaxSpeed: this.settings.paddle.speed.horizontal.max,
      resetSettings: () => {
        this.storage.clear();
        this.window.location.reload();
      },
    };
  }

  addController(key: string, onFinish: (value: any) => void) {
    this.gui.add(this.config, key).onFinishChange(onFinish);
  }

  create(): void {
    this.addController(ItemsKeys.RowAmount, (value: any) => {
      this.settings.bricks.amount.row = value;
      this.storage.setItem(ItemsKeys.RowAmount, value);
    });

    this.addController(ItemsKeys.ColAmount, (value: any) => {
      this.settings.bricks.amount.column = value;
      this.storage.setItem(ItemsKeys.ColAmount, value);
    });

    this.addController(ItemsKeys.PaddleFriction, (value: any) => {
      this.settings.paddle.friction = value;
      this.storage.setItem(ItemsKeys.PaddleFriction, value);
    });

    this.addController(ItemsKeys.PaddleAcceleration, (value: any) => {
      this.settings.paddle.acceleration = value;
      this.storage.setItem(ItemsKeys.PaddleAcceleration, value);
    });

    this.addController(ItemsKeys.PaddleMaxSpeed, (value: any) => {
      this.settings.paddle.speed.horizontal.max = value;
      this.storage.setItem(ItemsKeys.PaddleMaxSpeed, value);
    });

    this.addController(ItemsKeys.PaddleMinSpeed, (value: any) => {
      this.settings.paddle.speed.horizontal.min = value;
      this.storage.setItem(ItemsKeys.PaddleMinSpeed, value);
    });

    this.gui.add(this.config, "resetSettings");
  }

  onChange(callback: (event: any) => void): void {
    this.gui.onFinishChange((event) => {
      callback(event);
    });
  }
}
