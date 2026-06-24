export type HobbyCategory = 'sports' | 'intelligence' | 'art';

/** Sky + Amber + Indigo — 하늘색 UI에서 흔한 보조색 3분할 */
export const categoryThemes: Record<
  HobbyCategory,
  { label: string; emoji: string; chip: string; badge: string; gradient: string; ring: string }
> = {
  sports: {
    label: '운동형',
    emoji: '🏃',
    chip: 'bg-amber-100 text-amber-800 border-amber-200',
    badge: 'bg-amber-500 text-white',
    gradient: 'bg-amber-500',
    ring: '#F59E0B',
  },
  intelligence: {
    label: '지능형',
    emoji: '🧩',
    chip: 'bg-sky-100 text-sky-800 border-sky-200',
    badge: 'bg-sky-600 text-white',
    gradient: 'bg-sky-600',
    ring: '#0284C7',
  },
  art: {
    label: '예술형',
    emoji: '🎨',
    chip: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    badge: 'bg-indigo-500 text-white',
    gradient: 'bg-indigo-500',
    ring: '#6366F1',
  },
};

export function getCategoryTheme(category: string) {
  return categoryThemes[category as HobbyCategory];
}
