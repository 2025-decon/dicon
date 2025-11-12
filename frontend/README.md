# Frontend - DICON

Next.js 기반 프론트엔드 애플리케이션

## 🚀 시작하기

### 의존성 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

서버가 [http://localhost:3001](http://localhost:3001)에서 실행됩니다.

### 프로덕션 빌드

```bash
npm run build
npm run start
```

## 📁 프로젝트 구조

```
frontend/
├── app/                # Next.js App Router
│   ├── page.tsx       # 메인 페이지
│   ├── login/         # 로그인
│   ├── signup/        # 회원가입
│   ├── create/        # 프롬프트 생성
│   ├── hub/           # AI 허브
│   ├── introduce/     # 소개
│   ├── context/       # 상황 설명
│   └── lib/           # 유틸리티
│       └── api.ts     # API 클라이언트
├── public/            # 정적 파일
├── package.json       # 의존성
├── tsconfig.json      # TypeScript 설정
└── next.config.ts     # Next.js 설정
```

## 🔧 기술 스택

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Material-UI (MUI)
- **State Management**: React Context API

## 📦 주요 의존성

- `next@15.5.4` - Next.js 프레임워크
- `react@19.1.0` - React 라이브러리
- `@mui/material` - Material-UI 컴포넌트
- `tailwindcss` - CSS 프레임워크

## 🔗 API 통신

### 공유 타입 사용

Frontend는 `../shared/types`의 순수 TypeScript 인터페이스를 사용합니다:

```typescript
// app/lib/api.ts
import type {
  SignInRequest,
  SignInResponse,
  ApiResponse
} from '@shared/types';

export const authApi = {
  login: async (email: string, password: string): Promise<ApiResponse<SignInResponse>> => {
    const request: SignInRequest = { email, password };
    return api.post<SignInResponse>('/signin', request);
  }
};
```

### API 클라이언트

`app/lib/api.ts`에서 모든 API 통신을 관리합니다:

- `authApi` - 인증 관련 API
- `aiApi` - AI 추천 및 프롬프트 생성
- `mypageApi` - 마이페이지 관련 API

## 🌐 환경변수

`.env.local` 파일 생성:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## ⚠️ 중요 원칙

### Backend 모듈 Import 금지

❌ **절대 하지 말 것:**
```typescript
// Backend NestJS 모듈을 직접 import - 금지!
import { AuthDTO } from '../../backend/src/auth/dto/authDto';
```

✅ **올바른 방법:**
```typescript
// 공유 타입 사용
import type { SignInRequest } from '@shared/types';
```

### 서버 분리

- Frontend와 Backend는 **완전히 분리**
- 공유 코드는 `shared/types`의 순수 TypeScript 인터페이스만 사용
- NestJS의 데코레이터나 모듈에 의존하지 않음

## 📝 개발 가이드

### 새로운 페이지 추가

1. `app/` 디렉토리에 폴더 생성
2. `page.tsx` 파일 생성
3. Next.js App Router가 자동으로 라우팅

### API 호출 추가

1. `shared/types`에 타입 정의
2. `app/lib/api.ts`에 API 함수 추가
3. 컴포넌트에서 사용

### 스타일링

- Tailwind CSS 유틸리티 클래스 사용
- MUI 컴포넌트 활용
- 커스텀 스타일은 CSS Modules 사용

## 🧪 테스트

```bash
npm run test
```

## 📚 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React 공식 문서](https://react.dev)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [MUI 문서](https://mui.com)
- [공유 타입 가이드](../shared/README.md)
