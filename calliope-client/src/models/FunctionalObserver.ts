// FunctionalObserver.ts
import { Observer } from "@/models/Observer";

export class FunctionalObserver implements Observer {
  constructor(private readonly callback: () => void) {}

  update(): void {
    this.callback();
  }
}
