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

    return {
      ...(rowAmount ? { [ItemsKeys.RowAmount]: Number(rowAmount) } : {}),
      ...(colAmount ? { [ItemsKeys.ColAmount]: Number(colAmount) } : {}),
    };
  }

  clear(): void {
    this.window.sessionStorage.clear();
  }
}
