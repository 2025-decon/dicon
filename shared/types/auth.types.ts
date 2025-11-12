/**
 * 공유 타입 정의 - 인증 관련
 * Frontend(Next.js)와 Backend(NestJS) 간 공유되는 순수 TypeScript 타입
 * NestJS 모듈이나 데코레이터에 의존하지 않음
 */

/**
 * 로그인 요청
 */
export interface SignInRequest {
  email: string;
  password: string;
}

/**
 * 로그인 응답
 */
export interface SignInResponse {
  message: string;
  accessToken: string;
  user: {
    id: number;
    email: string;
    nickname: string;
  };
}

/**
 * 회원가입 요청
 */
export interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
}

/**
 * 회원가입 응답
 */
export interface SignUpResponse {
  message: string;
  user: {
    id: number;
    email: string;
    nickname: string;
  };
}

/**
 * 사용자 정보
 */
export interface User {
  id: number;
  email: string;
  nickname: string;
  created_at?: string;
}
