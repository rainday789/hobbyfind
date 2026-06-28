import Link from 'next/link';
import { Topbar } from '@/components/layout/topbar';
import { Button } from '@/components/ui/button';

export default function HobbyNotFound() {
  return (
    <div className="min-h-screen flex flex-col pt-14">
      <Topbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-5xl mb-4">🔍</p>
          <h1 className="text-xl font-bold text-ink mb-2">취미를 찾을 수 없어요</h1>
          <p className="text-ink-muted mb-6">요청하신 취미 페이지가 존재하지 않습니다.</p>
          <Button asChild className="rounded-full bg-brand-primary hover:bg-[#E31C5F] text-white">
            <Link href="/">홈으로</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
