"use client";

import Link from "next/link";
import Image from "next/image";
import React, { CSSProperties } from "react";

export default function ContextPage() {
  const container: CSSProperties = {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    background: '#051225',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: "'Noto Sans KR', Arial, sans-serif",
  };

  const topBar: CSSProperties = {
    width: '100%',
    borderBottom: '3px solid #1F2C49',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    alignItems: 'center',
    padding: '20px 40px',
    boxSizing: 'border-box',
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

  const logoContainer: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginRight: 'auto',
  };

  const logoBg: CSSProperties = {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const logoText: CSSProperties = {
    fontWeight: 700,
    fontSize: 36,
    color: 'rgba(193, 197, 204, 0.8)',
  };

  const mainContent: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1200,
    padding: '80px 40px',
    boxSizing: 'border-box',
  };

  const title: CSSProperties = {
    fontWeight: 700,
    fontSize: 58,
    lineHeight: '70px',
    color: '#FFFFFF',
    marginBottom: 60,
    textAlign: 'center',
  };

  const textareaBox: CSSProperties = {
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: 905,
    height: 180,
    background: '#051225',
    border: '1px solid #1F2C49',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  };

  const textarea: CSSProperties = {
    width: '100%',
    height: '100%',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    fontFamily: "'Noto Sans KR', Arial, sans-serif",
    fontWeight: 700,
    fontSize: 26,
    lineHeight: '31px',
    color: 'rgba(193, 197, 204, 0.35)',
    resize: 'none',
  };

  const actionButtons: CSSProperties = {
    display: 'flex',
    gap: 9,
    marginBottom: 10,
    width: '100%',
    maxWidth: 905,
  };

  const actionButton: CSSProperties = {
    boxSizing: 'border-box',
    width: 63,
    height: 33,
    border: '2px solid #17263C',
    borderRadius: 10,
    background: 'transparent',
    fontFamily: "'Noto Sans KR', Arial, sans-serif",
    fontWeight: 700,
    fontSize: 20,
    color: 'rgba(193, 197, 204, 0.35)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const sendButtonContainer: CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    maxWidth: 905,
    marginBottom: 40,
  };

  const sendButton: CSSProperties = {
    width: 35,
    height: 35,
    background: 'rgba(33, 53, 79, 0.3)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: 'none',
  };

  const bottomButtons: CSSProperties = {
    display: 'flex',
    gap: 24,
    width: '100%',
    maxWidth: 905,
  };

  const primaryButton: CSSProperties = {
    flex: 1,
    height: 50,
    background: '#33BEA1',
    borderRadius: 20,
    border: 'none',
    fontFamily: "'Noto Sans KR', Arial, sans-serif",
    fontWeight: 700,
    fontSize: 32,
    color: '#FFFFFF',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={container}>
      {/* Top Bar */}
      <header style={topBar}>
        <div style={logoContainer}>
          <div style={logoBg}>
            <Image
              src="/logo.svg"
              alt="Promty Logo"
              width={23}
              height={32}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div style={logoText}>Promty</div>
        </div>
        <div style={profileIcon}></div>
        <div style={userName}>게스트12</div>
      </header>

      {/* Main Content */}
      <main style={mainContent}>
        <h1 style={title}>상황을 설명해주세요</h1>

        {/* Textarea */}
        <div style={textareaBox}>
          <textarea
            placeholder="당신이 처한 상황을 설명해주세요."
            style={textarea}
          />
        </div>

        {/* Action Buttons (수정/복사) */}
        <div style={actionButtons}>
          <button style={actionButton}>수정</button>
          <button style={actionButton}>복사</button>
        </div>

        {/* Send Button */}
        <div style={sendButtonContainer}>
          <button style={sendButton}>
            <span style={{ 
              fontSize: 20, 
              transform: 'rotate(-90deg)', 
              color: 'rgba(154, 154, 154, 0.5)' 
            }}>
              ^
            </span>
          </button>
        </div>

        {/* Bottom Buttons */}
        <div style={bottomButtons}>
          <button style={primaryButton}>프롬프트 만들기</button>
        </div>
      </main>
    </div>
  );
}