'use client';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { categoryThemes, type HobbyCategory } from '@/lib/category-theme';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  enableNavigation?: boolean;
}

const categories = [
  { id: 'all', name: '전체', emoji: '✨' },
  { id: 'sports', name: '운동형', emoji: categoryThemes.sports.emoji },
  { id: 'intelligence', name: '지능형', emoji: categoryThemes.intelligence.emoji },
  { id: 'art', name: '예술형', emoji: categoryThemes.art.emoji },
];

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  enableNavigation = false,
}: CategoryFilterProps) {
  const router = useRouter();

  const handleCategoryClick = (categoryId: string) => {
    if (enableNavigation) {
      router.push(categoryId === 'all' ? '/' : `/category/${categoryId}`);
    } else {
      onCategoryChange(categoryId);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => {
        const isActive = selectedCategory === category.id;
        const theme =
          category.id !== 'all'
            ? categoryThemes[category.id as HobbyCategory]
            : null;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => handleCategoryClick(category.id)}
            className={cn(
              'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200',
              isActive
                ? 'bg-brand-primary text-white border-brand-primary shadow-md shadow-brand-primary/20'
                : theme
                  ? `${theme.chip} hover:scale-105`
                  : 'bg-white border-line text-ink-muted hover:border-brand-primary/30'
            )}
          >
            <span>{category.emoji}</span>
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
