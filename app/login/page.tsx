import React from 'react';
import Link from 'next/link';
// import Image from 'next/image'; // Image 컴포넌트를 사용하려면 이 주석을 풀어주세요.

const Login = () => {
  return (
    <div style={{
      height: '100vh',
      overflow: 'hidden',
      background: '#051225',
      fontFamily: "'Noto Sans KR', Arial, sans-serif",
      color: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding:'20px'
    }}>

      <div style={{
        width: '100%',
        maxWidth: 600,
        background: '#0F1A2C',
        border: '2px solid #1F2C49',
        borderRadius: 24,
        boxSizing: 'border-box'
      }}>

        {/* 3. 헤더 영역: 로고와 Promty 텍스트를 flex로 중앙 정렬 */}
        <div style={{
          paddingTop: '40px',
          paddingBottom: '20px',
          display: 'flex', // flexbox 컨테이너
          justifyContent: 'center', // 가로 중앙 정렬
          alignItems: 'center', // 세로 중앙 정렬 (로고와 텍스트의 baseline 맞추기 위함)
          gap:'20px' // 로고와 텍스트 사이 간격
        }}>
          {/* 🔥 여기! 로고 동그라미 배경과 이미지 */}
          <div style={{
            width: 76,
            height: 76,
            borderRadius: '50%', // 완벽한 원
            background: '#FFFFFF', // 흰색 동그라미 배경
            display: 'flex', // 이미지 중앙 정렬을 위한 flexbox
            justifyContent: 'center',
            alignItems: 'center'
          }} aria-hidden>
            <img 
              src="\promty-logo.svg" // 👈 네 SVG 파일 이름으로 바꿔! (예: /my-logo.svg)
              alt="Promty Logo"
              style={{ width: '80%', height: '80%', objectFit: 'contain' }}
            />
          </div>

          <div style={{
            fontSize: 64,
            fontWeight: 700,
            // textAlign: 'center' // flex 컨테이너에서 이미 중앙 정렬됨
          }}>
            Promty
          </div>
        </div>

        {/* 4. 폼 영역: */}
        <div style={{
          padding: '20px 40px 40px 40px',
          boxSizing: 'border-box'
        }}>
          
          <div style={{
            width: '100%',
            height: 77,
            background: '#0F1A2C',
            border: '2px solid #1F2C49',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            marginBottom: 20,
            boxSizing: 'border-box'
          }}>
            <input name="username" placeholder="Username" style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 18, width: '100%' }} />
          </div>

          
          <div style={{
            width: '100%',
            height: 77,
            background: '#0F1A2C',
            border: '2px solid #1F2C49',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            marginBottom: 28,
            boxSizing: 'border-box'
          }}>
            <input name="password" type="password" placeholder="Password" style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 18, width: '100%' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="button" style={{
              width: '100%',
              height: 90,
              background: '#33BEA1',
              borderRadius: 20,
              border: 'none',
              fontSize: 40,
              fontWeight: 700,
              color: '#FFFFFF',
              cursor: 'pointer'
            }}>LOGIN</button>
          </div>

          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <Link href="/signup" style={{ color: 'rgba(193,197,204,0.8)', textDecoration: 'underline' }}>
              계정이 없으신가요? 회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;