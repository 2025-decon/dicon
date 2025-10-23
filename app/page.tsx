import Link from "next/link";
import Image from "next/image";
import React from "react"; // React.Fragment 같은 걸 쓸 수 있으니 import

export default function Home() {
  
  // 인기 프롬프트 카드에 들어갈 내용
  const popularTopics = [
    { text: '게임 개발' },
    { text: '디자인' },
    { text: '연애 조언' },
    { text: '밥 추천' },
    // { text: '더 추가해도 됨' },
  ];
  
  // 사이드바의 너비. 이 값만큼 오른쪽 컨텐츠를 밀어낼 거야.
  const sidebarWidth = 177; 
  // CSS 시안의 좌우 여백
  const mainPaddingX = 80; 
  // 사이드바와 컨텐츠 영역 사이의 간격 (CSS 시안 기준: 311px - 177px = 134px)
  // 하지만 그냥 mainPaddingX랑 똑같이 80px로 줘도 깔끔해. 
  // 여기선 시안을 존중해서 311px(left) - 177px(sidebar width) = 134px로 계산
  // 근데 134px는 너무 넓으니까, 
  // (사이드바 177px) + (컨텐츠 좌측 여백 80px) = 257px
  // 이렇게 계산하는 게 더 합리적일 것 같아.
  const contentMarginLeft = sidebarWidth;

  return (
    <div style={{
      background: '#051225',
      minHeight: '100vh',
      color: '#fff',
      fontFamily: "'Noto Sans KR', Arial, sans-serif"
    }}>
      
      {/* Sidebar: 
        position: fixed로 화면에 고정.
        CSS 시안의 너비(177px)와 스타일 적용.
      */}
      <aside style={{
        boxSizing: 'border-box',
        position: 'fixed', // 화면에 고정
        width: sidebarWidth,
        height: '100vh', // 화면 전체 높이
        left: 0,
        top: 0,
        background: '#0B1B31',
        borderRight: '1px solid #132843', // CSS 시안의 border
        padding: 20,
        // CSS 시안의 이상한 좌표(-24, -20)와 borderRadius는 레이아웃에 방해가 돼서 뺌
      }}>
        <div style={{ fontWeight: 700, fontSize: 24, color: 'rgba(193,197,204,0.8)' }}>Promty</div>
      </aside>

      {/* Main Content Wrapper:
        사이드바 너비(177px)만큼 왼쪽 여백(marginLeft)을 줘서 
        컨텐츠가 사이드바에 가려지지 않게 함.
      */}
      <div style={{ marginLeft: contentMarginLeft }}>
        
{/* Top navigation */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end', // 요소들을 오른쪽으로 정렬
          padding: '20px 40px', 
        }}>
          
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Link href="/prompt" style={{ color: '#fff', textDecoration: 'none', fontSize: 18 }}>프롬프트 생성</Link>
            <a style={{ color: '#fff', cursor: 'pointer', fontSize: 18 }}>도움말</a>
            <a style={{ color: '#fff', cursor: 'pointer', fontSize: 18 }}>비고</a>
            <a style={{ color: '#fff', cursor: 'pointer', fontSize: 18 }}>기타등등</a>
            
            {/* 🔥 여기! 주석 풀고 스타일 적용! */}
            <Link href="/login" style={{
              border: '1px solid #28405E', // CSS 시안의 테두리
              borderRadius: 10,
              padding: '8px 24px', // 버튼 크기
              textDecoration: 'none',
              color: '#fff',
              fontSize: 18
            }}>
              로그인
            </Link>
            
            {/* 프로필 아이콘 (Ellipse 1) */}
            <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#D9D9D9' }} />
          </div>
        </header>

        {/* Hero */}
        <section style={{ padding: '80px 40px 20px 40px' }}>
          <h1 style={{
            fontSize: 64,
            lineHeight: '77px',
            fontWeight: 700,
            margin: 0,
            maxWidth: 813, // CSS 시안의 너비를 최대 너비로
          }}>
            AI 프롬프트를 더욱<br />스마트하게
          </h1>
          <p style={{
            color: 'rgba(193,197,204,0.8)',
            marginTop: 16,
            fontWeight: 700,
            fontSize: 24,
          }}>
            프롬프트 생성, 비교, 추천까지 한번에
          </p>

          <div style={{ marginTop: 40, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/create" style={{
              width: 266,
              height: 60,
              background: '#31C79B',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 24, // CSS 시안의 24px 적용
              color: '#0B1B31',
              textDecoration: 'none',
            }}>
              프롬프트 생성하기
            </Link>
            <div style={{
              width: 184,
              height: 60,
              borderRadius: 10,
              border: '1px solid #31C79B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: 22, // CSS 시안의 22px 적용
              boxSizing: 'border-box' // border 때문에 크기 밀리는 것 방지
            }}>
              기능 살펴보기
            </div>
          </div>
        </section>

        {/* Main feature cards */}
        <main style={{ padding: '20px 40px 120px 40px' }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, marginBottom: 24 }}>
            주요 기능
          </h2>

          {/* 🔥 반응형 핵심 1:
            카드들을 flex로 감싸고, flexWrap: 'wrap'을 줘서
            공간이 부족하면 자동으로 줄바꿈되게 함
          */}
          <div style={{ display: 'flex', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
            
            {/* 카드 1 (아이콘 포함) */}
            <div style={{
              boxSizing: 'border-box',
              width: 266,
              height: 167,
              background: '#0B1B31',
              border: '1px solid #132843',
              borderRadius: 10,
              padding: 20,
              position: 'relative' // 아이콘 위치 잡기용
            }}>
              {/* CSS 시안의 아이콘 (React 컴포넌트나 이미지로 빼는 게 좋음) */}
              <div style={{
                boxSizing: 'border-box',
                position: 'absolute',
                width: 60,
                height: 60,
                left: 102, // 414 - 312 = 102 (카드 내부 상대 좌표)
                top: 29,  // 481 - 452 = 29
                border: '5px solid #31C79B',
                borderRadius: 10,
              }}>
                <div style={{ position: 'absolute', width: 6, height: 30, left: 23, top: 13, background: '#31C79B' }} />
                <div style={{ position: 'absolute', width: 6, height: 30, left: 23, top: 13, background: '#31C79B', transform: 'rotate(-90deg)' }} />
              </div>
              
              <div style={{
                position: 'absolute',
                bottom: 20, // 561-452-167 = -58 (이상함). 그냥 padding에 맞춰서 텍스트 위치 잡음
                left: 20,
                fontWeight: 400,
                fontSize: 24,
                color: '#fff',
              }}>
                프롬프트 생성
              </div>
            </div>
            
            {/* 카드 2 */}
            <div style={{
              boxSizing: 'border-box',
              width: 266,
              height: 167,
              background: '#0B1B31',
              border: '1px solid #132843',
              borderRadius: 10,
              padding: 20,
              display: 'flex',
              alignItems: 'flex-end', // 텍스트를 아래로
            }}>
              <div style={{ fontWeight: 400, fontSize: 24, color: '#fff' }}>
                상황 맞춤 추천
              </div>
            </div>

            {/* 카드 3 */}
            <div style={{
              boxSizing: 'border-box',
              width: 266,
              height: 167,
              background: '#0B1B31',
              border: '1px solid #132843',
              borderRadius: 10,
              padding: 20,
              display: 'flex',
              alignItems: 'flex-end',
            }}>
              <div style={{ fontWeight: 400, fontSize: 24, color: '#fff' }}>
                프롬프트 생성
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: 30, fontWeight: 700, margin: '24px 0' }}>
            🔥 인기 프롬프트
          </h3>
          
          {/* 🔥 반응형 핵심 2:
            여기도 flexWrap: 'wrap' 적용
          */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {popularTopics.map((topic, i) => (
              <div key={i} style={{
                boxSizing: 'border-box',
                width: 185,
                height: 185,
                background: '#0B1B31',
                border: '1px solid #132843',
                borderRadius: 10,
                // CSS 시안의 카드 내부 스타일 적용
                position: 'relative', 
                fontFamily: "'Noto Sans KR', sans-serif",
              }}>
                {/* 아이콘 박스 (CSS 시안의 상대 위치) */}
                <div style={{
                  boxSizing: 'border-box',
                  position: 'absolute',
                  width: 60,
                  height: 37,
                  left: 63, // 374-311=63 (카드 좌상단 기준)
                  top: 38,  // 791-753=38
                  background: '#16263C',
                  border: '1px solid #17263C',
                  borderRadius: 10,
                }} />

                {/* 텍스트 (CSS 시안의 상대 위치) */}
                <div style={{
                  position: 'absolute',
                  left: 46, // 357-311=46
                  top: 95,  // 848-753=95
                  fontWeight: 400,
                  fontSize: 24,
                  lineHeight: '29px',
                  color: '#FFFFFF',
                  // 텍스트 중앙 정렬을 위해 수정
                  width: 'calc(100% - 92px)', // 46*2
                  textAlign: 'center',
                }}>
                  {topic.text}
                </div>
                
                {/* 하단 라인 (CSS 시안의 상대 위치) */}
                <div style={{
                  position: 'absolute',
                  width: '100%', // 185px
                  height: 0,
                  left: 0,
                  top: 150,  // 903-753=150
                  border: '1px solid #132843',
                }} />
              </div>
            ))}
          </div>

          {/* Footer */}
          <footer style={{
            marginTop: 80, // CSS 시안 기준 (976 - (753+185) = 38) -> 좀 더 넉넉하게
            display: 'flex',
            gap: 24,
            alignItems: 'center',
            justifyContent: 'center', // 푸터 내용 중앙 정렬
            fontSize: 18
          }}>
            <div style={{ color: '#fff' }}>개인정보</div>
            <div style={{ color: '#fff' }}>이용약관</div>
            <div style={{ color: '#fff' }}>문의</div>
            {/* CSS 시안의 아이콘들 */}
            <div style={{ width: 27, height: 27, borderRadius: '50%', background: '#D9D9D9' }} />
            <div style={{ width: 27, height: 27, borderRadius: '50%', background: '#D9D9D9' }} />
          </footer>
          
        </main>
      </div>
    </div>
  );
}