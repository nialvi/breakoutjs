import { EventListener } from "./types";

export class Listener implements EventListener {
  private listeners: { [key: string]: Array<(data?: any) => void> };

  constructor() {
    this.listeners = {};
  }

  on(eventType: string, listener: () => void): void {
    if (this.listeners[eventType]) {
      this.listeners[eventType].push(listener);
    } else {
      this.listeners[eventType] = [listener];
    }
  }

  off(eventType: string, listener: () => void): void {}

  notify(eventType: string, data?: any): void {
    console.log("debug events", eventType);
    this.listeners[eventType]?.forEach((listener) => {
      listener(data);
    });
  }
}
