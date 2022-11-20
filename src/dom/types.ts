export interface ElementSource {
  getElementById(id: string): Nullable<HTMLElement>;
  animateFrame(callback: (timestamp: number) => void): number;
}

export interface PixelRatioSource {
  devicePixelRatio?: number;
}
