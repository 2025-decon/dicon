# AI 서버 연동 가이드

## 개요
NestJS 웹 서버와 FastAPI AI 서버를 HTTP 통신으로 연동하여 AI 추천 및 프롬프트 생성 기능을 제공합니다.

### 시스템 아키텍처
```
┌──────────────┐      HTTP POST      ┌──────────────┐
│   NestJS     │ ──────────────────> │   FastAPI    │
│  Web Server  │                     │  AI Server   │
│ (Port 3001)  │ <────────────────── │ (Port 8000)  │
└──────────────┘      JSON Response  └──────────────┘
```

### 통신 방식
- **프로토콜**: HTTP/HTTPS
- **메서드**: POST
- **데이터 포맷**: JSON
- **타임아웃**: 10초

## 엔드포인트

### 1. AI 추천 (`POST /ai/recommend`)
사용자 입력을 받아 적합한 AI를 추천하고 관련 링크를 반환합니다.

**요청 예시:**
```json
{
  "userInput": "코드 작성을 도와줘"
}
```

**응답 예시:**
```json
{
  "recommendation": "코드 작성에는 GPT를 추천합니다...",
  "links": {
    "gpt": "https://chatgpt.com/"
  }
}
```

### 2. 프롬프트 생성 (`POST /ai/prompt`)
사용자가 입력한 상황에 맞는 AI 프롬프트를 생성합니다.

**요청 예시:**
```json
{
  "userInput": "커피 만드는 방법"
}
```

**응답 예시:**
```json
{
  "prompt": "커피를 만드는 단계별 방법을 자세히 설명해주세요..."
}
```

## 설정

### 환경 변수
`.env` 파일에 다음 설정을 추가하세요:

```env
AI_SERVER_URL=http://localhost:8000
```

### AI 서버 실행
AI 서버를 먼저 실행해야 합니다:

```bash
cd ai_server
python main.py
```

AI 서버는 기본적으로 `http://localhost:8000`에서 실행됩니다.

### Nest 서버 실행
```bash
cd dicon/backend
npm run start:dev
```

## 에러 처리

- **400 Bad Request**: 금지어가 포함된 경우
- **500 Internal Server Error**: AI 서버 통신 오류 또는 처리 중 오류

## 구조

```
backend/src/ai/
├── ai.module.ts              # AI 모듈 정의
├── ai.controller.ts          # HTTP 엔드포인트 컨트롤러
├── ai.service.ts             # 비즈니스 로직 및 AI 서버 통신
├── config/
│   └── ai.config.ts          # AI 서버 URL 및 엔드포인트 설정
├── utils/
│   ├── ai-http.client.ts     # HTTP 통신 추상화 레이어
│   └── ai-error.handler.ts   # 에러 처리 유틸리티
└── dto/
    ├── index.ts              # DTO export 모음
    ├── recommend-request.dto.ts
    ├── recommend-response.dto.ts
    ├── prompt-request.dto.ts
    └── prompt-response.dto.ts
```

## 통신 흐름

### 1. AI 추천 요청 흐름
```
Client
  │
  │ POST /ai/recommend
  │ { "userInput": "코드 작성 도와줘" }
  ▼
NestJS Controller (ai.controller.ts)
  │
  │ DTO 검증 (RecommendRequestDto)
  ▼
NestJS Service (ai.service.ts)
  │
  │ 데이터 변환 (camelCase → snake_case)
  │ { userInput } → { user_input }
  ▼
HTTP Client (ai-http.client.ts)
  │
  │ POST http://localhost:8000/ai/recommend
  │ Headers: { "Content-Type": "application/json" }
  │ Timeout: 10초
  ▼
FastAPI AI Server
  │
  │ AI 처리 (OpenAI API 호출)
  ▼
Response
  │
  │ { "recommendation": "...", "links": {...} }
  ▼
NestJS Service
  │
  │ 응답 변환 및 검증
  ▼
Client
```

### 2. 데이터 변환
NestJS(camelCase)와 FastAPI(snake_case) 간 네이밍 규칙이 다르므로 변환이 필요합니다.

**요청 변환 예시:**
```typescript
// Frontend → NestJS
{ "userInput": "코드 작성" }

// NestJS → FastAPI
{ "user_input": "코드 작성" }
```

