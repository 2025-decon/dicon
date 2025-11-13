'use client';

import React, { CSSProperties, useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SettingsIcon from '@mui/icons-material/Settings';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

// --- 데이터 구조 ---
interface PromptItem {
  id: number;
  title: string;
  content: string;
  recommendedAi: string;
  aiDescription: string;
  reason: string;
  performance: {
    speed: number;
    accuracy: number;
    cost: number;
  };
}

interface ChatHistory {
  id: number;
  title: string;
  date: string;
}

// --- 샘플 데이터 ---
const samplePrompts: PromptItem[] = [
  {
    id: 1,
    title: '회사 상사와의 갈등 해결 조언 요청',
    content: '당신은 전문 상담가입니다. 다음 상황에 대해 구체적이고 실용적인 조언을 제공해주세요: 회사 상사와의 갈등 상황. 조언을 제공할 때는 다음 사항을 포함해주세요: 1. 상황 분석 2. 구체적인 해결 방안 (3가지 이상) 3. 예상되는 장단점 4. 실행 단계별 가이드',
    recommendedAi: 'GPT-4.5 Turbo',
    aiDescription: '복잡한 상황 분석 및 논리적 추론에 최적화된 AI',
    reason: '이 프롬프트는 깊은 상황 분석과 논리적인 해결책 제시를 요구합니다. GPT-4.5 Turbo는 방대한 지식과 뛰어난 추론 능력을 바탕으로 가장 정확하고 실용적인 조언을 제공할 수 있습니다.',
    performance: { speed: 3, accuracy: 5, cost: 4 },
  },
  {
    id: 2,
    title: '프로젝트 기획서 초안 작성',
    content: '스타트업의 신규 서비스 \'Promty\'의 프로젝트 기획서 초안을 작성해줘. 핵심 기능, 목표 시장, 예상 수익 모델을 포함해야 해. 스타일은 간결하고 전문적으로 부탁해.',
    recommendedAi: 'Claude 3 Opus',
    aiDescription: '창의적이고 구조화된 문서 생성에 강점을 가진 AI',
    reason: '기획서 작성은 창의적인 아이디어와 명확한 문서 구조가 중요합니다. Claude 3 Opus는 긴 텍스트를 자연스럽게 처리하고, 창의적인 콘텐츠를 구조화된 형식으로 빠르게 생성하는 데 탁월합니다.',
    performance: { speed: 4, accuracy: 4, cost: 3 },
  },
  {
    id: 3,
    title: '면접 준비 질문 정리 및 모의 면접',
    content: '프론트엔드 개발자 면접을 위한 예상 질문 20개를 정리하고, 각 질문에 대한 모범 답변의 핵심 키워드를 제시해줘. 이후 모의 면접관 역할을 수행해줘.',
    recommendedAi: 'Gemini 2.5 Pro',
    aiDescription: '대화 흐름 유지 및 역할극 수행에 뛰어난 AI',
    reason: '모의 면접과 같은 대화형 역할극은 대화의 맥락을 정확히 이해하고 자연스러운 흐름을 유지하는 능력이 중요합니다. Gemini 2.5 Pro는 실시간 상호작용과 역할극 수행에서 높은 만족도를 보입니다.',
    performance: { speed: 5, accuracy: 4, cost: 2 },
  },
];

const RecommendPage: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<PromptItem | null>(samplePrompts[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // 샘플 채팅 기록 (CreatePage와 동일한 디자인 유지를 위해 사용)
  const chatHistories: ChatHistory[] = [
    { id: 1, title: '회사 상사와의 갈등 해결', date: '오늘' },
    { id: 2, title: '프로젝트 기획서 작성', date: '어제' },
    { id: 3, title: '면접 준비 질문 정리', date: '2일 전' },
    { id: 4, title: '이메일 작성 도움', date: '3일 전' },
    { id: 5, title: '보고서 요약 요청', date: '1주일 전' },
  ];

  const filteredChats = chatHistories.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- 스타일 정의 (CreatePage의 스타일을 재활용 및 수정) ---

  const sidebar: CSSProperties = {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '280px',
    height: '100vh',
    background: '#0B1B31',
    borderRight: '1px solid #1F2C49',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    boxSizing: 'border-box',
    zIndex: 100,
    paddingTop: '100px', // Header 높이만큼 여백 추가
  };

  const newChatButton: CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    background: '#31C79B',
    borderRadius: '10px',
    border: 'none',
    color: '#FFFFFF',
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 700,
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '20px',
  };

  const searchContainer: CSSProperties = {
    position: 'relative',
    marginBottom: '20px',
  };

  const searchInput: CSSProperties = {
    width: '100%',
    padding: '10px 40px 10px 12px',
    background: '#041832',
    border: '1px solid #1F2C49',
    borderRadius: '8px',
    color: '#FFFFFF',
    fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const searchIconStyle: CSSProperties = {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
  };

  const historyTitle: CSSProperties = {
    color: 'rgba(193, 197, 204, 0.6)',
    fontSize: '12px',
    fontWeight: 600,
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const chatList: CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const chatItem = (isSelected: boolean): CSSProperties => ({
    padding: '12px',
    background: isSelected ? 'rgba(49, 199, 155, 0.2)' : 'rgba(25, 44, 71, 0.5)',
    border: isSelected ? '1px solid #31C79B' : '1px solid transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
  });

  const chatItemContent: CSSProperties = {
    flex: 1,
    minWidth: 0,
  };

  const chatTitle: CSSProperties = {
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '4px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const chatDate: CSSProperties = {
    color: 'rgba(193, 197, 204, 0.5)',
    fontSize: '12px',
  };

  // 메인 컨테이너
  const container: CSSProperties = {
    marginLeft: '280px',
    minHeight: '100vh',
    background: '#051225',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '80px', // Header 높이만큼 여백 추가
  };

  // 헤더 (이전 작업에서 만든 Header 컴포넌트 스타일 재활용)
  const headerStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: '#051225',
    borderBottom: '1px solid rgba(49, 199, 155, 0.1)',
    zIndex: 1000,
    padding: '0 20px',
  };

  const headerContentStyle: CSSProperties = {
    maxWidth: '1440px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '80px',
  };

  const logoSectionStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
  };

  const logoCircleStyle: CSSProperties = {
    width: '40px',
    height: '40px',
    background: '#D9D9D9',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const logoTextStyle: CSSProperties = {
    fontSize: '36px',
    fontWeight: 700,
    color: 'rgba(193, 197, 204, 0.8)',
    fontFamily: "'Noto Sans KR', sans-serif",
  };

  const headerNavStyle: CSSProperties = {
    display: 'flex',
    gap: '50px',
    alignItems: 'center',
  };

  const navItemStyle: CSSProperties = {
    fontSize: '18px',
    fontWeight: 500,
    color: '#ffffff',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    fontFamily: "'Noto Sans KR', sans-serif",
  };

  const headerRightStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  };

  const loginBtnStyle: CSSProperties = {
    border: '1px solid #28405E',
    borderRadius: '10px',
    padding: '8px 20px',
    background: 'transparent',
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: "'Noto Sans KR', sans-serif",
  };

  const userAvatarStyle: CSSProperties = {
    width: '50px',
    height: '50px',
    background: '#D9D9D9',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  };

  // 메인 콘텐츠 영역
  const mainContent: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  };

  const pageTitle: CSSProperties = {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 700,
    fontSize: '48px',
    color: '#FFFFFF',
    marginBottom: '40px',
    textAlign: 'center',
  };

  // 프롬프트 상세 및 추천 영역
  const recommendationArea: CSSProperties = {
    display: 'flex',
    gap: '30px',
    marginBottom: '40px',
  };

  const promptDetailBox: CSSProperties = {
    flex: 1,
    background: '#0B1B31',
    border: '1px solid #1F2C49',
    borderRadius: '15px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const promptTitleStyle: CSSProperties = {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 700,
    fontSize: '24px',
    color: '#31C79B',
    borderBottom: '1px solid #1F2C49',
    paddingBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const promptContentStyle: CSSProperties = {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#C1C5CC',
    whiteSpace: 'pre-wrap',
    flex: 1,
  };

  const aiRecommendationBox: CSSProperties = {
    flex: 1,
    background: '#0B1B31',
    border: '1px solid #1F2C49',
    borderRadius: '15px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const aiTitleStyle: CSSProperties = {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 700,
    fontSize: '24px',
    color: '#FFFFFF',
    borderBottom: '1px solid #1F2C49',
    paddingBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const recommendedAiName: CSSProperties = {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 700,
    fontSize: '32px',
    color: '#31C79B',
    marginTop: '10px',
  };

  const aiDescriptionStyle: CSSProperties = {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 500,
    fontSize: '16px',
    color: 'rgba(193, 197, 204, 0.8)',
  };

  const reasonTitle: CSSProperties = {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 700,
    fontSize: '18px',
    color: '#FFFFFF',
    marginTop: '15px',
    marginBottom: '5px',
  };

  const reasonContent: CSSProperties = {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '1.5',
    color: 'rgba(193, 197, 204, 0.7)',
  };

  // AI 성능 비교 영역
  const performanceTitle: CSSProperties = {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 700,
    fontSize: '28px',
    color: '#FFFFFF',
    marginBottom: '20px',
    borderBottom: '1px solid #1F2C49',
    paddingBottom: '10px',
  };

  const performanceGrid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    textAlign: 'center',
  };

  const performanceItem: CSSProperties = {
    background: '#0B1B31',
    border: '1px solid #132843',
    borderRadius: '10px',
    padding: '20px',
  };

  const performanceLabel: CSSProperties = {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 500,
    fontSize: '16px',
    color: 'rgba(193, 197, 204, 0.8)',
    marginBottom: '10px',
  };

  const performanceValue: CSSProperties = {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 700,
    fontSize: '36px',
    color: '#31C79B',
  };

  const renderStarRating = (value: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= value ? '#31C79B' : '#1F2C49', fontSize: '24px' }}>
          ★
        </span>
      );
    }
    return <div style={{ display: 'flex', justifyContent: 'center', gap: '2px' }}>{stars}</div>;
  };

  return (
    <div style={{ background: '#051225', minHeight: '100vh' }}>
      {/* Header Component */}
      <header style={headerStyle}>
        <div style={headerContentStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <div style={logoSectionStyle}>
              <div style={logoCircleStyle}>
                <span style={{ fontSize: '20px', fontWeight: 700, color: '#051225' }}>P</span>
              </div>
              <span style={logoTextStyle}>Promty</span>
            </div>
          </div>

          <nav style={headerNavStyle}>
            <a href="#" style={navItemStyle}>프롬프트 생성</a>
            <a href="#" style={navItemStyle}>도움말</a>
            <a href="#" style={navItemStyle}>비고</a>
            <a href="#" style={navItemStyle}>기타등등</a>
          </nav>

          <div style={headerRightStyle}>
            <button style={loginBtnStyle}>로그인</button>
            <div style={userAvatarStyle}>
              <span style={{ fontSize: '20px', fontWeight: 700, color: '#051225' }}>U</span>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Component */}
      <aside style={sidebar}>
        <button style={newChatButton}>
          <ChatIcon sx={{ fontSize: '20px' }} />
          새 채팅
        </button>

        <div style={searchContainer}>
          <input
            type="text"
            placeholder="프롬프트 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={searchInput}
          />
          <div style={searchIconStyle}>
            <SearchIcon sx={{ color: 'rgba(193, 197, 204, 0.5)', fontSize: '20px' }} />
          </div>
        </div>

        <div style={historyTitle}>프롬프트 목록</div>
        <div style={chatList}>
          {samplePrompts.map((prompt) => (
            <div
              key={prompt.id}
              style={chatItem(selectedPrompt?.id === prompt.id)}
              onClick={() => setSelectedPrompt(prompt)}
            >
              <div style={chatItemContent}>
                <div style={chatTitle}>{prompt.title}</div>
                <div style={chatDate}>생성일: 2024.11.13</div>
              </div>
              <LightbulbIcon sx={{ color: selectedPrompt?.id === prompt.id ? '#31C79B' : 'rgba(193, 197, 204, 0.5)', fontSize: '20px' }} />
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div style={container}>
        <div style={mainContent}>
          <h1 style={pageTitle}>AI 맞춤 추천</h1>

          {selectedPrompt ? (
            <>
              <div style={recommendationArea}>
                {/* 프롬프트 상세 */}
                <div style={promptDetailBox}>
                  <div style={promptTitleStyle}>
                    <EditIcon sx={{ fontSize: '24px' }} />
                    선택된 프롬프트
                  </div>
                  <div style={promptContentStyle}>
                    {selectedPrompt.content}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button style={{ ...loginBtnStyle, borderColor: '#31C79B', color: '#31C79B', padding: '10px 20px' }}>
                      <ContentCopyIcon sx={{ fontSize: '18px', marginRight: '5px' }} />
                      복사
                    </button>
                  </div>
                </div>

                {/* AI 추천 */}
                <div style={aiRecommendationBox}>
                  <div style={aiTitleStyle}>
                    <ElectricBoltIcon sx={{ fontSize: '24px', color: '#31C79B' }} />
                    최적의 AI 추천
                  </div>
                  <div style={recommendedAiName}>{selectedPrompt.recommendedAi}</div>
                  <div style={aiDescriptionStyle}>{selectedPrompt.aiDescription}</div>

                  <div style={reasonTitle}>추천 이유</div>
                  <div style={reasonContent}>{selectedPrompt.reason}</div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                    <button style={{ ...newChatButton, width: 'auto', padding: '10px 20px', marginBottom: '0' }}>
                      <SettingsIcon sx={{ fontSize: '20px' }} />
                      AI 설정으로 이동
                    </button>
                  </div>
                </div>
              </div>

              {/* AI 성능 비교 */}
              <div style={{ background: '#0B1B31', border: '1px solid #1F2C49', borderRadius: '15px', padding: '30px' }}>
                <div style={performanceTitle}>AI 별 성능 비교 (AI 별 성능 비교 &lt;&lt; 날먹)</div>
                <div style={performanceGrid}>
                  <div style={performanceItem}>
                    <div style={performanceLabel}>속도 (Speed)</div>
                    {renderStarRating(selectedPrompt.performance.speed)}
                  </div>
                  <div style={performanceItem}>
                    <div style={performanceLabel}>정확도 (Accuracy)</div>
                    {renderStarRating(selectedPrompt.performance.accuracy)}
                  </div>
                  <div style={performanceItem}>
                    <div style={performanceLabel}>비용 (Cost)</div>
                    {renderStarRating(selectedPrompt.performance.cost)}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', color: 'rgba(193, 197, 204, 0.5)', fontSize: '24px', marginTop: '100px' }}>
              프롬프트 목록에서 항목을 선택하여 AI 추천을 확인하세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendPage;
