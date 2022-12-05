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
      resetSettings: () => {
        this.storage.clear();
        this.window.location.reload();
      },
    };
  }

  create(): void {
    this.gui
      .add(this.config, ItemsKeys.RowAmount)
      .onFinishChange((value: any) => {
        this.settings.bricks.amount.row = value;

        this.storage.setItem(ItemsKeys.RowAmount, value);
      });
    this.gui
      .add(this.config, ItemsKeys.ColAmount)
      .onFinishChange((value: any) => {
        this.settings.bricks.amount.column = value;

        this.storage.setItem(ItemsKeys.ColAmount, value);
      });
    this.gui.add(this.config, "resetSettings");
  }

  onChange(callback: (event: any) => void): void {
    this.gui.onFinishChange((event) => {
      callback(event);
    });
  }
}
