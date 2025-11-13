"use client";

import React, { CSSProperties, useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

interface ChatHistory {
  id: number;
  title: string;
  date: string;
}

const CreatePage: React.FC = () => {
  const [hoveredChatId, setHoveredChatId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 샘플 채팅 기록
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

  // 프롬프트 생성 핸들러 (백엔드 연동 부분)
  const handleGeneratePrompt = async () => {
    if (!inputText.trim()) {
      alert('상황을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: 실제 백엔드 API 호출
      // const response = await fetch('/api/generate-prompt', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ situation: inputText })
      // });
      // const data = await response.json();
      // setGeneratedPrompt(data.prompt);

      // 임시 시뮬레이션 (2초 후 응답)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setGeneratedPrompt(
        `[생성된 프롬프트]\n\n당신이 입력한 상황: "${inputText}"\n\n` +
        `다음은 이 상황에 최적화된 프롬프트입니다:\n\n` +
        `"당신은 전문 상담가입니다. 다음 상황에 대해 구체적이고 실용적인 조언을 제공해주세요:\n\n` +
        `${inputText}\n\n` +
        `조언을 제공할 때는 다음 사항을 포함해주세요:\n` +
        `1. 상황 분석\n` +
        `2. 구체적인 해결 방안 (3가지 이상)\n` +
        `3. 예상되는 장단점\n` +
        `4. 실행 단계별 가이드"`
      );
    } catch (error) {
      console.error('프롬프트 생성 오류:', error);
      alert('프롬프트 생성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 복사 핸들러
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    alert('프롬프트가 복사되었습니다!');
  };

  // 수정 핸들러
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // 사이드바 스타일
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

  const chatItem = (isHovered: boolean): CSSProperties => ({
    padding: '12px',
    background: isHovered ? 'rgba(49, 199, 155, 0.1)' : 'rgba(25, 44, 71, 0.5)',
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

  const deleteButton: CSSProperties = {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    background: 'rgba(255, 59, 48, 0.1)',
    border: 'none',
    cursor: 'pointer',
    flexShrink: 0,
  };

  // 메인 컨테이너
  const container: CSSProperties = {
    marginLeft: '280px',
    minHeight: '100vh',
    background: '#051225',
    display: 'flex',
    flexDirection: 'column',
  };

  // 헤더
  const header: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '24px 40px',
    borderBottom: '3px solid #1F2C49',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    gap: '12px',
  };

  const profileIcon: CSSProperties = {
    width: '35px',
    height: '35px',
    background: '#D9D9D9',
    borderRadius: '50%',
    flexShrink: 0,
  };

  const userName: CSSProperties = {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 500,
    fontSize: '18px',
    color: '#FFFFFF',
  };

  // 메인 콘텐츠 영역
  const mainContent: CSSProperties = {
    flex: 1,
    display: 'flex',
    padding: '40px',
    gap: '40px',
  };

  // 왼쪽 입력 영역
  const leftPanel: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const panelTitle: CSSProperties = {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 700,
    fontSize: '24px',
    color: '#FFFFFF',
    marginBottom: '10px',
  };

  const textareaBox: CSSProperties = {
    flex: 1,
    background: '#0B1B31',
    border: '1px solid #1F2C49',
    borderRadius: '15px',
    padding: '20px',
    boxSizing: 'border-box',
  };

  const textarea: CSSProperties = {
    width: '100%',
    height: '100%',
    minHeight: '400px',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '26px',
    color: '#FFFFFF',
    resize: 'none',
  };

  const generateButton: CSSProperties = {
    width: '100%',
    padding: '16px',
    background: isLoading ? '#7A7A7A' : '#31C79B',
    borderRadius: '10px',
    border: 'none',
    color: '#FFFFFF',
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 700,
    fontSize: '20px',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    transition: 'background 0.3s',
  };

  // 오른쪽 출력 영역
  const rightPanel: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const outputBox: CSSProperties = {
    flex: 1,
    background: '#0B1B31',
    border: '1px solid #1F2C49',
    borderRadius: '15px',
    padding: '20px',
    boxSizing: 'border-box',
    position: 'relative',
  };

  const outputTextarea: CSSProperties = {
    width: '100%',
    height: '100%',
    minHeight: '400px',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '26px',
    color: '#FFFFFF',
    resize: 'none',
    whiteSpace: 'pre-wrap',
  };

  const emptyState: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    minHeight: '400px',
    color: 'rgba(193, 197, 204, 0.35)',
    fontSize: '18px',
    fontWeight: 500,
  };

  const actionButtons: CSSProperties = {
    display: 'flex',
    gap: '12px',
  };

  const actionButton: CSSProperties = {
    flex: 1,
    padding: '12px',
    background: 'rgba(25, 44, 71, 0.5)',
    border: '1px solid #1F2C49',
    borderRadius: '8px',
    color: '#FFFFFF',
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 600,
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'background 0.2s',
  };

  return (
    <>
      {/* 사이드바 */}
      <aside style={sidebar}>
        <button style={newChatButton}>
          <ChatIcon sx={{ fontSize: '20px' }} />
          새 채팅
        </button>

        <div style={searchContainer}>
          <input
            type="text"
            placeholder="채팅 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={searchInput}
          />
          <div style={searchIconStyle}>
            <SearchIcon sx={{ color: 'rgba(193, 197, 204, 0.5)', fontSize: '20px' }} />
          </div>
        </div>

        <div style={historyTitle}>채팅 기록</div>

        <div style={chatList}>
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              style={chatItem(hoveredChatId === chat.id)}
              onMouseEnter={() => setHoveredChatId(chat.id)}
              onMouseLeave={() => setHoveredChatId(null)}
            >
              <div style={chatItemContent}>
                <div style={chatTitle}>{chat.title}</div>
                <div style={chatDate}>{chat.date}</div>
              </div>
              {hoveredChatId === chat.id && (
                <button
                  style={deleteButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Delete chat:', chat.id);
                  }}
                >
                  <CloseIcon sx={{ color: '#FF3B30', fontSize: '16px' }} />
                </button>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <div style={container}>
        <header style={header}>
          <div style={profileIcon}></div>
          <div style={userName}>게스트12</div>
        </header>

        <div style={mainContent}>
          {/* 왼쪽: 입력 영역 */}
          <div style={leftPanel}>
            <h2 style={panelTitle}>상황 입력</h2>
            <div style={textareaBox}>
              <textarea
                placeholder="당신이 처한 상황을 자세히 설명해주세요..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={textarea}
              />
            </div>
            <button
              style={generateButton}
              onClick={handleGeneratePrompt}
              disabled={isLoading}
              onMouseEnter={(e) => {
                if (!isLoading) e.currentTarget.style.background = '#28A87D';
              }}
              onMouseLeave={(e) => {
                if (!isLoading) e.currentTarget.style.background = '#31C79B';
              }}
            >
              {isLoading ? '프롬프트 생성 중...' : '프롬프트 만들기'}
            </button>
          </div>

          {/* 오른쪽: 출력 영역 */}
          <div style={rightPanel}>
            <h2 style={panelTitle}>생성된 프롬프트</h2>
            <div style={outputBox}>
              {generatedPrompt ? (
                <textarea
                  value={generatedPrompt}
                  onChange={(e) => isEditing && setGeneratedPrompt(e.target.value)}
                  readOnly={!isEditing}
                  style={outputTextarea}
                />
              ) : (
                <div style={emptyState}>
                  프롬프트를 생성하면 여기에 표시됩니다
                </div>
              )}
            </div>
            {generatedPrompt && (
              <div style={actionButtons}>
                <button
                  style={actionButton}
                  onClick={handleEdit}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(49, 199, 155, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(25, 44, 71, 0.5)';
                  }}
                >
                  <EditIcon sx={{ fontSize: '20px' }} />
                  {isEditing ? '수정 완료' : '수정'}
                </button>
                <button
                  style={actionButton}
                  onClick={handleCopy}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(49, 199, 155, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(25, 44, 71, 0.5)';
                  }}
                >
                  <ContentCopyIcon sx={{ fontSize: '20px' }} />
                  복사
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePage;