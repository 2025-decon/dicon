# AI 서버 연동 가이드

## 개요
Nest 서버와 FastAPI AI 서버를 연동하여 AI 추천 및 프롬프트 생성 기능을 제공합니다.

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
├── ai.module.ts          # AI 모듈 정의
├── ai.controller.ts      # 엔드포인트 컨트롤러
├── ai.service.ts         # AI 서버 통신 로직
└── dto/
    ├── recommend-request.dto.ts
    ├── recommend-response.dto.ts
    ├── prompt-request.dto.ts
    └── prompt-response.dto.ts
```
