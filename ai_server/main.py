"""
Promty AI Server - FastAPI 기반 Python AI 서버
Backend (NestJS)에서 요청을 받아 처리하고 응답
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import logging
import os
from datetime import datetime

# ================== 로깅 설정 ==================

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - [%(name)s] - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ================== FastAPI 앱 초기화 ==================

app = FastAPI(
    title="Promty AI Server",
    version="1.0.0",
    description="Frontend → Backend → AI Server 통신"
)

# ✅ CORS 설정 (Backend에서 요청 가능)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3333",
        "*"  # 개발 환경용 (프로덕션에서는 제거)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================== Request/Response 모델 ==================

class GeneratePromptRequest(BaseModel):
    prompt: str  # ✅ Frontend/Backend에서 "prompt" 필드로 보냄
    tone: Optional[str] = "neutral"

class GeneratePromptResponse(BaseModel):
    generatedPrompt: str
    model: str = "promty-ai-server-v1"

class ChatMessageRequest(BaseModel):
    message: str  # ✅ Frontend/Backend에서 "message" 필드로 보냄

class ChatMessageResponse(BaseModel):
    reply: str
    model: str = "promty-ai-server-v1"

class PromptItem(BaseModel):
    id: str
    title: str
    description: str
    category: str
    rating: float
    usageCount: int

# ================== 헬스 체크 ==================

@app.get("/health")
async def health_check():
    logger.info("[GET /health] 헬스 체크 요청")
    return {
        "status": "ok",
        "service": "Promty AI Server",
        "timestamp": datetime.now().isoformat()
    }

# ================== 프롬프트 생성 엔드포인트 ==================

@app.post("/generate", response_model=GeneratePromptResponse)
async def generate_prompt(req: GeneratePromptRequest):
    """
    프롬프트 생성 API
    Backend가 POST /ai/generate-prompt → AI Server POST /generate로 전달
    """
    # 🔴 진입점 로깅
    logger.info(f"[POST /generate] 📤 START - 요청 수신")
    logger.info(f"[POST /generate] 📥 Payload: {req.dict()}")
    logger.info(f"[POST /generate] 📥 prompt field: '{req.prompt}'")
    logger.info(f"[POST /generate] 📥 tone field: '{req.tone}'")

    try:
        
        user_prompt = req.prompt
        tone = req.tone or "neutral"

        logger.info(f"[POST /generate] 🔄 파라미터 추출 완료")
        logger.info(f"  - user_prompt: {user_prompt[:50]}..." if len(user_prompt) > 50 else f"  - user_prompt: {user_prompt}")
        logger.info(f"  - tone: {tone}")
        
    except Exception as e:  # 👈 이 부분 추가!
        print(f"에러 발생: {e}")
        return {"error": str(e)}
    try:
        user_prompt = req.prompt
        tone = req.tone or "neutral"

        logger.info(f"[POST /generate] 🔄 파라미터 추출 완료")
        logger.info(f"  - user_prompt: {user_prompt[:50]}..." if len(user_prompt) > 50 else f"  - user_prompt: {user_prompt}")
        logger.info(f"  - tone: {tone}")

        logger.debug(f"[POST /generate] 📡 AI 프롬프트 생성 중...")

        # ✅ AI 로직 (현재는 템플릿 기반 생성, 실제 LLM 연동 시 교체)
        generated = f"""당신은 전문가입니다. 다음 상황에 대해 구체적이고 실용적인 조언을 제공해주세요:

[사용자 입력]
{user_prompt}

[응답 가이드]
다음 구조로 답변해주세요:
1. 상황 분석 (3-5줄)
2. 구체적인 해결 방안 (3가지 이상)
3. 예상되는 장단점
4. 실행 단계별 가이드

[톤]
{tone}

[추가 지시사항]
- 답변은 명확하고 실용적이어야 합니다.
- 구체적인 예시를 포함해주세요.
- 장기적 관점과 단기적 관점을 모두 고려해주세요."""

        response = GeneratePromptResponse(generatedPrompt=generated)

        logger.info(f"[POST /generate] ✅ AI 프롬프트 생성 완료")
        logger.info(f"[POST /generate] 📦 Generated prompt size: {len(generated)} characters")

        return response

    except Exception as e:
        logger.error(f"[POST /generate] ❌ FAILED - 에러 발생")
        logger.error(f"[POST /generate] ❌ Error Type: {type(e).__name__}")
        logger.error(f"[POST /generate] ❌ Error Message: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

# ================== AI 채팅 엔드포인트 ==================

@app.post("/chat", response_model=ChatMessageResponse)
async def chat(req: ChatMessageRequest):
    """
    AI 채팅 API
    Backend가 POST /ai/chat → AI Server POST /chat로 전달
    """
    # 🔴 진입점 로깅
    logger.info(f"[POST /chat] 📤 START - 요청 수신")
    logger.info(f"[POST /chat] 📥 Payload: {req.dict()}")
    logger.info(f"[POST /chat] 📥 message field: '{req.message}'")

    try:
        user_message = req.message

        logger.info(f"[POST /chat] 🔄 파라미터 추출 완료")
        logger.info(f"  - user_message: {user_message[:50]}..." if len(user_message) > 50 else f"  - user_message: {user_message}")

        logger.debug(f"[POST /chat] 📡 AI 응답 생성 중...")

        # ✅ AI 대화 로직 (현재는 템플릿 기반, 실제 LLM 연동 시 교체)
        reply = f"""안녕하세요! Promty AI입니다.

