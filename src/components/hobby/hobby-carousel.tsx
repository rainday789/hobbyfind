'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { hobbies, type Hobby } from '@/lib/data/hobbies';
import {
  getCarouselSlideCopy,
  shuffleHobbies,
  type CarouselSlideCopy,
} from '@/lib/recommendation-copy';
import { getCategoryTheme } from '@/lib/category-theme';
import { cn } from '@/lib/utils';

const SLIDE_COUNT = 5;
const AUTO_PLAY_MS = 5000;

type Slide = Hobby & { copy: CarouselSlideCopy };

export function HobbyCarousel() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const usedCopyKeys = new Set<string>();
    const picked = shuffleHobbies(hobbies, SLIDE_COUNT).map((hobby) => ({
      ...hobby,
      copy: getCarouselSlideCopy(hobby, usedCopyKeys),
    }));
    setSlides(picked);
    setIndex(0);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (slides.length === 0) return;
      setIndex((next + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  const current = slides[index];

  if (slides.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="h-48 md:h-72 rounded-2xl bg-brand-purple-light animate-pulse" />
      </div>
    );
  }

  return (
    <section
      className="container mx-auto px-4 py-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="오늘의 추천 취미 슬라이드"
    >
      <div className="relative overflow-hidden rounded-2xl bg-ink shadow-lg shadow-brand-primary/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="relative aspect-[16/7] md:aspect-[16/6] min-h-[200px] md:min-h-[280px]"
          >
            <Image
              src={current.imageUrl}
              alt={current.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            {/* 하단만 살짝 어둡게 — 텍스트 가독용 */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8">
              <span
                className={cn(
                  'inline-flex self-start text-[11px] md:text-xs font-bold px-2.5 py-1 rounded-md mb-3',
                  getCategoryTheme(current.category)?.badge
                )}
              >
                {getCategoryTheme(current.category)?.emoji}{' '}
                {getCategoryTheme(current.category)?.label}
              </span>
              <p className="text-white text-lg md:text-2xl font-bold mb-2 drop-shadow-sm">
                {current.copy.headline}
              </p>
              <p className="text-white/90 text-sm md:text-base font-medium mb-4 drop-shadow-sm max-w-xl">
                {current.copy.tagline}
              </p>
              <Link
                href={`#hobby-${current.id}`}
                className="inline-flex items-center gap-1 self-start text-sm font-semibold text-white bg-brand-primary hover:bg-brand-primary/90 px-4 py-2 rounded-lg transition-colors"
              >
                {current.copy.cta}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/35 text-white hover:bg-black/50 backdrop-blur-sm flex items-center justify-center"
              aria-label="이전 슬라이드"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/35 text-white hover:bg-black/50 backdrop-blur-sm flex items-center justify-center"
              aria-label="다음 슬라이드"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`${i + 1}번째 슬라이드`}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    i === index
                      ? 'w-6 bg-brand-primary'
                      : 'w-1.5 bg-white/50 hover:bg-white/80'
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
