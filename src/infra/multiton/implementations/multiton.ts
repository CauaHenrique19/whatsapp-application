import { MultitonInterface, TypeMultiton } from 'src/data/protocols/multiton';

export class Multiton<T> implements MultitonInterface<T> {
  private readonly instances: TypeMultiton<T>[] = [];

  public addInstance(instanceToAdd: TypeMultiton<T>): Promise<TypeMultiton<T>> {
    return new Promise<TypeMultiton<T>>((resolve, reject) => {
      const instanceInList = this.instances.find((instance) => instance.id === instanceToAdd.id);
      if (instanceInList) {
        reject();
      }

      this.instances.push(instanceToAdd);
      resolve(instanceToAdd);
    });
  }

  public getInstance(id: number): Promise<TypeMultiton<T>> {
    return new Promise<TypeMultiton<T>>((resolve) => {
      const instance = this.instances.find((instance) => instance.id === id);
      resolve(instance);
    });
  }
}
