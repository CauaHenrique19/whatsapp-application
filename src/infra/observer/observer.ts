import { ObserverInterface } from '../../data/protocols/observer';

export class Observer<T> implements ObserverInterface<T> {
  constructor(private readonly fn: (data: T) => void) {}

  notify(data: T): void {
    this.fn(data);
  }
}
