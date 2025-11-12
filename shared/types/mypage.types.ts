/**
 * 공유 타입 정의 - 마이페이지 관련
 * Frontend(Next.js)와 Backend(NestJS) 간 공유되는 순수 TypeScript 타입
 * NestJS 모듈이나 데코레이터에 의존하지 않음
 */

/**
 * 사용자 정보 조회 응답
 */
export interface UserInfoResponse {
  id: number;
  email: string;
  nickname: string;
  created_at: string;
}

/**
 * 닉네임 변경 요청
 */
export interface UpdateNicknameRequest {
  nickname: string;
}

/**
 * 닉네임 변경 응답
 */
export interface UpdateNicknameResponse {
  message: string;
  nickname: string;
}

/**
 * 비밀번호 변경 요청
 */
export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

/**
 * 비밀번호 변경 응답
 */
export interface UpdatePasswordResponse {
  message: string;
}
