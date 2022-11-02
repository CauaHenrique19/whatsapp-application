import { IsString } from 'class-validator';

export class CreateClientDTO {
  @IsString()
  name: string;
}
