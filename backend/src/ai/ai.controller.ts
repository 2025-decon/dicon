import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import {
  RecommendRequestDto,
  PromptRequestDto,
  RecommendResponseDto,
  PromptResponseDto,
} from './dto';

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
