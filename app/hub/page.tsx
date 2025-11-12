"use client";

import Link from "next/link";
import Image from "next/image";
import React, { CSSProperties } from "react";

// 게시글 데이터 타입
interface Post {
  id: number;
  category: string;
  title: string;
  content: string;
  views: number;
  likes: number;
  comments: number;
}

export default function HubPage() {
  // 샘플 게시글 데이터
  const posts: Post[] = [
    {
      id: 1,
      category: "회사",
      title: "회사 상사가 너무 짜증나게 굴때",
      content: "제가 태어나서 이렇게 말이 안통하는 사람은 처음봐서요 이게 진짜로 ...",
      views: 65,
      likes: 13,
      comments: 32
    },
    {
      id: 2,
      category: "자유주제",
      title: "회사 상사가 너무 짜증나게 굴때",
      content: "제가 태어나서 이렇게 말이 안통하는 사람은 처음봐서요 이게 진짜로 ...",
      views: 65,
      likes: 13,
      comments: 32
    },
    {
      id: 3,
      category: "회사",
      title: "회사 상사가 너무 짜증나게 굴때",
      content: "제가 태어나서 이렇게 말이 안통하는 사람은 처음봐서요 이게 진짜로 ...",
      views: 65,
      likes: 13,
      comments: 32
    },
    {
      id: 4,
      category: "회사",
      title: "회사 상사가 너무 짜증나게 굴때",
      content: "제가 태어나서 이렇게 말이 안통하는 사람은 처음봐서요 이게 진짜로 ...",
      views: 65,
      likes: 13,
      comments: 32
    },
    {
      id: 5,
      category: "회사",
      title: "회사 상사가 너무 짜증나게 굴때",
      content: "제가 태어나서 이렇게 말이 안통하는 사람은 처음봐서요 이게 진짜로 ...",
      views: 65,
      likes: 13,
      comments: 32
    },
    {
      id: 6,
      category: "회사",
      title: "회사 상사가 너무 짜증나게 굴때",
      content: "제가 태어나서 이렇게 말이 안통하는 사람은 처음봐서요 이게 진짜로 ...",
      views: 65,
      likes: 13,
      comments: 32
    }
  ];

  const sidebarWidth = 153;

  const container: CSSProperties = {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    background: '#051225',
    fontFamily: "'Noto Sans KR', Arial, sans-serif",
  };

  const sidebar: CSSProperties = {
    position: 'fixed',
    width: sidebarWidth,
    height: '100vh',
    left: 0,
    top: 0,
    background: '#0B1B31',
  };

  const mainContent: CSSProperties = {
    marginLeft: sidebarWidth,
    width: `calc(100% - ${sidebarWidth}px)`,
    boxSizing: 'border-box',
  };

  const topBar: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '24px 40px',
    borderBottom: '3px solid #1F2C49',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    gap: 12,
  };

  const profileIcon: CSSProperties = {
    width: 35,
    height: 35,
    background: '#D9D9D9',
    borderRadius: '50%',
  };

  const userName: CSSProperties = {
    fontWeight: 500,
    fontSize: 18,
    color: '#FFFFFF',
  };

  const authButtons: CSSProperties = {
    display: 'flex',
    gap: 12,
    marginLeft: 'auto',
  };

  const authButton: CSSProperties = {
    width: 110,
    height: 37,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
    fontSize: 18,
    color: '#FFFFFF',
    textDecoration: 'none',
  };

  const contentArea: CSSProperties = {
    display: 'flex',
    gap: 40,
    padding: '40px',
  };

  const leftColumn: CSSProperties = {
    width: 260,
    flexShrink: 0,
  };

  const middleColumn: CSSProperties = {
    flex: 1,
    maxWidth: 540,
  };

  const rightColumn: CSSProperties = {
    width: 260,
    flexShrink: 0,
  };

  const sectionBox: CSSProperties = {
    boxSizing: 'border-box',
    width: '100%',
    height: 50,
    border: '2px solid #1F2C49',
    borderRadius: 3,
    padding: '13px 20px',
    marginBottom: 20,
  };

  const sectionTitle: CSSProperties = {
    fontWeight: 700,
    fontSize: 20,
    color: 'rgba(193, 197, 204, 0.35)',
  };

  const popularBox: CSSProperties = {
    width: '100%',
    background: 'rgba(25, 44, 71, 0.5)',
    padding: 20,
    boxSizing: 'border-box',
  };

  const pageTitle: CSSProperties = {
    fontWeight: 700,
    fontSize: 24,
    lineHeight: '29px',
    color: '#FFFFFF',
    marginBottom: 30,
  };

  const searchBox: CSSProperties = {
    boxSizing: 'border-box',
    width: '100%',
    height: 50,
    border: '2px solid #1F2C49',
    borderRadius: 3,
    padding: '13px 20px',
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
  };

  const searchText: CSSProperties = {
    fontWeight: 700,
    fontSize: 20,
    color: 'rgba(193, 197, 204, 0.35)',
  };

  const postCard: CSSProperties = {
    boxSizing: 'border-box',
    width: '100%',
    padding: '20px',
    background: 'rgba(25, 44, 71, 0.5)',
    border: '1px solid #132843',
    borderRadius: 10,
    marginBottom: 22,
  };

  const categoryBadge: CSSProperties = {
    display: 'inline-block',
    padding: '2px 16px',
    background: '#0B1B31',
    borderRadius: 5,
    fontWeight: 700,
    fontSize: 12,
    color: '#C1C5CC',
    marginBottom: 8,
  };

  const postTitle: CSSProperties = {
    fontWeight: 700,
    fontSize: 14,
    lineHeight: '17px',
    color: '#FFFFFF',
    marginBottom: 6,
  };

  const postContent: CSSProperties = {
    fontWeight: 700,
    fontSize: 14,
    lineHeight: '17px',
    color: '#C1C5CC',
    marginBottom: 12,
  };

  const postStats: CSSProperties = {
    display: 'flex',
    gap: 16,
    fontSize: 15,
    color: '#FFFFFF',
  };

  const myPageBox: CSSProperties = {
    ...sectionBox,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  };

  const myPageText: CSSProperties = {
    fontWeight: 700,
    fontSize: 20,
    color: '#C1C5CC',
  };

  const recommendBox: CSSProperties = {
    ...sectionBox,
    borderTop: 'none',
    borderRadius: 0,
  };

  const recommendList: CSSProperties = {
    width: '100%',
    background: 'rgba(25, 44, 71, 0.5)',
    padding: 20,
    boxSizing: 'border-box',
  };

  const recommendItem: CSSProperties = {
    marginBottom: 16,
  };

  const recommendCategory: CSSProperties = {
    fontWeight: 700,
    fontSize: 12,
    color: '#C1C5CC',
    marginBottom: 4,
  };

  const recommendTitle: CSSProperties = {
    fontWeight: 700,
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 4,
  };

  const recommendStats: CSSProperties = {
    display: 'flex',
    gap: 8,
    fontSize: 12,
    color: '#FFFFFF',
  };

  return (
    <div style={container}>
      {/* Sidebar */}
      <aside style={sidebar}></aside>

      {/* Main Content */}
      <div style={mainContent}>
        {/* Top Bar */}
        <header style={topBar}>
          <div style={profileIcon}></div>
          <div style={userName}>게스트12</div>
          <div style={authButtons}>
            <Link href="/signup" style={{...authButton, border: '2px solid #0B1B31'}}>
              회원가입
            </Link>
            <Link href="/login" style={{...authButton, background: '#0B1B31'}}>
              로그인
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <div style={contentArea}>
          {/* Left Column */}
          <div style={leftColumn}>
            <div style={sectionBox}>
              <div style={searchText}>검색어를 입력하세요</div>
            </div>
            <div style={sectionBox}>
              <div style={sectionTitle}>인기글</div>
            </div>
            <div style={popularBox}>
              {/* Popular content placeholder */}
            </div>
            <div style={{...sectionBox, marginTop: 284, borderRadius: '3px 3px 0 0'}}>
              <div style={sectionTitle}>상황 유형</div>
            </div>
            <div style={popularBox}>
              {/* Category content placeholder */}
            </div>
          </div>

          {/* Middle Column */}
          <div style={middleColumn}>
            <h1 style={pageTitle}>당신의 아이디어를 공유하세요</h1>
            <div style={searchBox}>
              <div style={searchText}>검색어를 입력하세요</div>
            </div>

            {/* Posts */}
            {posts.map((post) => (
              <div key={post.id} style={postCard}>
                <div style={categoryBadge}>{post.category}</div>
                <div style={postTitle}>{post.title}</div>
                <div style={postContent}>{post.content}</div>
                <div style={postStats}>
                  <span>👁 {post.views}</span>
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div style={rightColumn}>
            <div style={myPageBox}>
              <span style={{fontSize: 20}}>👤</span>
              <div style={myPageText}>마이 페이지</div>
            </div>
            <div style={recommendBox}>
              <div style={{...sectionTitle, color: '#C1C5CC'}}>추천글</div>
            </div>
            <div style={recommendList}>
              <div style={recommendItem}>
                <div style={recommendCategory}>회사</div>
                <div style={recommendTitle}>회사 상사가 너무 짜증나게 굴때</div>
                <div style={recommendStats}>
                  <span>👁 65</span>
                  <span>❤️ 13</span>
                  <span>💬 32</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}