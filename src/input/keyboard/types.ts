export interface KeyboardInput {
  on(type: EventType, cb: (data: any) => void): void;
  get keyPressed(): boolean;
}
