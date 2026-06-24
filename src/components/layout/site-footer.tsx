import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-sky-200 bg-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center">
              <span className="text-white font-black text-sm">H</span>
            </div>
            <div>
              <p className="font-bold text-ink">HobbyFind</p>
              <p className="text-xs text-ink-muted">취미 추천 · 북마크 · 통계</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-4 text-sm text-ink-muted">
            <Link href="/" className="hover:text-brand-primary transition-colors">홈</Link>
            <Link href="/category/sports" className="hover:text-brand-primary transition-colors">운동형</Link>
            <Link href="/category/intelligence" className="hover:text-brand-primary transition-colors">지능형</Link>
            <Link href="/category/art" className="hover:text-brand-primary transition-colors">예술형</Link>
            <Link href="/login" className="hover:text-brand-primary transition-colors">로그인</Link>
            <Link href="/mypage" className="hover:text-brand-primary transition-colors">마이페이지</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
