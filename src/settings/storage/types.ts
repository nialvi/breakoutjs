import { SettingsFromStorage } from "settings/gui/types";

export interface Storage {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  getSettings(): SettingsFromStorage;
  clear(): void;
}
