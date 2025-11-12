import Link from "next/link";
import Image from "next/image";
import React, { JSX } from "react";

interface FeatureCard {
  tag: string;
  title: string;
  description: string;
  demoText: string;
  href: string; // 🔥 추가: 각 카드의 링크 경로
}

export default function Home(): JSX.Element {
  
  const sidebarWidth = 153; 
  const contentMarginLeft = sidebarWidth;

  // 🔥 수정: href 속성 추가
  const featureCards: FeatureCard[] = [
    {
      tag: '프롬프트생성',
      title: '상황을 입력하면 자동으로 맞춤형 프롬프트를 제작',
      description: '자신의 상황에 가장 적절한 프롬프트를 맞춤 제작 받아보세요.',
      demoText: '당신이 처한 상황을 설명해주세요.',
      href: '/create'
    },
    {
      tag: '아이디어공유',
      title: '자신의 아이디어를 창의마당을 통해 공유하기',
      description: '자신과 비슷한 상황에 처한 사람들의 프롬프트를 참고해보세요.',
      demoText: '검색어를 입력하세요',
      href: '/hub'
    },
    {
      tag: '상황맞춤추천',
      title: '나의 상황에 대응하기 가장 적절한 AI 맞춤 추천',
      description: '자신이 처한 상황에 가장 적절한 AI를 추천받아 사용해보세요.',
      demoText: '인기글',
      href: '/context'
    }
  ];

  return (
    <div style={{
      background: '#051225',
      minHeight: '100vh',
      color: '#fff',
      fontFamily: "'Noto Sans KR', Arial, sans-serif",
      position: 'relative' 
    }}>
      
      {/* Sidebar */}
      <aside style={{
        boxSizing: 'border-box',
        position: 'fixed', 
        width: sidebarWidth,
        height: '100vh', 
        left: 0,
        top: 0,
        background: '#0B1B31',
      }}>
      </aside>

      {/* Main Content Wrapper */}
      <div style={{ 
        marginLeft: contentMarginLeft,
        width: `calc(100vw - ${contentMarginLeft}px)`,
        padding: '0 40px',
        boxSizing : 'border-box',
      }}>
        
        {/* Top navigation */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between', 
          padding: '20px 0', 
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#FFFFFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Image
                src="/logo.svg" 
                alt="Promty Logo"
                width={23} 
                height={32}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div style={{ fontWeight: 700, fontSize: 36, color: 'rgba(193,197,204, 0.8)' }}>
              Promty
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Link href="/context" style={{ color: '#fff', textDecoration: 'none', fontSize: 18 }}>프롬프트 생성</Link>
            <a href="#" style={{ color: '#fff', cursor: 'pointer', fontSize: 18, textDecoration: 'none' }}>도움말</a>
            <a href="#" style={{ color: '#fff', cursor: 'pointer', fontSize: 18, textDecoration: 'none' }}>비고</a>
            <a href="#" style={{ color: '#fff', cursor: 'pointer', fontSize: 18, textDecoration: 'none' }}>기타등등</a>
            <Link href="/login" style={{
              border: '1px solid #28405E',
              borderRadius: 10,
              padding: '8px 24px',
              textDecoration: 'none',
              color: '#fff',
              fontSize: 18
            }}>
              로그인
            </Link>
            <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#D9D9D9' }} />
          </div>
        </header>

        {/* Hero */}
        <section style={{ padding: '80px 0 20px 0' }}>
          <h1 style={{
            fontSize: 64,
            lineHeight: '77px',
            fontWeight: 700,
            margin: 0,
            maxWidth: 813,
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
              fontSize: 24,
              color: '#FFFFFF',
              textDecoration: 'none',
            }}>
              프롬프트 생성하기
            </Link>
            
            <Link href="/introduce" style={{
              boxSizing: 'border-box',
              width: 184,
              height: 60,
              border: '1px solid #31C79B',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: 22,
              background: 'transparent', 
              cursor: 'pointer', 
              fontFamily: "'Noto Sans KR', Arial, sans-serif", 
            }}>
              기능 살펴보기
            </Link>
          </div>
        </section>

        {/* Main feature cards */}
        <main style={{ padding: '20px 0 120px 0' }}>
          <h2 style={{ fontSize: 48, fontWeight: 700, marginBottom: 24 }}>
            주요 기능
          </h2>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
            {featureCards.map((card) => (
              <Link 
                key={card.tag} 
                href={card.href}
                style={{
                  boxSizing: 'border-box',
                  width: 'calc((100% - 48px) / 3)',
                  minWidth: 300,
                  height: 571,
                  background: '#0B1B31',
                  border: '1px solid #132843',
                  borderRadius: 10,
                  padding: '24px 22px',
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  display: 'block'
                }}
              >
                <div style={{
                  width: 120,
                  height: 40,
                  background: '#33BEA1',
                  borderRadius: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#FFFFFF'
                }}>
                  {card.tag}
                </div>
                <div style={{
                  marginTop: 44,
                  fontWeight: 700,
                  fontSize: 24,
                  lineHeight: '29px',
                  color: '#FFFFFF',
                  height: 64
                }}>
                  {card.title}
                </div>
                <div style={{
                  marginTop: 12,
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: '19px',
                  color: 'rgba(193, 197, 204, 0.35)',
                  height: 38
                }}>
                  {card.description}
                </div>
                <div style={{
                  marginTop: 88,
                  height: 180,
                  background: '#051225',
                  border: '1px solid #1F2C49',
                  borderRadius: 15,
                  padding: 18
                }}>
                  <div style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: 'rgba(193, 197, 204, 0.35)',
                  }}>
                    {card.demoText}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* AI Chat 섹션 */}
          <section style={{ marginTop: 120 }}>
            <h2 style={{ fontSize: 48, fontWeight: 700, marginBottom: 24 }}>
              AI에게 맞춤 추천 받기
            </h2>
            <div style={{ padding: '20px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
                <div style={{
                  background: '#213555',
                  padding: '12px 16px',
                  borderRadius: 24,
                  maxWidth: 370,
                  fontSize: 20,
                  lineHeight: '24px',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  안녕
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Image 
                    src="/logo.svg" 
                    alt="Logo" 
                    width={15} 
                    height={22} 
                    style={{ objectFit: 'contain' }} 
                  />
                </div>
                <div style={{
                  background: 'rgba(25, 44, 71, 0.5)',
                  padding: '12px 16px',
                  borderRadius: 10,
                  maxWidth: 370,
                  fontSize: 20,
                  lineHeight: '24px',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  안녕하세요 프롬프트 제작 ai Promty 입니다. 당신의 상황을 설명해주시겠습니까?
                </div>
              </div>
            </div>
                        
            <Link href="/context" style={{ textDecoration: 'none' }}>
              <div style={{
                boxSizing: 'border-box',
                width: '100%',
                maxWidth: 1200,
                margin: '0 auto',
                height: 135,
                background: '#041832',
                border: '1px solid #1F2C49',
                borderRadius: 20,
                padding: '20px',
                position: 'relative',
                cursor: 'pointer'
              }}>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: 'rgba(193, 197, 204, 0.35)', 
                    fontFamily: "'Noto Sans KR', Arial, sans-serif", 
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                  }}
                >
                  Promty한테 물어보세요
                </div>
                <div style={{
                  width: 35,
                  height: 35,
                  background: 'rgba(33, 53, 79, 0.3)',
                  borderRadius: '50%',
                  position: 'absolute',
                  right: 14,
                  bottom: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none', 
                  color: '#fff', 
                }}>
                  <span style={{ fontSize: 20, transform: 'rotate(-90deg)' }}>^</span>
                </div>
              </div>
            </Link>
          </section>

        </main>
      </div>

      {/* Footer */}
      <footer style={{
        width: '100%',
        height: 392,
        background: '#0B1B31',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100 
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ 
              width: 48, 
              height: 48, 
              borderRadius: '50%', 
              background: '#FFFFFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image 
                src="/logo.svg" 
                alt="Logo" 
                width={28} 
                height={39} 
                style={{ objectFit: 'contain' }} 
              />
            </div>
            <div style={{ fontSize: 44, fontWeight: 700, color: 'rgba(193, 197, 204, 0.8)' }}>
              Promty
            </div>
          </div>
          <div style={{ fontSize: 18, color: '#7E8794' }}>Promty.com (아무튼 사이트 주소)</div>
          
          <div style={{ display: 'flex', gap: 16, marginTop: 20, fontSize: 18 }}>
            <a href="#" style={{ color: '#C1C5CC', textDecoration: 'none' }}>버그 및 불편사항 제보</a>
            <div style={{ color: '#4D5664' }}>|</div>
            <a href="#" style={{ color: '#4D5664', textDecoration: 'none' }}>개인정보처리방침</a>
            <div style={{ color: '#4D5664' }}>|</div>
            <a href="#" style={{ color: '#4D5664', textDecoration: 'none' }}>이용약관</a>
          </div>
          <div style={{ marginTop: 40, fontSize: 18, color: '#4D5664' }}>
            개인적인 문의또는 광고 문의는 (sunrint.promty.gmail.com)
          </div>
        </div>
      </footer>

    </div>
  );
}