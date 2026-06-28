'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, ArrowUpDown } from 'lucide-react';

export type SortOption = 'default' | 'name-asc' | 'name-desc';

interface HobbyToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortOption: SortOption;
  onSortChange: (value: SortOption) => void;
  resultCount: number;
}

export function HobbyToolbar({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  resultCount,
}: HobbyToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 p-4 rounded-xl summer-panel">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="취미 이름·설명으로 검색..."
          className="pl-10 rounded-xl border-border-gray bg-white focus-visible:ring-brand-primary"
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-ink-muted whitespace-nowrap">
          {resultCount}개 표시
        </span>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-ink-muted hidden sm:block" />
          <Select value={sortOption} onValueChange={(v) => onSortChange(v as SortOption)}>
            <SelectTrigger className="w-[140px] rounded-xl border-border-gray">
              <SelectValue placeholder="정렬" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">추천 순</SelectItem>
              <SelectItem value="name-asc">이름 ↑</SelectItem>
              <SelectItem value="name-desc">이름 ↓</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
