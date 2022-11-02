import { IsEmail, IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;

  @IsString()
  confirmationPassword: string;

  @IsBoolean()
  admin: boolean;

  @IsNumber()
  clientId: number;
}
