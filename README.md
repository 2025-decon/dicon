# DICON - AI 추천 및 프롬프트 생성 플랫폼

AI 기반 추천 시스템과 프롬프트 생성 기능을 제공하는 풀스택 웹 애플리케이션입니다.

## 프로젝트 구조

```
dicon/
├── app/                    # Frontend (Next.js)
│   ├── page.tsx           # 메인 페이지
│   ├── login/             # 로그인 페이지
│   ├── signup/            # 회원가입 페이지
│   ├── create/            # 프롬프트 생성 페이지
│   ├── hub/               # AI 허브 페이지
│   ├── introduce/         # 소개 페이지
│   └── context/           # 상황 설명 페이지
│
├── backend/               # Backend (NestJS)
│   ├── src/
│   │   ├── ai/           # AI 서버 연동 모듈
│   │   ├── auth/         # 인증 모듈
│   │   ├── user/         # 사용자 관리 모듈
│   │   ├── mypage/       # 마이페이지 모듈
│   │   └── app.module.ts # 루트 모듈
│   ├── ARCHITECTURE.md   # 백엔드 아키텍처 가이드
│   └── README_AI.md      # AI 서버 연동 가이드
│
└── ai_server/            # AI Server (FastAPI) - 별도 저장소
    ├── ai/
    │   ├── ai_recommend.py
    │   └── prompt_aitest.py
    └── main.py
```

## 기술 스택

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API

### Backend
- **Framework**: NestJS 10.x
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: TypeORM
- **Authentication**: JWT

### AI Server
- **Framework**: FastAPI
- **Language**: Python 3.x
- **AI/ML**: OpenAI API, LangChain

## 시스템 아키텍처

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│   Frontend      │────────▶│   NestJS Web    │────────▶│   FastAPI AI    │
│   (Next.js)     │◀────────│   Server        │◀────────│   Server        │
│   Port 3000     │         │   Port 3001     │         │   Port 8000     │
│                 │         │                 │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
                                     │
                                     │
                                     ▼
                            ┌─────────────────┐
                            │                 │
                            │   MySQL DB      │
                            │   Port 3306     │
                            │                 │
                            └─────────────────┘
```

## 주요 기능

### 1. AI 추천 시스템
사용자 입력을 분석하여 적합한 AI 도구를 추천합니다.
- GPT, Claude, Gemini 등 다양한 AI 추천
- 맞춤형 추천 링크 제공

### 2. 프롬프트 생성
사용자가 입력한 상황에 맞는 최적의 AI 프롬프트를 자동 생성합니다.
- 컨텍스트 기반 프롬프트 생성
- 금지어 필터링

### 3. 사용자 관리
- 회원가입 및 로그인
- JWT 기반 인증
- 마이페이지

## 시작하기

### 필수 요구사항
- Node.js 18+
- Python 3.9+
- MySQL 8.0+
- npm 또는 yarn

### 1. 환경 설정

#### Backend 환경변수
```bash
cd backend
cp .env.example .env
```

`.env` 파일 설정:
```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=dicon
DB_SYNC=true

# AI Server
AI_SERVER_URL=http://localhost:8000

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h

# Server
PORT=3001
```

#### AI Server 환경변수
```bash
cd ../ai_server
cp .env.example .env
```

`.env` 파일 설정:
```env
OPENAI_API_KEY=sk-...
```

### 2. 의존성 설치

#### Frontend
```bash
npm install
```

#### Backend
```bash
cd backend
npm install
```

#### AI Server
```bash
cd ../ai_server
pip install -r requirements.txt
```

### 3. 데이터베이스 설정

MySQL 데이터베이스 생성:
```sql
CREATE DATABASE dicon CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

TypeORM이 자동으로 테이블을 생성합니다 (`DB_SYNC=true`).

### 4. 서버 실행

#### AI Server 실행 (먼저!)
```bash
cd ai_server
python main.py
# AI 서버가 http://localhost:8000 에서 실행됩니다
```

