import { Injectable } from '@nestjs/common';

@Injectable()
export class AiConfig {
  readonly serverUrl: string;

  constructor() {
    this.serverUrl = process.env.AI_SERVER_URL || 'http://localhost:8000';
  }

  getRecommendEndpoint(): string {
    return `${this.serverUrl}/ai/recommend`;
  }

  getPromptEndpoint(): string {
    return `${this.serverUrl}/ai/prompt`;
  }
}
