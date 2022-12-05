export enum ItemsKeys {
  RowAmount = "row",
  ColAmount = "col",
}

export type SettingsFromStorage = {
  [key in ItemsKeys]?: number;
};

export type Config = SettingsFromStorage & { resetSettings(): void };

export interface GUI {
  create(): void;
  onChange(callback: (event: any) => void): void;
}
