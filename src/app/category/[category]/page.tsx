'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Topbar } from '@/components/layout/topbar';
import { SiteFooter } from '@/components/layout/site-footer';
import { HobbyGrid } from '@/components/hobby/hobby-grid';
import { HobbyToolbar, type SortOption } from '@/components/hobby/hobby-toolbar';
import { RecommendationRow } from '@/components/hobby/recommendation-row';
import { CategoryFilter } from '@/components/hobby/category-filter';
import { getHobbiesByCategory } from '@/lib/data/hobbies';
import { categoryThemes, type HobbyCategory } from '@/lib/category-theme';
import { getCategoryRecommendLine } from '@/lib/recommendation-copy';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const theme = categoryThemes[category as HobbyCategory];

  if (!theme) {
    return (
      <div className="min-h-screen flex flex-col pt-14">
        <Topbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-5xl mb-4">😅</p>
            <h1 className="text-xl font-bold text-ink mb-2">페이지를 찾을 수 없어요</h1>
            <Button asChild className="rounded-full bg-brand-primary">
              <Link href="/">홈으로</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const categoryHobbies = getHobbiesByCategory(category);
  const filteredCount = categoryHobbies.filter((h) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return h.title.toLowerCase().includes(q) || h.description.toLowerCase().includes(q);
  }).length;

  return (
    <div className="min-h-screen flex flex-col pt-14">
      <Topbar />

      <section className="bg-white border-b border-line">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-ink-muted hover:text-brand-primary mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            홈
          </Link>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-4xl mb-2 block">{theme.emoji}</span>
            <h1 className="text-2xl md:text-3xl font-bold text-ink mb-1">
              {theme.label} 취미
            </h1>
            <p className="text-brand-primary font-medium text-sm mb-1">
              {getCategoryRecommendLine(category as HobbyCategory)}
            </p>
            <p className="text-ink-muted">
              총 {categoryHobbies.length}개 · 로그인 후 북마크 가능
            </p>
          </motion.div>
        </div>
      </section>

      <main className="flex-1 pb-10">
        <div className="container mx-auto px-4 py-8">
          <RecommendationRow
            title={`${theme.label} PICK`}
            subtitle="이 카테고리에서 가장 많이 담기는 취미예요"
            hobbies={categoryHobbies.slice(0, 5)}
          />

          <div className="border-t border-line pt-8 mt-4">
            <h2 className="laftel-section-title mb-4">
              <span className="laftel-section-bar" />
              {theme.label} 전체 보기
            </h2>
            <CategoryFilter
              selectedCategory={category}
              onCategoryChange={() => {}}
              enableNavigation
            />
            <div className="mt-6">
              <HobbyToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortOption={sortOption}
                onSortChange={setSortOption}
                resultCount={filteredCount}
              />
              <HobbyGrid
                hobbies={categoryHobbies}
                selectedCategory={category}
                searchQuery={searchQuery}
                sortOption={sortOption}
              />
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      <Toaster />
    </div>
  );
}
