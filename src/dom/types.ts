export interface ElementSource {
  getElementById(id: string): Nullable<HTMLElement>;
  animateFrame(callback: (timestamp: number) => void): number;
  cancelAnimationFrame(timer: number): void;
  get canvas(): HTMLCanvasElement;
}

export interface PixelRatioSource {
  devicePixelRatio?: number;
}
