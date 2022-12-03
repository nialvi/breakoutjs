export interface EventListener {
  on(eventType: EventType, listener: (data?: any) => void): void;
  off(eventType: EventType, listener: (data?: any) => void): void;
  notify(eventType: EventType, data?: any): void;
}
