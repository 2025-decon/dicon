import React from 'react';
import Link from 'next/link';
// 1. Emotion의 Global과 css를 임포트
import { Global, css } from '@emotion/react';

// 2. 전역 스타일 정의 (body의 여백 제거)
const globalStyles = css`
  body, html {
    margin: 0;
    padding: 0;
    /* 폰트나 기본 배경색도 여기서 설정하면 편해 */
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
`;

const Home = () => {
  return (
    <>
      {/* 3. 전역 스타일 적용 */}
      <Global styles={globalStyles} />

      {/* 4. padding: '50px' -> '50px 0'
        (위아래 50px, 양옆 0px) 
      */}
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <h1>Welcome to Our App</h1>
        <p>Explore the features of our application.</p>
        <div style={{ marginTop: '20px' }}>
          {/* 5. <a> 태그를 제거하고 Link에 바로 스타일 적용 
          */}
          <Link 
            href="/login"
            style={{ 
              marginRight: '10px', 
              padding: '10px 20px', 
              backgroundColor: '#0070f3', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '5px' 
            }}
          >
            Login
          </Link>
          <Link 
            href="/signup"
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#0070f3', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '5px' 
            }}
          >
            Signup
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;