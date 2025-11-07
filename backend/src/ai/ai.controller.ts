import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { RecommendRequestDto } from './dto/recommend-request.dto';
import { PromptRequestDto } from './dto/prompt-request.dto';
import { RecommendResponseDto } from './dto/recommend-response.dto';
import { PromptResponseDto } from './dto/prompt-response.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('recommend')
  async recommend(@Body() dto: RecommendRequestDto): Promise<RecommendResponseDto> {
    return this.aiService.getRecommendation(dto);
  }

  @Post('prompt')
  async prompt(@Body() dto: PromptRequestDto): Promise<PromptResponseDto> {
    return this.aiService.generatePrompt(dto);
  }
}
