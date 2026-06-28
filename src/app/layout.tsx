import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import { AuthProvider } from '@/components/auth/auth-provider';

export const metadata: Metadata = {
  title: 'HobbyFind - 취미 추천 · 북마크',
  description:
    '운동형, 지능형, 예술형 취미를 추천하고 북마크로 관리하세요. 로그인 후 마이페이지에서 카테고리별 통계를 확인할 수 있습니다.',
  keywords: '취미, 취미 추천, 운동형, 지능형, 예술형, 북마크, HobbyFind',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <Providers><AuthProvider>{children}</AuthProvider></Providers>
      </body>
    </html>
  );
}
