export interface ElementSource {
  getElementById(id: string): Nullable<HTMLElement>;
}

export interface PixelRatioSource {
  devicePixelRatio?: number;
}
