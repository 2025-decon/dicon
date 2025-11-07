import { IsString, IsNotEmpty } from 'class-validator';

export class RecommendRequestDto {
  @IsString()
  @IsNotEmpty()
  userInput: string;
}
