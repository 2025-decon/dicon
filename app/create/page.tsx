"use client"; // ❗️이게 무조건 1줄에 와야 해
// 'use client'가 필요함 (MUI 아이콘, onClick 등 이벤트 핸들러)

import React, { CSSProperties } from 'react';

// 1. 요청한 아이콘 4개 + 기존 아이콘 3개 = 총 7개 임포트
//    이게 에러가 난다면 'npm install @mui/icons-material'이 안 된 거야.
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LoopIcon from '@mui/icons-material/Loop';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';

// --- 스타일 객체 정의 (백틱 없음) ---

const topBarLine: CSSProperties = {
  position: 'absolute', width: '1440px', height: '0px', left: '7px', top: '90px',
  border: '3px solid #1F2C49', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
};
const profileIcon: CSSProperties = {
  position: 'absolute', width: '35px', height: '35px', left: '164px', top: '24px',
  background: '#D9D9D9', borderRadius: '50%',
};
const userName: CSSProperties = {
  position: 'absolute', width: '71px', height: '22px', left: '207px', top: '31px',
  fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 500, fontSize: '18px',
  lineHeight: '22px', color: '#FFFFFF',
};

// --- 채팅 메시지 스타일 ---
const aiMessage: CSSProperties = {
  position: 'absolute', left: '323px', top: '356px',
  display: 'flex', flexDirection: 'column',
};
const aiMessageContent: CSSProperties = {
  display: 'flex', alignItems: 'flex-start',
};
const aiIconBg: CSSProperties = {
  width: '28px', height: '28px', background: '#FFFFFF', borderRadius: '24px',
  display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0,
};
const aiIconLogo: CSSProperties = {
  width: '15px', height: '22px', backgroundColor: '#33BEA1',
  backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
  backgroundImage: 'url(/디콘 로고 2.png)', // 로고 경로는 public 폴더 기준
};
const aiText: CSSProperties = {
  width: '370px', marginLeft: '10px', 
  fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 350, fontSize: '20px',
  lineHeight: '24px', color: 'rgba(255, 255, 255, 0.7)',
  margin: 0, whiteSpace: 'pre-wrap', // 줄바꿈 인식
};

// 2. 요청한 아이콘 4개 그룹 스타일
const aiMessageActions: CSSProperties = {
  display: 'flex',
  gap: '15px',
  marginLeft: '38px', // (아이콘 28px + 텍스트 여백 10px)
  marginTop: '10px',
};
const actionIconSx = { // MUI 아이콘에 적용할 sx prop
  color: '#9AA0A6',
  fontSize: '20px',
  cursor: 'pointer',
  '&:hover': { color: '#FFFFFF' },
};

// --- 사용자 메시지 스타일 ---
const userMessage: CSSProperties = {
  position: 'absolute', left: '1201px', top: '290px',
};
const userBubble: CSSProperties = {
  position: 'absolute', width: '75px', height: '45px',
  background: '#213555', borderRadius: '24px',
};
const userText: CSSProperties = {
  position: 'absolute', width: '37px', height: '24px', left: '19px', top: '11px',
  fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 350, fontSize: '20px',
  lineHeight: '24px', color: 'rgba(255, 255, 255, 0.7)', margin: 0,
};

// --- 하단 입력창 스타일 ---
const inputArea: CSSProperties = {
  boxSizing: 'border-box', position: 'absolute', width: '951px', height: '135px',
  left: '323px', top: '663px', background: '#041832',
  border: '1px solid #1F2C49', borderRadius: '20px',
  display: 'flex', alignItems: 'center', padding: '0 20px',
};
const chatInput: CSSProperties = {
  flexGrow: 1, height: '24px', fontFamily: "'Noto Sans KR', sans-serif",
  fontWeight: 700, fontSize: '20px', lineHeight: '24px',
  textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', background: 'none',
  border: 'none', outline: 'none', color: 'rgba(255, 255, 255, 0.7)',
  marginLeft: '19px',
};
const plusButton: CSSProperties = {
  width: '33px', height: '33px', cursor: 'pointer',
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  marginRight: '10px', 
};
const sendButton: CSSProperties = {
  width: '35px', height: '35px', background: 'rgba(33, 53, 79, 0.3)',
  borderRadius: '50%', cursor: 'pointer', display: 'flex',
  justifyContent: 'center', alignItems: 'center', marginLeft: 'auto',
};

// --- 메인 컴포넌트 ---
const CreatePage: React.FC = () => {
  return (
    // '대화창' 스타일
    <div style={{ position: 'relative', width: 1440, height: 1024, margin: '0 auto', overflow: 'hidden' }}>
      
      {/* 전역 스타일은 app/layout.tsx 에서 globals.css를 임포트하는 것으로 해결!
        (1번에서 설명한 캐시 삭제 꼭 해봐!)
      */}

      <header>
        <div style={profileIcon}></div>
        <div style={userName}>게스트12</div>
        <div style={topBarLine}></div>
      </header>

      <main>
        <div style={aiMessage}>
          {/* AI 메시지 (아이콘 + 텍스트) */}
          <div style={aiMessageContent}>
            <div style={aiIconBg}>
              <div style={aiIconLogo}></div>
            </div>
            <p style={aiText}>
              안녕하세요 프롬프트 제작 ai Promty 입니다.
              당신의 상황을 설명해주시겠습니까?
            </p>
          </div>
          
          {/* 3. 요청한 아이콘 4개 그룹 렌더링 */}
          <div style={aiMessageActions}>
            <ContentCopyIcon sx={actionIconSx} />
            <LoopIcon sx={actionIconSx} />
            <DeleteIcon sx={actionIconSx} />
            <ShareIcon sx={actionIconSx} />
          </div>
        </div>

        <div style={userMessage}>
          <div style={userBubble}></div>
          <p style={userText}>안녕</p>
        </div>
      </main>
      
      <footer style={inputArea}>
        <div style={plusButton}>
          <AddIcon sx={{ color: '#33BEA1', fontSize: '30px' }} />
        </div>
        <input 
          type="text" 
          placeholder="Promty한테 물어보세요" 
          style={chatInput} 
          // ⚠️ 인라인 스타일은 placeholder 스타일링이 안 돼!
        />
        <div style={sendButton}>
          <SendIcon sx={{ color: 'rgba(154, 154, 154, 0.5)', fontSize: '20px', paddingLeft: '2px' }} />
        </div>
      </footer>

    </div>
  );
};

export default CreatePage;

