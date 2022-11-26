export interface Input {
  on(type: EventType, cb: () => void): void;
}