#### Backend 실행
```bash
cd backend
npm run start:dev
# 백엔드가 http://localhost:3001 에서 실행됩니다
```

#### Frontend 실행
```bash
npm run dev
# 프론트엔드가 http://localhost:3000 에서 실행됩니다
```

### 5. 접속

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 개발 가이드

### Backend 개발
상세한 백엔드 아키텍처와 개발 가이드는 다음 문서를 참고하세요:
- [Backend 아키텍처 가이드](./backend/ARCHITECTURE.md)
- [AI 서버 연동 가이드](./backend/README_AI.md)

### 주요 백엔드 기법
1. **모듈 기반 아키텍처**: 기능별 모듈 분리 (Auth, User, AI, Mypage)
2. **의존성 주입 (DI)**: NestJS IoC 컨테이너 활용
3. **레이어드 아키텍처**: Controller → Service → Repository
4. **DTO 패턴**: 데이터 유효성 검증 및 변환
5. **에러 핸들링**: 중앙화된 에러 처리
6. **TypeORM**: 데이터베이스 추상화
7. **JWT 인증**: 토큰 기반 인증 시스템

### AI 서버 연동
- **HTTP 통신**: NestJS → FastAPI (POST 방식)
- **데이터 변환**: camelCase ↔ snake_case
- **에러 처리**: 타임아웃, 연결 실패 등
- **타입 안정성**: TypeScript 타입 시스템

## API 엔드포인트

### Auth
- `POST /auth/signup` - 회원가입
- `POST /auth/login` - 로그인

### AI
- `POST /ai/recommend` - AI 추천
  ```json
  {
    "userInput": "코드 작성을 도와줘"
  }
  ```
- `POST /ai/prompt` - 프롬프트 생성
  ```json
  {
    "userInput": "커피 만드는 방법"
  }
  ```

### User
- `GET /user/profile` - 프로필 조회 (인증 필요)

### Mypage
- `GET /mypage` - 마이페이지 정보 (인증 필요)

## 테스트

### Backend 테스트
```bash
cd backend

# Unit 테스트
npm run test

# e2e 테스트
npm run test:e2e

# 테스트 커버리지
npm run test:cov
```

### Frontend 테스트
```bash
npm run test
```

## 배포

### 프로덕션 빌드

#### Frontend
```bash
npm run build
npm run start
```

#### Backend
```bash
cd backend
npm run build
npm run start:prod
```

### 환경 체크리스트
- [ ] `DB_SYNC=false` 설정 (마이그레이션 사용)
- [ ] 환경변수 암호화
- [ ] CORS 설정
- [ ] Rate Limiting 적용
- [ ] 로깅 시스템
- [ ] 헬스체크 엔드포인트
- [ ] AI 서버 헬스체크
- [ ] 에러 모니터링 (Sentry 등)

## 트러블슈팅

### AI 서버 연결 실패
```
Error: connect ECONNREFUSED 127.0.0.1:8000
```
**해결**: AI 서버를 먼저 실행하세요 (`cd ai_server && python main.py`)

### 데이터베이스 연결 실패
```
Error: ER_ACCESS_DENIED_ERROR
```
**해결**: `.env` 파일의 DB 설정을 확인하세요

### CORS 오류
```
Access blocked by CORS policy
```
**해결**: `backend/src/main.ts`에서 CORS 설정 확인

자세한 트러블슈팅은 [AI 서버 연동 가이드](./backend/README_AI.md#트러블슈팅)를 참고하세요.

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 라이선스

This project is licensed under the MIT License.

## 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.

## 참고 자료

- [NestJS 공식 문서](https://docs.nestjs.com)
- [Next.js 공식 문서](https://nextjs.org/docs)
- [FastAPI 공식 문서](https://fastapi.tiangolo.com)
- [TypeORM 공식 문서](https://typeorm.io)
