'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { HobbyCard } from './hobby-card';

interface Hobby {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'sports' | 'intelligence' | 'art';
}

interface RecommendationRowProps {
  title: string;
  subtitle?: string;
  hobbies: Hobby[];
  viewAllHref?: string;
}

export function RecommendationRow({
  title,
  subtitle,
  hobbies,
  viewAllHref,
}: RecommendationRowProps) {
  if (hobbies.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="flex items-end justify-between mb-4 px-1">
        <div>
          <h2 className="laftel-section-title">
            <span className="laftel-section-bar" />
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-ink-muted mt-1 ml-3">{subtitle}</p>
          )}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-sm text-brand-primary font-medium flex items-center hover:underline shrink-0"
          >
            전체보기
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
        {hobbies.map((hobby, index) => (
          <div key={hobby.id} className="w-[160px] sm:w-[180px] shrink-0">
            <HobbyCard {...hobby} index={index} variant="poster" />
          </div>
        ))}
      </div>
    </section>
  );
}
