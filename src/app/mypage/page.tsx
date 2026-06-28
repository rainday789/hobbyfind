'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Topbar } from '@/components/layout/topbar';
import { BookmarkedHobbyGrid } from '@/components/mypage/bookmarked-hobby-grid';
import { CategoryStats } from '@/components/mypage/category-stats';
import { UserProfile } from '@/components/mypage/user-profile';
import { Card, CardContent } from '@/components/ui/card';
import { Bookmark } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { BookmarkedHobby } from '@/lib/bookmark-utils';

export default function MyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [bookmarkedHobbies, setBookmarkedHobbies] = useState<BookmarkedHobby[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [totalCount, setTotalCount] = useState(0);

  const loadBookmarkData = async () => {
    if (!session?.user?.id) return;

    setIsLoading(true);
    try {
      const [bookmarksResponse, statsResponse] = await Promise.all([
        fetch('/api/bookmarks'),
        fetch('/api/bookmarks/stats'),
      ]);

      if (bookmarksResponse.ok) {
        const bookmarksData = await bookmarksResponse.json();
        setBookmarkedHobbies(bookmarksData.data);
      }

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.data.stats);
        setTotalCount(statsData.data.totalCount);
      }
    } catch {
      toast({
        title: '데이터 로드 실패',
        description: '북마크 데이터를 불러올 수 없습니다.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/login?callbackUrl=/mypage');
    } else {
      loadBookmarkData();
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-neutral-light">
        <Topbar />
        <div className="pt-20 pb-8">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleBookmarkRemove = async (hobbyId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/bookmarks/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hobbyId }),
      });

      if (response.ok) {
        setBookmarkedHobbies((prev) => prev.filter((hobby) => hobby.id !== hobbyId));
        setTotalCount((prev) => prev - 1);

        const updatedStats = { ...stats };
        const removedHobby = bookmarkedHobbies.find((h) => h.id === hobbyId);
        if (removedHobby) {
          updatedStats[removedHobby.category] = Math.max(
            0,
            (updatedStats[removedHobby.category] || 0) - 1,
          );
          setStats(updatedStats);
        }

        toast({
          title: '북마크 제거됨',
          description: '북마크에서 제거했습니다.',
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      toast({
        title: '오류가 발생했습니다',
        description:
          error instanceof Error ? error.message : '북마크를 제거할 수 없습니다. 다시 시도해주세요.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-14">
      <Topbar />

      <main className="flex-1 pb-10">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <p className="text-xs font-bold text-brand-primary mb-1">MY PAGE</p>
            <h1 className="text-2xl md:text-3xl font-bold text-ink mb-2">
              {session.user?.name || '회원'}님의 찜 목록
            </h1>
            <p className="text-ink-muted text-sm">
              북마크한 취미와 카테고리별 통계를 확인하세요
            </p>
          </div>

          <div className="mb-8">
            <UserProfile user={session.user} bookmarkCount={totalCount} />
          </div>

          {/* Design §3.5 — Desktop 2/3 북마크 + 1/3 차트, Mobile 세로 스택 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-brand-primary" />
                북마크 ({bookmarkedHobbies.length})
              </h2>
              {bookmarkedHobbies.length === 0 ? (
                <Card className="rounded-2xl summer-panel">
                  <CardContent className="text-center py-12">
                    <Bookmark className="w-16 h-16 text-ink-muted mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-ink mb-2">
                      아직 찜한 취미가 없어요
                    </h3>
                    <p className="text-ink-muted mb-4">
                      홈에서 추천 취미를 둘러보고 마음에 드는 활동을 담아보세요.
                    </p>
                    <button
                      onClick={() => router.push('/#recommendations')}
                      className="bg-brand-primary hover:bg-[#E31C5F] text-white px-6 py-2 rounded-full font-medium"
                    >
                      취미 탐색하기
                    </button>
                  </CardContent>
                </Card>
              ) : (
                <BookmarkedHobbyGrid
                  hobbies={bookmarkedHobbies}
                  onBookmarkRemove={handleBookmarkRemove}
                  isLoading={isLoading}
                />
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-ink lg:sr-only">취향 통계</h2>
              <CategoryStats stats={stats} totalCount={totalCount} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
