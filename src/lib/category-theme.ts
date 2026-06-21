export type HobbyCategory = 'sports' | 'intelligence' | 'art';

/** 라프텔 톤: 퍼플 베이스 + 카테고리별 포인트 */
export const categoryThemes: Record<
  HobbyCategory,
  { label: string; emoji: string; chip: string; badge: string; gradient: string; ring: string }
> = {
  sports: {
    label: '운동형',
    emoji: '🏃',
    chip: 'bg-[#816BFF]/10 text-[#816BFF] border-[#816BFF]/20',
    badge: 'bg-[#816BFF] text-white',
    gradient: 'from-[#816BFF]/90 to-[#A78BFA]/80',
    ring: '#816BFF',
  },
  intelligence: {
    label: '지능형',
    emoji: '🧩',
    chip: 'bg-[#5B8DEF]/10 text-[#5B8DEF] border-[#5B8DEF]/20',
    badge: 'bg-[#5B8DEF] text-white',
    gradient: 'from-[#5B8DEF]/90 to-[#816BFF]/70',
    ring: '#5B8DEF',
  },
  art: {
    label: '예술형',
    emoji: '🎨',
    chip: 'bg-[#FF6B9D]/10 text-[#FF6B9D] border-[#FF6B9D]/20',
    badge: 'bg-[#FF6B9D] text-white',
    gradient: 'from-[#FF6B9D]/90 to-[#816BFF]/70',
    ring: '#FF6B9D',
  },
};

export function getCategoryTheme(category: string) {
  return categoryThemes[category as HobbyCategory];
}
