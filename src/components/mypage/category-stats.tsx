'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { categoryThemes, type HobbyCategory } from '@/lib/category-theme';

interface CategoryStatsProps {
  stats: Record<string, number>;
  totalCount: number;
}

function DonutChart({
  segments,
}: {
  segments: { label: string; value: number; color: string; emoji: string }[];
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  if (total === 0) return null;

  let cumulative = 0;
  const gradientParts = segments
    .filter((s) => s.value > 0)
    .map((segment) => {
      const percent = (segment.value / total) * 100;
      const start = cumulative;
      cumulative += percent;
      return `${segment.color} ${start}% ${cumulative}%`;
    });

  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div
        className="relative w-44 h-44 rounded-full shrink-0"
        style={{
          background: `conic-gradient(${gradientParts.join(', ')})`,
        }}
      >
        <div className="absolute inset-4 rounded-full bg-white flex flex-col items-center justify-center shadow-inner">
          <span className="text-3xl font-bold text-brand-primary">{total}</span>
          <span className="text-xs text-ink-muted">북마크</span>
        </div>
      </div>
      <ul className="space-y-3 flex-1 w-full">
        {segments.map((segment) => (
          <li key={segment.label} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-sm font-medium text-ink">
                {segment.emoji} {segment.label}
              </span>
            </div>
            <span className="text-sm text-ink-muted">
              {segment.value}개 ({total > 0 ? Math.round((segment.value / total) * 100) : 0}%)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CategoryStats({ stats, totalCount }: CategoryStatsProps) {
  const segments = (Object.keys(categoryThemes) as HobbyCategory[]).map((key) => ({
    label: categoryThemes[key].label,
    emoji: categoryThemes[key].emoji,
    value: stats[key] || 0,
    color: categoryThemes[key].ring,
  }));

  const topCategory = [...segments].sort((a, b) => b.value - a.value)[0];

  if (totalCount === 0) {
    return (
      <Card className="rounded-2xl border-line">
        <CardContent className="text-center py-16">
          <p className="text-5xl mb-4">📊</p>
          <h3 className="text-xl font-semibold text-ink mb-2">아직 데이터가 없어요</h3>
          <p className="text-ink-muted">취미를 북마크하면 취향 분포가 여기에 그려집니다.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border-line overflow-hidden">
        <CardHeader>
          <CardTitle className="text-ink">취향 분포</CardTitle>
          <CardDescription>카테고리별 북마크 비율을 한눈에 확인하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <DonutChart segments={segments} />
        </CardContent>
      </Card>

      {topCategory && topCategory.value > 0 && (
        <Card className="rounded-2xl border-line bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5">
          <CardContent className="p-6 flex items-center gap-4">
            <span className="text-4xl">{topCategory.emoji}</span>
            <div>
              <p className="text-sm text-ink-muted mb-1">나의 취향 TOP</p>
              <p className="font-semibold text-ink text-lg">
                {topCategory.label} 취미를 가장 많이 담았어요
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
