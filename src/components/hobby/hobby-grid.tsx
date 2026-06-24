'use client';

import { HobbyCard } from './hobby-card';
import type { SortOption } from './hobby-toolbar';

interface Hobby {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'sports' | 'intelligence' | 'art';
}

interface HobbyGridProps {
  hobbies: Hobby[];
  selectedCategory: string;
  searchQuery?: string;
  sortOption?: SortOption;
  onBookmarkToggle?: (id: string, isBookmarked: boolean) => void;
}

function filterAndSort(
  hobbies: Hobby[],
  selectedCategory: string,
  searchQuery: string,
  sortOption: SortOption
) {
  let result =
    selectedCategory === 'all'
      ? hobbies
      : hobbies.filter((h) => h.category === selectedCategory);

  const query = searchQuery.trim().toLowerCase();
  if (query) {
    result = result.filter(
      (h) =>
        h.title.toLowerCase().includes(query) ||
        h.description.toLowerCase().includes(query)
    );
  }

  if (sortOption === 'name-asc') {
    result = [...result].sort((a, b) => a.title.localeCompare(b.title, 'ko'));
  } else if (sortOption === 'name-desc') {
    result = [...result].sort((a, b) => b.title.localeCompare(a.title, 'ko'));
  }

  return result;
}

export function HobbyGrid({
  hobbies,
  selectedCategory,
  searchQuery = '',
  sortOption = 'default',
  onBookmarkToggle,
}: HobbyGridProps) {
  const filteredHobbies = filterAndSort(
    hobbies,
    selectedCategory,
    searchQuery,
    sortOption
  );

  if (filteredHobbies.length === 0) {
    return (
      <div className="text-center py-16 rounded-2xl summer-panel border-dashed">
        <p className="text-4xl mb-4">🔍</p>
        <h3 className="text-lg font-semibold text-ink mb-2">
          {searchQuery ? '검색 결과가 없어요' : '표시할 취미가 없어요'}
        </h3>
        <p className="text-ink-muted text-sm">
          {searchQuery
            ? '다른 키워드로 검색하거나 필터를 바꿔보세요.'
            : '카테고리 필터를 조정해보세요.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {filteredHobbies.map((hobby, index) => (
        <HobbyCard
          key={hobby.id}
          {...hobby}
          index={index}
          onBookmarkToggle={onBookmarkToggle}
        />
      ))}
    </div>
  );
}
