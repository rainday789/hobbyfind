'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getCategoryTheme } from '@/lib/category-theme';
import { cn } from '@/lib/utils';

interface HobbyCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'sports' | 'intelligence' | 'art';
  index?: number;
  variant?: 'grid' | 'poster';
  isBookmarked?: boolean;
  onBookmarkToggle?: (id: string, isBookmarked: boolean) => void;
}

export function HobbyCard({
  id,
  title,
  description,
  imageUrl,
  category,
  index = 0,
  variant = 'grid',
  isBookmarked = false,
  onBookmarkToggle,
}: HobbyCardProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [isLoading, setIsLoading] = useState(false);
  const theme = getCategoryTheme(category);
  const isPoster = variant === 'poster';

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!session?.user?.id) return;
      try {
        const response = await fetch(`/api/bookmarks/check?hobbyId=${id}`);
        if (response.ok) {
          const data = await response.json();
          setBookmarked(data.isBookmarked);
        }
      } catch {
        // ignore
      }
    };
    checkBookmarkStatus();
  }, [id, session?.user?.id]);

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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
        body: JSON.stringify({ hobbyId: id }),
      });

      if (response.ok) {
        const data = await response.json();
        setBookmarked(data.isBookmarked);
        onBookmarkToggle?.(id, data.isBookmarked);
        toast({
          title: data.isBookmarked ? '찜 목록에 담았어요 💜' : '찜에서 뺐어요',
          description: data.message,
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      toast({
        title: '잠시 문제가 생겼어요',
        description:
          error instanceof Error ? error.message : '다시 시도해주세요.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.article
      id={`hobby-${id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className={cn(
        'group relative overflow-hidden bg-white transition-all duration-300 scroll-mt-24',
        isPoster
          ? 'rounded-xl shadow-sm hover:shadow-md'
          : 'rounded-2xl border border-sky-200 shadow-sm hover:shadow-md'
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          isPoster ? 'aspect-[3/4]' : 'aspect-[5/4]'
        )}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={isPoster ? '180px' : '(max-width: 768px) 100vw, 33vw'}
        />
        {/* 하단 텍스트 가독용 — 이미지 전체를 덮지 않음 */}
        {!isPoster && (
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/65 to-transparent pointer-events-none" />
        )}

        <span
          className={cn(
            'absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-md',
            theme?.badge
          )}
        >
          {theme?.label}
        </span>

        {session && (
          <button
            type="button"
            onClick={handleBookmarkClick}
            disabled={isLoading}
            aria-label={bookmarked ? '북마크 해제' : '북마크 추가'}
            className={cn(
              'absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm',
              bookmarked
                ? 'bg-brand-accent text-white'
                : 'bg-white/90 text-ink hover:bg-white'
            )}
          >
            {bookmarked ? (
              <Heart className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Bookmark className="w-3.5 h-3.5" />
            )}
          </button>
        )}

        {!isPoster && (
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="font-bold text-white leading-snug text-lg mb-1">
              {title}
            </h3>
            <p className="text-sm text-white/90 line-clamp-2">{description}</p>
          </div>
        )}
      </div>
      {isPoster && (
        <div className="px-2.5 py-2.5 border-t border-sky-200">
          <h3 className="text-sm font-bold text-ink line-clamp-1 mb-0.5">{title}</h3>
          <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
      )}
    </motion.article>
  );
}
