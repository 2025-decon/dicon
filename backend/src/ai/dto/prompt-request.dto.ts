import { IsString, IsNotEmpty } from 'class-validator';

export class PromptRequestDto {
  @IsString()
  @IsNotEmpty()
  userInput: string;
}
