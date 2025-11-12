# Shared Types

이 디렉토리는 **Frontend(Next.js)**와 **Backend(NestJS)** 간에 공유되는 순수 TypeScript 타입 정의를 포함합니다.

## 📁 구조

```
shared/
└── types/
    ├── index.ts          # 모든 타입 export
    ├── api.types.ts      # API 공통 타입
    ├── auth.types.ts     # 인증 관련 타입
    ├── ai.types.ts       # AI 관련 타입
    └── mypage.types.ts   # 마이페이지 관련 타입
```

## 🎯 목적

### 문제점
- Next.js는 NestJS 모듈을 직접 import해서는 안 됩니다
- 두 서버는 완전히 분리되어야 합니다
- NestJS의 `class-validator` 데코레이터는 런타임 의존성을 추가합니다

### 해결책
- **순수 TypeScript 인터페이스**로 타입 정의
- NestJS 모듈이나 데코레이터에 의존하지 않음
- Frontend와 Backend가 동일한 타입을 사용하여 타입 안정성 보장

## 📝 사용 방법

### Frontend (Next.js)

```typescript
// app/lib/api.ts
import type {
  SignInRequest,
  SignInResponse,
  ApiResponse
} from '@/shared/types';

export const authApi = {
  login: async (email: string, password: string): Promise<ApiResponse<SignInResponse>> => {
    const request: SignInRequest = { email, password };
    return api.post<SignInResponse>('/signin', request);
  }
};
```

### Backend (NestJS)

Backend는 자체 DTO 클래스를 사용하지만, 응답 타입은 shared types와 일치해야 합니다:

```typescript
// backend/src/auth/auth.controller.ts
import { AuthDTO } from './dto/authDto';

@Post('signin')
async signIn(@Body() signInDto: AuthDTO.SignIn) {
  // 응답은 SignInResponse 타입과 일치
  return {
    message: '로그인 성공',
    accessToken: 'token...',
    user: { id: 1, email: 'user@example.com', nickname: 'User' }
  };
}
```

## 🔄 타입 동기화

Frontend와 Backend의 타입이 일치하는지 확인하세요:

1. **Request/Response 구조** - API 요청/응답 형식이 동일해야 함
2. **필드 이름** - camelCase 사용 (snake_case 아님)
3. **필드 타입** - TypeScript 타입이 정확히 일치해야 함

## ⚠️ 주의사항

### ❌ 하지 말아야 할 것

```typescript
// Frontend에서 NestJS 모듈 import - 절대 금지!
import { AuthDTO } from '@/backend/src/auth/dto/authDto';  // ❌
```

### ✅ 올바른 방법

```typescript
// Frontend에서 shared types import
import type { SignInRequest } from '@/shared/types';  // ✅
```

## 📦 타입 추가하기

새로운 API 엔드포인트를 추가할 때:

1. **shared/types**에 인터페이스 정의
2. Frontend API 클라이언트에서 사용
3. Backend DTO는 별도로 유지 (validation 데코레이터 포함)
4. Backend 응답이 shared types와 일치하는지 확인

### 예시: 새로운 기능 추가

```typescript
// 1. shared/types/feature.types.ts 생성
export interface FeatureRequest {
  data: string;
}

export interface FeatureResponse {
  result: string;
}

// 2. shared/types/index.ts에 export 추가
export * from './feature.types';

// 3. Frontend에서 사용
import type { FeatureRequest, FeatureResponse } from '@/shared/types';

// 4. Backend DTO는 별도로 생성 (validation 포함)
// backend/src/feature/dto/feature.dto.ts
export class FeatureRequestDto {
  @IsString()
  @IsNotEmpty()
  data: string;
}
```

## 🔍 타입 검증

TypeScript 컴파일러가 타입 불일치를 자동으로 감지합니다:

```bash
# Frontend 타입 체크
npm run build

# Backend 타입 체크
cd backend && npm run build
```

## 📚 참고 자료

- [TypeScript Handbook - Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)
- [NestJS - Validation](https://docs.nestjs.com/techniques/validation)
- [Monorepo 타입 공유 패턴](https://turbo.build/repo/docs/handbook/sharing-code)
