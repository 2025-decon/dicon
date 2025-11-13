"use client";

import React, { CSSProperties, useState } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LoopIcon from '@mui/icons-material/Loop';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
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
    position: 'relative',
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
    opacity: 1,
    transition: 'opacity 0.2s',
  };

  // 컨테이너 스타일
  const container: CSSProperties = {
    width: '100%',
    minHeight: '100vh',
    background: '#051225',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '280px',
    padding: '0 20px 0 300px',
    boxSizing: 'border-box',
  };

  // 헤더 스타일
  const header: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '24px 0',
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

  // 메인 채팅 영역
  const main: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 0',
    gap: '30px',
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
  };

  // AI 메시지 컨테이너
  const aiMessageContainer: CSSProperties = {
    width: '100%',
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const aiMessageContent: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
  };

  const aiIconBg: CSSProperties = {
    width: '28px',
    height: '28px',
    background: '#FFFFFF',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  };

  const aiIconLogo: CSSProperties = {
    width: '15px',
    height: '22px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: 'url(/logo.svg)',
  };

  const aiText: CSSProperties = {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 350,
    fontSize: '20px',
    lineHeight: '24px',
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 0,
    marginBottom: 0,
    whiteSpace: 'pre-wrap',
    flex: 1,
  };

  const aiMessageActions: CSSProperties = {
    display: 'flex',
    gap: '15px',
    marginLeft: '38px',
  };

  const actionIconSx = {
    color: '#9AA0A6',
    fontSize: '20px',
    cursor: 'pointer',
    '&:hover': { color: '#FFFFFF' },
  };

  // 하단 입력창
  const footer: CSSProperties = {
    position: 'sticky',
    bottom: '20px',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    boxSizing: 'border-box',
  };

  const inputArea: CSSProperties = {
    width: '100%',
    maxWidth: '951px',
    height: '135px',
    margin: '0 auto',
    background: '#041832',
    border: '1px solid #1F2C49',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    boxSizing: 'border-box',
  };

  const chatInput: CSSProperties = {
    flexGrow: 1,
    height: '24px',
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '24px',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    background: 'none',
    border: 'none',
    outline: 'none',
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: '19px',
  };

  const plusButton: CSSProperties = {
    width: '33px',
    height: '33px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  };

  const sendButton: CSSProperties = {
    width: '35px',
    height: '35px',
    background: 'rgba(33, 53, 79, 0.3)',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '10px',
    flexShrink: 0,
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

        <main style={main}>
          {/* AI 메시지 */}
          <div style={aiMessageContainer}>
            <div style={aiMessageContent}>
              <div style={aiIconBg}>
                <div style={aiIconLogo}></div>
              </div>
              <p style={aiText}>
                안녕하세요 프롬프트 제작 ai Promty 입니다.
                당신의 상황을 설명해주시겠습니까?
              </p>
            </div>
            
            <div style={aiMessageActions}>
              <ContentCopyIcon sx={actionIconSx} />
              <LoopIcon sx={actionIconSx} />
              <DeleteIcon sx={actionIconSx} />
              <ShareIcon sx={actionIconSx} />
            </div>
          </div>
        </main>
        
        <footer style={footer}>
          <div style={inputArea}>
            <div style={plusButton}>
              <AddIcon sx={{ color: '#33BEA1', fontSize: '30px' }} />
            </div>
            <input 
              type="text" 
              placeholder="Promty한테 물어보세요" 
              style={chatInput} 
            />
            <div style={sendButton}>
              <SendIcon sx={{ color: 'rgba(154, 154, 154, 0.5)', fontSize: '20px', paddingLeft: '2px' }} />
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CreatePage;