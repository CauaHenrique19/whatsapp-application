import { TypeMultiton } from '.';

export interface MultitonInterface<T> {
  /** 
      @param {TypeMultiton<T>} instanceToAdd Instance to add in list of intances
      @returns {TypeMultiton<T>} union of instance and id used to search (if the value was added successfully)
    */
  addInstance(instanceToAdd: TypeMultiton<T>): Promise<TypeMultiton<T>>;

  /** 
      @param {string} id Id to search instance
      @returns {TypeMultiton<T>} union of instance and id used to search (if value has been found)
    */
  getInstance(id: string): Promise<TypeMultiton<T>>;
}
