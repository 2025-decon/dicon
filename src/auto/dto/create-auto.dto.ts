import { IsNumber, IsString } from 'class-validator'; 

export class CreateAutoDto {
  @IsString()
  name: string; 

  @IsNumber()
  year: number;
}