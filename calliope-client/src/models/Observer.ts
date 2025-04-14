// Observer.ts
export interface Observer {
  update(): void;
}

// Subject.ts
export interface Subject {
  subscribe(observer: Observer): () => void;
  notifyObservers(): void;
}
