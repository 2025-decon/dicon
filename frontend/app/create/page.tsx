"use client";

import React, { CSSProperties } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LoopIcon from '@mui/icons-material/Loop';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';

const CreatePage: React.FC = () => {
  // 컨테이너 스타일
  const container: CSSProperties = {
    width: '100%',
    minHeight: '100vh',
    background: '#051225',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 20px',
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
    margin: 0,
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

  // 사용자 메시지
  const userMessageContainer: CSSProperties = {
    width: '100%',
    maxWidth: '800px',
    display: 'flex',
    justifyContent: 'flex-end',
  };

  const userBubble: CSSProperties = {
    background: '#213555',
    borderRadius: '24px',
    padding: '11px 19px',
  };

  const userText: CSSProperties = {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontWeight: 350,
    fontSize: '20px',
    lineHeight: '24px',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0,
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
  );
};

export default CreatePage;