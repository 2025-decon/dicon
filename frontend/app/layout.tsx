// app/layout.tsx
import React from 'react';
import './globals.css'; // 👈🔥 이 줄을 추가해!

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children} {/* page.tsx 파일이 이 children으로 들어옴 */}
      </body>
    </html>
  );
}