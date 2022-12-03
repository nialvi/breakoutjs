export interface Input {
  on(type: EventType, cb: (data: any) => void): void;
  get keyPressed(): boolean;
}
