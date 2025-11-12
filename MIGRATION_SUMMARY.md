# 프로젝트 구조 변경 요약

## 🔄 변경 사항

### Before (이전 구조)
```
dicon/
├── app/                    # Frontend 파일들이 루트에 위치
├── public/
├── backend/                # Backend만 서브폴더
├── package.json            # Frontend 의존성이 루트에
├── tsconfig.json
├── next.config.ts
└── ...기타 Next.js 파일들
```

### After (새로운 구조)
```
dicon/
├── frontend/               # ⭐ Frontend 전용 폴더
│   ├── app/
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.ts
├── backend/                # ⭐ Backend 전용 폴더
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── shared/                 # ⭐ 공유 타입
│   └── types/
└── README.md
```

## ✅ 수행된 작업

### 1. Frontend 폴더 분리
- [x] `frontend/` 디렉토리 생성
- [x] `app/` → `frontend/app/` 이동
- [x] `public/` → `frontend/public/` 이동
- [x] `package.json` → `frontend/package.json` 이동
- [x] `tsconfig.json` → `frontend/tsconfig.json` 이동
- [x] `next.config.ts` → `frontend/next.config.ts` 이동
- [x] 기타 Next.js 설정 파일 이동

### 2. 공유 타입 생성
- [x] `shared/types/` 디렉토리 생성
- [x] `api.types.ts` - API 공통 타입
- [x] `auth.types.ts` - 인증 관련 타입
- [x] `ai.types.ts` - AI 관련 타입
- [x] `mypage.types.ts` - 마이페이지 타입
- [x] `index.ts` - 모든 타입 export
- [x] `shared/README.md` - 타입 공유 가이드

### 3. 설정 파일 업데이트
- [x] `frontend/tsconfig.json` - `@shared/*` 경로 추가
- [x] `frontend/app/lib/api.ts` - import 경로 수정
- [x] `.gitignore` - frontend/backend 구조 반영

### 4. 문서 업데이트
- [x] `README.md` - 프로젝트 구조 업데이트
- [x] `SETUP_GUIDE.md` - 설치 가이드 업데이트
- [x] `frontend/README.md` - Frontend 전용 문서 생성
- [x] `PROJECT_STRUCTURE.md` - 구조 상세 설명
- [x] `MIGRATION_SUMMARY.md` - 이 문서

### 5. 정리 작업
- [x] 루트의 `.next/` 제거
- [x] 루트의 `node_modules/` 제거
- [x] 불필요한 파일 제거

## 🚀 실행 방법 변경

### Before
```bash
# Frontend
npm run dev

# Backend
cd backend && npm run start:dev
```

### After
```bash
# Frontend
cd frontend && npm run dev

# Backend
cd backend && npm run start:dev
```

## 📝 코드 변경 사항

### Import 경로 변경

**Before:**
```typescript
// frontend/app/lib/api.ts
import type { SignInRequest } from '@/shared/types';
```

**After:**
```typescript
// frontend/app/lib/api.ts
import type { SignInRequest } from '@shared/types';
```

### TypeScript 설정

**frontend/tsconfig.json:**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@shared/*": ["../shared/*"]  // ⭐ 추가됨
    }
  }
}
```

## ⚠️ 주의사항

### 1. 의존성 재설치 필요

Frontend와 Backend 각각 의존성을 재설치해야 합니다:

```bash
# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install

# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

### 2. 환경변수 위치

- Frontend: `frontend/.env.local`
- Backend: `backend/.env`

### 3. 빌드 출력 위치

- Frontend: `frontend/.next/`
- Backend: `backend/dist/`

### 4. Git 작업

변경사항을 커밋할 때:

```bash
git add .
git commit -m "Refactor: Separate frontend and backend into distinct folders"
git push
```

## 🎯 이점

### 1. 명확한 책임 분리
- Frontend와 Backend가 물리적으로 분리됨
- 각 서버의 역할이 명확해짐

### 2. 독립적인 의존성 관리
- Frontend와 Backend의 `node_modules` 완전 분리
- 각자 필요한 패키지만 설치

### 3. 타입 안정성
- 공유 타입으로 Frontend-Backend 간 계약 명확화
- NestJS 모듈 의존성 제거

### 4. 확장성
- 각 서버를 독립적으로 배포 가능
- Monorepo 구조로 쉽게 전환 가능

### 5. 개발 경험 향상
- 각 폴더에서 독립적으로 작업 가능
- IDE에서 프로젝트 범위가 명확해짐

## 📚 다음 단계

### 권장 작업

1. **CI/CD 설정 업데이트**
   - Frontend와 Backend 별도 빌드 파이프라인
   - 각각 다른 환경에 배포 가능

2. **Monorepo 도구 고려** (선택사항)
   - Turborepo 또는 Nx 도입
   - 공통 스크립트 관리

3. **Docker 설정**
   - Frontend와 Backend 각각 Dockerfile 생성
   - docker-compose로 통합 관리

4. **테스트 환경 분리**
   - Frontend: Jest + React Testing Library
   - Backend: Jest + Supertest

## 🔍 검증 체크리스트

- [ ] Frontend가 정상적으로 실행되는가?
- [ ] Backend가 정상적으로 실행되는가?
- [ ] API 통신이 정상적으로 작동하는가?
- [ ] 공유 타입이 올바르게 import되는가?
- [ ] TypeScript 컴파일 에러가 없는가?
- [ ] 빌드가 정상적으로 완료되는가?

## 📞 문제 해결

### Frontend 실행 오류

```bash
cd frontend
rm -rf node_modules .next
npm install
npm run dev
```

### Backend 실행 오류

```bash
cd backend
rm -rf node_modules dist
npm install
npm run start:dev
```

### 타입 import 오류

`frontend/tsconfig.json`에서 `@shared/*` 경로가 올바른지 확인:

```json
"paths": {
  "@/*": ["./*"],
  "@shared/*": ["../shared/*"]
}
```

## 📅 변경 이력

- **2025-11-13**: 초기 구조 변경 완료
  - Frontend/Backend 폴더 분리
  - 공유 타입 생성
  - 문서 업데이트

---

**작성일**: 2025-11-13  
**버전**: 1.0.0
