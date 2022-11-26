export interface EventListener {
  on(eventType: string, listener: () => void): void;
  off(eventType: string, listener: () => void): void;
  notify(eventType: string, data?: any): void;
}
