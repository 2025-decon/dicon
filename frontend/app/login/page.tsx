'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authApi } from '@/app/lib/api';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authApi.login(email, password);

      if (response.error) {
        setError(response.error);
        return;
      }

      // 로그인 성공
      router.push('/'); // 메인 페이지로 이동
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

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

        {/* 헤더 영역 */}
        <div style={{
          paddingTop: '40px',
          paddingBottom: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap:'20px'
        }}>
          <div style={{
            width: 76,
            height: 76,
            borderRadius: '50%',
            background: '#FFFFFF',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }} aria-hidden>
            <img
              src="/logo.svg"
              alt="Promty Logo"
              style={{ width: '80%', height: '80%', objectFit: 'contain' }}
            />
          </div>

          <div style={{
            fontSize: 64,
            fontWeight: 700,
          }}>
            Promty
          </div>
        </div>

        {/* 폼 영역 */}
        <form onSubmit={handleLogin} style={{
          padding: '20px 40px 40px 40px',
          boxSizing: 'border-box'
        }}>

          {/* 에러 메시지 */}
          {error && (
            <div style={{
              background: 'rgba(255, 0, 0, 0.1)',
              border: '1px solid rgba(255, 0, 0, 0.3)',
              borderRadius: 10,
              padding: '10px 15px',
              marginBottom: 20,
              color: '#ff6b6b',
              fontSize: 14
            }}>
              {error}
            </div>
          )}

          {/* 이메일 입력 */}
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
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontSize: 18,
                width: '100%'
              }}
            />
          </div>

          {/* 비밀번호 입력 */}
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
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontSize: 18,
                width: '100%'
              }}
            />
          </div>

          {/* 로그인 버튼 */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                height: 90,
                background: isLoading ? '#1a7a67' : '#33BEA1',
                borderRadius: 20,
                border: 'none',
                fontSize: 40,
                fontWeight: 700,
                color: '#FFFFFF',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? 'LOADING...' : 'LOGIN'}
            </button>
          </div>

          {/* 회원가입 링크 */}
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <Link href="/signup" style={{ color: 'rgba(193,197,204,0.8)', textDecoration: 'underline' }}>
              계정이 없으신가요? 회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
