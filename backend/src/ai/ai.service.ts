import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { RecommendRequestDto } from './dto/recommend-request.dto';
import { PromptRequestDto } from './dto/prompt-request.dto';
import { RecommendResponseDto } from './dto/recommend-response.dto';
import { PromptResponseDto } from './dto/prompt-response.dto';

@Injectable()
export class AiService {
  private readonly AI_SERVER_URL = process.env.AI_SERVER_URL || 'http://localhost:8000';

  constructor(private readonly httpService: HttpService) {}

  async getRecommendation(dto: RecommendRequestDto): Promise<RecommendResponseDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.AI_SERVER_URL}/ai/recommend`, {
          user_input: dto.userInput,
        }),
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data.detail || 'AI 추천 중 오류가 발생했습니다.',
          error.response.status,
        );
      }
      throw new HttpException(
        'AI 서버와 통신 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async generatePrompt(dto: PromptRequestDto): Promise<PromptResponseDto> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.AI_SERVER_URL}/ai/prompt`, {
          user_input: dto.userInput,
        }),
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data.detail || 'AI 프롬프트 생성 중 오류가 발생했습니다.',
          error.response.status,
        );
      }
      throw new HttpException(
        'AI 서버와 통신 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
