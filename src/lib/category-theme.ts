export type HobbyCategory = 'sports' | 'intelligence' | 'art';

/** design.md §1.4 — 카테고리 보조 색상 */
export const categoryThemes: Record<
  HobbyCategory,
  { label: string; emoji: string; chip: string; badge: string; gradient: string; ring: string }
> = {
  sports: {
    label: '운동형',
    emoji: '🏃',
    chip: 'bg-rose-50 text-rose-700 border-rose-100',
    badge: 'bg-rose-700 text-white',
    gradient: 'bg-rose-700',
    ring: '#BE123C',
  },
  intelligence: {
    label: '지능형',
    emoji: '🧩',
    chip: 'bg-teal-50 text-teal-700 border-teal-100',
    badge: 'bg-brand-teal text-white',
    gradient: 'bg-brand-teal',
    ring: '#008489',
  },
  art: {
    label: '예술형',
    emoji: '🎨',
    chip: 'bg-amber-50 text-amber-800 border-amber-100',
    badge: 'bg-amber-700 text-white',
    gradient: 'bg-amber-700',
    ring: '#B45309',
  },
};

export function getCategoryTheme(category: string) {
  return categoryThemes[category as HobbyCategory];
}
