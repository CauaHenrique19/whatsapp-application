export interface TransactionManager {
  handleTransaction<T>(cb: (transaction: any) => T): Promise<T>;
}
