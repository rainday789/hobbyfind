import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { AuthProvider } from '@/components/auth/auth-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers><AuthProvider>{children}</AuthProvider></Providers>
      </body>
    </html>
  );
}
