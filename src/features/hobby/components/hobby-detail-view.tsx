'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ArrowLeft, Bookmark, CheckCircle2, Heart, Sparkles, Users } from 'lucide-react';
import { Topbar } from '@/components/layout/topbar';
import { SiteFooter } from '@/components/layout/site-footer';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { getCategoryTheme } from '@/lib/category-theme';
import type { Hobby } from '@/lib/data/hobbies';
import {
  getDifficultyColor,
  type HobbyDetail,
} from '@/lib/data/hobby-details';
import { HobbyCard } from '@/components/hobby/hobby-card';

interface HobbyDetailViewProps {
  hobby: Hobby;
  detail: HobbyDetail;
  relatedHobbies: Hobby[];
}

export function HobbyDetailView({ hobby, detail, relatedHobbies }: HobbyDetailViewProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [bookmarked, setBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const theme = getCategoryTheme(hobby.category);

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!session?.user?.id) return;
      try {
        const response = await fetch(`/api/bookmarks/check?hobbyId=${hobby.id}`);
        if (response.ok) {
          const data = await response.json();
          setBookmarked(data.isBookmarked);
        }
      } catch {
        // ignore
      }
    };
    checkBookmarkStatus();
  }, [hobby.id, session?.user?.id]);

  const handleBookmarkToggle = async () => {
    if (!session) {
      toast({
        title: '로그인이 필요해요',
        description: '북마크는 로그인 후 이용할 수 있어요.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/bookmarks/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hobbyId: hobby.id }),
      });

      if (response.ok) {
        const data = await response.json();
        setBookmarked(data.isBookmarked);
        toast({
          title: data.isBookmarked ? '찜 목록에 담았어요' : '찜에서 뺐어요',
          description: data.message,
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      toast({
        title: '잠시 문제가 생겼어요',
        description: error instanceof Error ? error.message : '다시 시도해주세요.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-14">
      <Topbar />

      <main className="flex-1">
        <section className="summer-section">
          <div className="container mx-auto px-4 py-6">
            <Link
              href={`/category/${hobby.category}`}
              className="inline-flex items-center text-sm text-ink-muted hover:text-sky-700 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              {theme?.label} 목록
            </Link>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-sky-200 bg-white">
                <Image
                  src={hobby.imageUrl}
                  alt={hobby.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${theme?.badge}`}>
                    {theme?.emoji} {theme?.label}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getDifficultyColor(detail.difficulty)}`}>
                    난이도 {detail.difficulty}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">{hobby.title}</h1>
                <p className="text-lg text-ink-muted leading-relaxed mb-4">{hobby.description}</p>
                <p className="text-sky-800 font-medium mb-6 flex items-start gap-2">
                  <Sparkles className="w-5 h-5 shrink-0 mt-0.5" />
                  {detail.highlight}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleBookmarkToggle}
                    disabled={isLoading}
                    className="rounded-full bg-sky-600 hover:bg-sky-700 text-white"
                  >
                    {bookmarked ? (
                      <>
                        <Heart className="w-4 h-4 mr-2 fill-current" />
                        찜 해제
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4 mr-2" />
                        찜하기
                      </>
                    )}
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-sky-300 text-sky-700 hover:bg-sky-50">
                    <Link href="/">다른 추천 보기</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10">
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="summer-panel rounded-2xl p-6">
              <h2 className="text-lg font-bold text-ink mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-600" />
                이런 분께 추천
              </h2>
              <p className="text-ink-muted leading-relaxed">{detail.recommendFor}</p>
            </div>

            <div className="summer-panel rounded-2xl p-6">
              <h2 className="text-lg font-bold text-ink mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-sky-600" />
                시작 팁
              </h2>
              <ul className="space-y-2">
                {detail.starterTips.map((tip) => (
                  <li key={tip} className="text-ink-muted text-sm leading-relaxed flex gap-2">
                    <span className="text-sky-600 shrink-0">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {relatedHobbies.length > 0 && (
            <div>
              <h2 className="laftel-section-title mb-4">
                <span className="laftel-section-bar" />
                비슷한 {theme?.label} 취미
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedHobbies.map((related, index) => (
                  <HobbyCard key={related.id} {...related} index={index} variant="poster" />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
      <Toaster />
    </div>
  );
}
