/**
 * 공유 타입 정의 - AI 관련
 * Frontend(Next.js)와 Backend(NestJS) 간 공유되는 순수 TypeScript 타입
 * NestJS 모듈이나 데코레이터에 의존하지 않음
 */

/**
 * AI 추천 요청
 */
export interface RecommendRequest {
  userInput: string;
}

/**
 * AI 추천 응답
 */
export interface RecommendResponse {
  recommendation: string;
  aiModel: string;
  link?: string;
}

/**
 * 프롬프트 생성 요청
 */
export interface PromptRequest {
  userInput: string;
}

/**
 * 프롬프트 생성 응답
 */
export interface PromptResponse {
  prompt: string;
  metadata?: {
    model?: string;
    timestamp?: string;
  };
}
