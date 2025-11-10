import { Injectable } from '@nestjs/common';
import {
  RecommendRequestDto,
  PromptRequestDto,
  RecommendResponseDto,
  PromptResponseDto,
} from './dto';
import { AiConfig } from './config/ai.config';
import { AiHttpClient } from './utils/ai-http.client';
import { AiErrorHandler } from './utils/ai-error.handler';

@Injectable()
export class AiService {
  constructor(
    private readonly config: AiConfig,
    private readonly httpClient: AiHttpClient,
  ) {}

  async getRecommendation(dto: RecommendRequestDto): Promise<RecommendResponseDto> {
    try {
      return await this.httpClient.post<RecommendResponseDto>(
        this.config.getRecommendEndpoint(),
        { user_input: dto.userInput },
      );
    } catch (error) {
      AiErrorHandler.handleError(error, 'AI 추천 중 오류가 발생했습니다.');
    }
  }

  async generatePrompt(dto: PromptRequestDto): Promise<PromptResponseDto> {
    try {
      return await this.httpClient.post<PromptResponseDto>(
        this.config.getPromptEndpoint(),
        { user_input: dto.userInput },
      );
    } catch (error) {
      AiErrorHandler.handleError(error, 'AI 프롬프트 생성 중 오류가 발생했습니다.');
    }
  }
}
