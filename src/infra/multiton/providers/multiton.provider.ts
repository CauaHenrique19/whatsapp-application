import { Provider } from '@nestjs/common';
import { Multiton } from '../implementations';
import { MULTITON_LOCAL } from './providers';

export const produtoProvider: Provider = {
  provide: MULTITON_LOCAL,
  useValue: Multiton,
};
