/**
 * API 클라이언트 유틸리티
 * Backend API와의 통신을 위한 공통 함수들
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

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
  login: async (email: string, password: string) => {
    const response = await api.post<{
      message: string;
      accessToken: string;
      user: { id: number; email: string; nickname: string };
    }>('/signin', { email, password });

    if (response.data?.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response;
  },

  // 회원가입
  signup: async (email: string, password: string, nickname: string) => {
    return api.post('/user/signup', { email, password, nickname });
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
  recommend: async (situation: string) => {
    return api.post('/ai/recommend', { situation });
  },

  // 프롬프트 생성
  generatePrompt: async (data: any) => {
    return api.post('/ai/prompt', data);
  },
};

/**
 * 마이페이지 관련 API
 */
export const mypageApi = {
  // 사용자 정보 조회 (JWT 필수)
  getUserInfo: async () => {
    return api.get<{
      id: number;
      email: string;
      nickname: string;
      created_at: string;
    }>('/mypage');
  },

  // 닉네임 변경 (JWT 필수)
  updateNickname: async (nickname: string) => {
    return api.patch<{
      message: string;
      nickname: string;
    }>('/mypage/nickname', { nickname });
  },

  // 비밀번호 변경 (JWT 필수)
  updatePassword: async (currentPassword: string, newPassword: string) => {
    return api.patch<{
      message: string;
    }>('/mypage/password', { currentPassword, newPassword });
  },
};

export default api;
