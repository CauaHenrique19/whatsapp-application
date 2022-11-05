import { IsNumber } from 'class-validator';

export class ConnectToWhatsappDTO {
  @IsNumber()
  clientId: number;
}
