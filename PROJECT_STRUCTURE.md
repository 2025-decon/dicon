# DICON 프로젝트 구조

이 문서는 프로젝트의 폴더 구조와 각 디렉토리의 역할을 설명합니다.

## 📁 전체 구조

```
dicon/
├── frontend/              # Frontend 애플리케이션 (Next.js)
├── backend/               # Backend 애플리케이션 (NestJS)
├── shared/                # Frontend-Backend 공유 타입
├── .git/                  # Git 저장소
├── .gitignore             # Git 무시 파일 목록
└── README.md              # 프로젝트 메인 문서
```

## 🎨 Frontend (Next.js)

**위치**: `frontend/`

**역할**: 사용자 인터페이스 및 클라이언트 사이드 로직

```
frontend/
├── app/                   # Next.js App Router
│   ├── page.tsx          # 메인 페이지 (/)
│   ├── login/            # 로그인 페이지 (/login)
│   ├── signup/           # 회원가입 페이지 (/signup)
│   ├── create/           # 프롬프트 생성 (/create)
│   ├── hub/              # AI 허브 (/hub)
│   ├── introduce/        # 소개 페이지 (/introduce)
│   ├── context/          # 상황 설명 (/context)
│   └── lib/              # 유틸리티 함수
│       └── api.ts        # API 클라이언트
├── public/               # 정적 파일 (이미지, 폰트 등)
├── package.json          # Frontend 의존성
├── tsconfig.json         # TypeScript 설정
├── next.config.ts        # Next.js 설정
├── postcss.config.mjs    # PostCSS 설정
└── README.md             # Frontend 문서
```

**실행 방법**:
```bash
cd frontend
npm install
npm run dev
```

**포트**: 3001

## 🔧 Backend (NestJS)

**위치**: `backend/`

**역할**: API 서버, 비즈니스 로직, 데이터베이스 연동

```
backend/
├── src/
│   ├── ai/               # AI 서버 연동 모듈
│   │   ├── ai.controller.ts
│   │   ├── ai.service.ts
│   │   └── dto/          # AI 관련 DTO
│   ├── auth/             # 인증 모듈
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── dto/          # 인증 관련 DTO
│   ├── user/             # 사용자 관리 모듈
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   ├── user.entity.ts
│   │   └── dto/          # 사용자 관련 DTO
│   ├── mypage/           # 마이페이지 모듈
│   │   ├── mypage.controller.ts
│   │   ├── mypage.service.ts
│   │   └── dto/          # 마이페이지 관련 DTO
│   ├── app.module.ts     # 루트 모듈
│   └── main.ts           # 애플리케이션 진입점
├── test/                 # 테스트 파일
├── package.json          # Backend 의존성
├── tsconfig.json         # TypeScript 설정
├── nest-cli.json         # NestJS CLI 설정
├── ARCHITECTURE.md       # 백엔드 아키텍처 가이드
└── README_AI.md          # AI 서버 연동 가이드
```

**실행 방법**:
```bash
cd backend
npm install
npm run start:dev
```

**포트**: 3001

## 📦 Shared (공유 타입)

**위치**: `shared/`

**역할**: Frontend와 Backend 간 공유되는 순수 TypeScript 타입 정의

```
shared/
├── types/
│   ├── index.ts          # 모든 타입 export
│   ├── api.types.ts      # API 공통 타입
│   ├── auth.types.ts     # 인증 관련 타입
│   ├── ai.types.ts       # AI 관련 타입
│   └── mypage.types.ts   # 마이페이지 관련 타입
└── README.md             # 타입 공유 가이드
```

**특징**:
- NestJS 모듈이나 데코레이터에 의존하지 않음
- 순수 TypeScript 인터페이스만 사용
- Frontend와 Backend 모두에서 사용 가능

**사용 예시**:

Frontend:
```typescript
import type { SignInRequest, SignInResponse } from '@shared/types';
```

Backend:
```typescript
// Backend는 자체 DTO 클래스를 사용하지만,
// 응답 타입은 shared types와 일치해야 함
```

## 🔄 데이터 흐름

```
사용자 브라우저
    ↓
Frontend (Next.js:3001)
    ↓ HTTP Request (공유 타입 사용)
Backend (NestJS:3001)
    ↓
├─→ MySQL Database (3306)
└─→ AI Server (FastAPI:8000)
```

## 🚫 중요 원칙

### 1. 서버 완전 분리
- Frontend와 Backend는 **완전히 독립적**
- Frontend에서 Backend 모듈을 직접 import 금지

### 2. 타입 공유 규칙
- 공유 타입은 `shared/types`에만 정의
- NestJS 데코레이터 사용 금지
- 순수 TypeScript 인터페이스만 사용

### 3. 의존성 관리
- Frontend와 Backend는 각자의 `package.json` 관리
- `node_modules`는 각 폴더에 독립적으로 설치

## 📝 개발 워크플로우

### 새로운 기능 추가 시

1. **타입 정의** (`shared/types/`)
   - API 요청/응답 인터페이스 정의

2. **Backend 개발** (`backend/src/`)
   - DTO 클래스 생성 (validation 포함)
   - Controller, Service 구현
   - 응답이 shared types와 일치하는지 확인

3. **Frontend 개발** (`frontend/app/`)
   - API 클라이언트 함수 추가 (`app/lib/api.ts`)
   - 페이지/컴포넌트 구현
   - 공유 타입 사용

### 실행 순서

1. **AI Server** (별도 저장소)
2. **Backend** (`cd backend && npm run start:dev`)
3. **Frontend** (`cd frontend && npm run dev`)

## 🔍 파일 찾기

### Frontend 관련
- 페이지: `frontend/app/[페이지명]/page.tsx`
- API 클라이언트: `frontend/app/lib/api.ts`
- 스타일: Tailwind CSS (인라인) 또는 CSS Modules

### Backend 관련
- Controller: `backend/src/[모듈명]/[모듈명].controller.ts`
- Service: `backend/src/[모듈명]/[모듈명].service.ts`
- DTO: `backend/src/[모듈명]/dto/`
- Entity: `backend/src/[모듈명]/[모듈명].entity.ts`

### 공유 타입
- 모든 타입: `shared/types/`
- 특정 도메인: `shared/types/[도메인].types.ts`

## 📚 추가 문서

- [프로젝트 README](./README.md) - 전체 프로젝트 개요
- [Frontend README](./frontend/README.md) - Frontend 상세 가이드
- [Backend ARCHITECTURE](./backend/ARCHITECTURE.md) - Backend 아키텍처
- [Shared Types README](./shared/README.md) - 타입 공유 가이드
- [SETUP_GUIDE](../SETUP_GUIDE.md) - 설치 및 실행 가이드
