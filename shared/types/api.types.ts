/**
 * 공유 타입 정의 - API 공통
 * Frontend(Next.js)와 Backend(NestJS) 간 공유되는 순수 TypeScript 타입
 * NestJS 모듈이나 데코레이터에 의존하지 않음
 */

/**
 * API 응답 공통 인터페이스
 */
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

/**
 * 에러 응답
 */
export interface ErrorResponse {
  message: string;
  statusCode: number;
  error?: string;
}

/**
 * 성공 응답
 */
export interface SuccessResponse<T = any> {
  message: string;
  data?: T;
}
