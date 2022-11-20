export interface Application {
  start(): void;
  loopGame(): void;
  drawFrame(timestamp: number): void;
}
