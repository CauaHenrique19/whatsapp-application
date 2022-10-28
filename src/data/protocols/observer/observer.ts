export interface ObserverInterface<T> {
  notify(data: T): void;
}