당신이 말씀하신 '{user_message}'에 대해 더 알아보겠습니다.

좀 더 자세한 정보가 필요하신가요?
- 특정 상황에 대한 조언이 필요하신가요?
- 프롬프트를 생성하고 싶으신가요?
- 아이디어를 공유하고 싶으신가요?

어떻게 도와드릴까요?"""

        response = ChatMessageResponse(reply=reply)

        logger.info(f"[POST /chat] ✅ AI 응답 생성 완료")
        logger.info(f"[POST /chat] 📦 Generated reply size: {len(reply)} characters")

        return response

    except Exception as e:
        logger.error(f"[POST /chat] ❌ FAILED - 에러 발생")
        logger.error(f"[POST /chat] ❌ Error Type: {type(e).__name__}")
        logger.error(f"[POST /chat] ❌ Error Message: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

# ================== 맞춤 추천 엔드포인트 ==================

@app.post("/recommendations", response_model=List[PromptItem])
async def get_recommendations(context: Optional[str] = None):
    """
    맞춤 추천 API
    Backend가 POST /ai/recommendations → AI Server POST /recommendations로 전달
    """
    # 🔴 진입점 로깅
    logger.info(f"[POST /recommendations] 📤 START - 요청 수신")
    logger.info(f"[POST /recommendations] 📥 context field: {context or '(없음)'}")

    try:
        logger.info(f"[POST /recommendations] 🔄 파라미터 추출 완료")
        logger.debug(f"[POST /recommendations] 📡 추천 데이터 생성 중...")

        # ✅ 추천 로직 (현재는 고정 데이터, 실제 AI 기반 추천 시 교체)
        recommendations = [
            {
                "id": "1",
                "title": "ChatGPT-4",
                "description": "GPT-4 기반 고급 AI 모델 - 복잡한 추론과 분석에 최적화",
                "category": "텍스트 생성",
                "rating": 4.8,
                "usageCount": 1250,
            },
            {
                "id": "2",
                "title": "Claude 3 Opus",
                "description": "Anthropic의 고성능 AI 모델 - 창의적 문서 작성에 우수",
                "category": "코드 작성",
                "rating": 4.7,
                "usageCount": 980,
            },
            {
                "id": "3",
                "title": "Gemini Pro",
                "description": "Google의 멀티모달 AI 모델 - 대화와 이미지 분석 가능",
                "category": "이미지 분석",
                "rating": 4.6,
                "usageCount": 750,
            },
            {
                "id": "4",
                "title": "LLaMA 2",
                "description": "Meta의 오픈소스 AI 모델 - 로컬 배포 가능",
                "category": "오픈소스",
                "rating": 4.5,
                "usageCount": 620,
            },
            {
                "id": "5",
                "title": "Palm 2",
                "description": "Google의 고급 AI 모델 - 다국어 지원 우수",
                "category": "다국어",
                "rating": 4.4,
                "usageCount": 540,
            },
        ]

        logger.info(f"[POST /recommendations] ✅ 추천 데이터 생성 완료")
        logger.info(f"[POST /recommendations] 📦 Recommendations count: {len(recommendations)}")
        logger.info(f"[POST /recommendations] 📦 Titles: {[r['title'] for r in recommendations]}")

        return recommendations

    except Exception as e:
        logger.error(f"[POST /recommendations] ❌ FAILED - 에러 발생")
        logger.error(f"[POST /recommendations] ❌ Error Type: {type(e).__name__}")
        logger.error(f"[POST /recommendations] ❌ Error Message: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

# ================== 서버 시작 ==================

if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")

    logger.info(f"🚀 Promty AI Server 시작")
    logger.info(f"   Address: http://{host}:{port}")
    logger.info(f"   API Docs: http://localhost:{port}/docs")
    logger.info(f"   Health Check: http://localhost:{port}/health")

    uvicorn.run(
        app,
        host=host,
        port=port,
        log_level="debug"
    )
