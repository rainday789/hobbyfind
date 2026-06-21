'use client';

import { useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Topbar } from '@/components/layout/topbar';
import { HeroSection } from '@/components/layout/hero-section';
import { SiteFooter } from '@/components/layout/site-footer';
import { CategoryFilter } from '@/components/hobby/category-filter';
import { HobbyGrid } from '@/components/hobby/hobby-grid';
import { HobbyToolbar, type SortOption } from '@/components/hobby/hobby-toolbar';
import { RecommendationRow } from '@/components/hobby/recommendation-row';
import { HobbyCarousel } from '@/components/hobby/hobby-carousel';
import { hobbies } from '@/lib/data/hobbies';
import {
  getPersonalizedSubtitle,
  getPersonalizedTitle,
  recommendationSections,
} from '@/lib/recommendation-copy';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const todayPicks = useMemo(() => hobbies.slice(0, 6), []);
  const sportsPicks = useMemo(
    () => hobbies.filter((h) => h.category === 'sports').slice(0, 6),
    []
  );
  const intelligencePicks = useMemo(
    () => hobbies.filter((h) => h.category === 'intelligence').slice(0, 6),
    []
  );
  const artPicks = useMemo(
    () => hobbies.filter((h) => h.category === 'art').slice(0, 6),
    []
  );

  const resultCount = useMemo(() => {
    let list =
      selectedCategory === 'all'
        ? hobbies
        : hobbies.filter((h) => h.category === selectedCategory);
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (h) =>
          h.title.toLowerCase().includes(q) ||
          h.description.toLowerCase().includes(q)
      );
    }
    return list.length;
  }, [selectedCategory, searchQuery]);

  const personalizedTitle = session
    ? getPersonalizedTitle(session.user?.name)
    : recommendationSections.today.title;

  const personalizedSubtitle = session
    ? getPersonalizedSubtitle(0)
    : recommendationSections.today.subtitle;

  return (
    <div className="min-h-screen flex flex-col pt-14">
      <Topbar />
      <HeroSection />

      <HobbyCarousel />

      <main className="flex-1">
        {/* 라프텔 스타일 가로 추천 행 */}
        <div id="recommendations" className="container mx-auto px-4 py-8">
          <RecommendationRow
            title={personalizedTitle}
            subtitle={personalizedSubtitle}
            hobbies={todayPicks}
          />
          <RecommendationRow
            title={recommendationSections.sports.title}
            subtitle={recommendationSections.sports.subtitle}
            hobbies={sportsPicks}
            viewAllHref="/category/sports"
          />
          <RecommendationRow
            title={recommendationSections.intelligence.title}
            subtitle={recommendationSections.intelligence.subtitle}
            hobbies={intelligencePicks}
            viewAllHref="/category/intelligence"
          />
          <RecommendationRow
            title={recommendationSections.art.title}
            subtitle={recommendationSections.art.subtitle}
            hobbies={artPicks}
            viewAllHref="/category/art"
          />
        </div>

        {/* 가이드 필수: 카테고리 필터 + 그리드 탐색 */}
        <div id="hobbies" className="container mx-auto px-4 py-10 border-t border-line">
          <div className="mb-8">
            <h2 className="laftel-section-title mb-2">
              <span className="laftel-section-bar" />
              전체 취미 탐색
            </h2>
            <p className="text-ink-muted text-sm ml-3">
              운동형 · 지능형 · 예술형 필터로 18가지 취미를 찾아보세요
            </p>
          </div>

          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="mt-6">
            <HobbyToolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortOption={sortOption}
              onSortChange={setSortOption}
              resultCount={resultCount}
            />
            <HobbyGrid
              hobbies={hobbies}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              sortOption={sortOption}
            />
          </div>
        </div>
      </main>

      <SiteFooter />
      <Toaster />
    </div>
  );
}
