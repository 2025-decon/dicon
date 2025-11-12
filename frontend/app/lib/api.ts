/**
 * API 클라이언트 유틸리티
 * Backend API와의 통신을 위한 공통 함수들
 */

import type {
  ApiResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  RecommendRequest,
  RecommendResponse,
  PromptRequest,
  PromptResponse,
  UserInfoResponse,
  UpdateNicknameRequest,
  UpdateNicknameResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
} from '@shared/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/**
 * API 요청을 보내는 공통 함수
 */
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // JWT 토큰이 있으면 헤더에 추가
    const token = localStorage.getItem('accessToken');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      credentials: 'include', // 쿠키 포함
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.message || 'API 요청 실패',
        status: response.status,
      };
    }

    return {
      data,
      status: response.status,
    };
  } catch (error) {
    console.error('API 요청 에러:', error);
    return {
      error: error instanceof Error ? error.message : '알 수 없는 에러',
      status: 500,
    };
  }
}

/**
 * API 클라이언트
 */
export const api = {
  // GET 요청
  get: <T = any>(endpoint: string) =>
    apiRequest<T>(endpoint, { method: 'GET' }),

  // POST 요청
  post: <T = any>(endpoint: string, body?: any) =>
    apiRequest<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  // PATCH 요청
  patch: <T = any>(endpoint: string, body?: any) =>
    apiRequest<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  // DELETE 요청
  delete: <T = any>(endpoint: string) =>
    apiRequest<T>(endpoint, { method: 'DELETE' }),
};

/**
 * 인증 관련 API
 */
export const authApi = {
  // 로그인
  login: async (email: string, password: string): Promise<ApiResponse<SignInResponse>> => {
    const request: SignInRequest = { email, password };
    const response = await api.post<SignInResponse>('/signin', request);

    if (response.data?.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response;
  },

  // 회원가입
  signup: async (email: string, password: string, nickname: string): Promise<ApiResponse<SignUpResponse>> => {
    const request: SignUpRequest = { email, password, nickname };
    return api.post<SignUpResponse>('/user/signup', request);
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  // 현재 로그인한 사용자 정보 가져오기
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // 로그인 상태 확인
  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },
};

/**
 * AI 관련 API
 */
export const aiApi = {
  // AI 추천
  recommend: async (userInput: string): Promise<ApiResponse<RecommendResponse>> => {
    const request: RecommendRequest = { userInput };
    return api.post<RecommendResponse>('/ai/recommend', request);
  },

  // 프롬프트 생성
  generatePrompt: async (userInput: string): Promise<ApiResponse<PromptResponse>> => {
    const request: PromptRequest = { userInput };
    return api.post<PromptResponse>('/ai/prompt', request);
  },
};

/**
 * 마이페이지 관련 API
 */
export const mypageApi = {
  // 사용자 정보 조회 (JWT 필수)
  getUserInfo: async (): Promise<ApiResponse<UserInfoResponse>> => {
    return api.get<UserInfoResponse>('/mypage');
  },

  // 닉네임 변경 (JWT 필수)
  updateNickname: async (nickname: string): Promise<ApiResponse<UpdateNicknameResponse>> => {
    const request: UpdateNicknameRequest = { nickname };
    return api.patch<UpdateNicknameResponse>('/mypage/nickname', request);
  },

  // 비밀번호 변경 (JWT 필수)
  updatePassword: async (currentPassword: string, newPassword: string): Promise<ApiResponse<UpdatePasswordResponse>> => {
    const request: UpdatePasswordRequest = { currentPassword, newPassword };
    return api.patch<UpdatePasswordResponse>('/mypage/password', request);
  },
};

export default api;
