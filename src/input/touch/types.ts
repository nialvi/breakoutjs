export interface TouchInput {
  on(type: EventType, cb: (data: any) => void): void;
  get keyPressed(): boolean;
}