**응답 변환 예시:**
```python
# FastAPI → NestJS
{ "recommendation": "GPT 추천", "links": {...} }

# NestJS → Frontend
{ "recommendation": "GPT 추천", "links": {...} }
```

## 연결 테스트

### AI 서버 연결 확인
```bash
# AI 서버가 실행 중인지 확인
curl http://localhost:8000/

# AI 추천 엔드포인트 테스트
curl -X POST http://localhost:8000/ai/recommend \
  -H "Content-Type: application/json" \
  -d '{"user_input": "테스트"}'
```

### NestJS 서버 테스트
```bash
# NestJS를 통한 AI 호출 테스트
curl -X POST http://localhost:3001/ai/recommend \
  -H "Content-Type: application/json" \
  -d '{"userInput": "코드 작성 도와줘"}'
```

## 트러블슈팅

### 1. AI 서버 연결 실패
```
Error: connect ECONNREFUSED 127.0.0.1:8000
```

**해결방법:**
- AI 서버가 실행 중인지 확인
- 포트 번호 확인 (기본값: 8000)
- 방화벽 설정 확인
```bash
# AI 서버 실행
cd ../ai_server
python main.py
```

### 2. 타임아웃 오류
```
Error: timeout of 10000ms exceeded
```

**해결방법:**
- AI 서버 응답 속도 확인
- 타임아웃 시간 증가 (`ai-http.client.ts`에서 설정)
- OpenAI API 키 확인

### 3. 데이터 형식 오류
```
400 Bad Request: Validation failed
```

**해결방법:**
- 요청 데이터 형식 확인
- DTO 스키마와 일치하는지 검증
- AI 서버 로그 확인

### 4. CORS 오류 (프론트엔드 연동 시)
```
Access to XMLHttpRequest blocked by CORS policy
```

**해결방법:**
```typescript
// main.ts에 CORS 설정 추가
app.enableCors({
  origin: 'http://localhost:3000',
  credentials: true,
});
```

## 보안 고려사항

### 1. API 키 관리
```env
# .env 파일 (Git에 커밋하지 말것!)
AI_SERVER_URL=http://localhost:8000
OPENAI_API_KEY=sk-...
```

### 2. Rate Limiting
과도한 AI 서버 호출 방지:
```typescript
// AI 호출 제한 (분당 10회)
@UseGuards(ThrottlerGuard)
@Throttle(10, 60)
@Post('/recommend')
```

### 3. 입력 검증
악의적인 입력 차단:
```typescript
@IsString()
@Length(1, 1000)  // 최대 1000자
@Matches(/^[^<>]*$/)  // HTML 태그 차단
userInput: string;
```

## 성능 최적화

### 1. 연결 풀링
```typescript
// HTTP 연결 재사용
const httpClient = axios.create({
  baseURL: process.env.AI_SERVER_URL,
  timeout: 10000,
  maxRedirects: 0,
  httpAgent: new http.Agent({ keepAlive: true }),
});
```

### 2. 캐싱
동일한 요청에 대해 캐싱 적용:
```typescript
@UseInterceptors(CacheInterceptor)
@CacheTTL(300)  // 5분 캐시
@Post('/recommend')
```

### 3. 로깅
디버깅 및 모니터링:
```typescript
console.log(`[AI Request] ${JSON.stringify(dto)}`);
console.log(`[AI Response] ${JSON.stringify(response)}`);
console.log(`[AI Time] ${Date.now() - startTime}ms`);
```

## 모니터링

### 헬스체크 엔드포인트
```typescript
@Get('/health')
async checkHealth() {
  try {
    await this.httpClient.get(this.config.serverUrl);
    return { status: 'ok', aiServer: 'connected' };
  } catch {
    return { status: 'error', aiServer: 'disconnected' };
  }
}
```

## 추가 참고자료

- [전체 아키텍처 가이드](./ARCHITECTURE.md)
- [NestJS 공식 문서](https://docs.nestjs.com)
- [FastAPI 공식 문서](https://fastapi.tiangolo.com)
- [TypeScript 공식 문서](https://www.typescriptlang.org)
