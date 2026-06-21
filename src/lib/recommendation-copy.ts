import type { HobbyCategory } from './category-theme';

export interface CarouselSlideCopy {
  headline: string;
  tagline: string;
  cta: string;
}

const carouselTaglines: Record<HobbyCategory, string[]> = {
  sports: [
    '몸을 움직이며 스트레스를 날려볼까요?',
    '오늘 에너지를 쓰기 딱 좋은 활동이에요.',
    '가볍게 시작해도 충분히 재미있어요.',
  ],
  intelligence: [
    '집중력이 올라가는 취미, 지금 만나보세요.',
    '호기심을 자극하는 오늘의 PICK이에요.',
    '생각이 즐거워지는 시간을 추천해요.',
  ],
  art: [
    '감성 충전, 오늘은 이 취미 어때요?',
    '만들고 표현하며 쉬어가는 시간.',
    '손끝에서 시작되는 작은 즐거움.',
  ],
};

export function getCarouselSlideCopy(hobby: {
  title: string;
  description: string;
  category: HobbyCategory;
}): CarouselSlideCopy {
  const pool = carouselTaglines[hobby.category];
  const tagline =
    pool[Math.floor(Math.random() * pool.length)] ??
    '오늘의 추천 취미, 지금 확인해보세요.';

  return {
    headline: `〈${hobby.title}〉 오늘의 추천 PICK`,
    tagline,
    cta: '취미 보러가기',
  };
}

/** Fisher–Yates shuffle */
export function shuffleHobbies<T>(items: T[], count: number): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}

export const recommendationSections: Record<
  HobbyCategory | 'today' | 'weekend',
  { title: string; subtitle: string }
> = {
  today: {
    title: '오늘의 추천 취미',
    subtitle: '지금 이 순간, 시작하기 좋은 취미만 골랐어요',
  },
  sports: {
    title: '몸이 심심할 때 추천',
    subtitle: '운동형 취미 — 에너지 UP이 필요한 당신에게',
  },
  intelligence: {
    title: '두뇌가 간질간질할 때 추천',
    subtitle: '지능형 취미 — 집중력과 호기심을 채워줄 PICK',
  },
  art: {
    title: '감성 충전이 필요할 때 추천',
    subtitle: '예술형 취미 — 표현하고 만들며 쉬는 시간',
  },
  weekend: {
    title: '주말에 딱인 취미',
    subtitle: '토·일에 시작하면 뿌듯한 활동 모음',
  },
};

export function getPersonalizedTitle(name?: string | null) {
  const display = name?.trim() || '당신';
  return `${display}님을 위한 추천`;
}

export function getPersonalizedSubtitle(bookmarkCount: number) {
  if (bookmarkCount === 0) {
    return '아직 담은 취미가 없네요. 오늘 첫 PICK을 골라볼까요?';
  }
  if (bookmarkCount < 3) {
    return '담아둔 취미 취향을 바탕으로, 비슷한 분위기의 취미를 추천해요';
  }
  return '취향 데이터가 쌓였어요. 다음 취미 후보를 확인해보세요';
}

export function getHeroCopy(isLoggedIn: boolean, name?: string | null) {
  if (isLoggedIn) {
    return {
      badge: '✨ 취향 큐레이션 ON',
      headline: `${name || '회원'}님,\n오늘은 어떤 취미가 끌리나요?`,
      description:
        '당신 취향에 맞는 취미를 골라드려요. 마음에 드는 활동은 북마크에 담아두세요.',
    };
  }
  return {
    badge: '🎯 취미 추천 · 북마크',
    headline: '취미 고를 때\n망설이지 마세요',
    description:
      '운동형·지능형·예술형 18가지 취미 중에서 오늘의 PICK을 만나보세요. 로그인하면 관심 취미를 저장하고 통계도 볼 수 있어요.',
  };
}

export function getCategoryRecommendLine(category: HobbyCategory) {
  const lines: Record<HobbyCategory, string> = {
    sports: '땀 흘리며 리프레시 — 운동형 취미 라인업',
    intelligence: '생각이 즐거워지는 — 지능형 취미 라인업',
    art: '만들고 표현하는 — 예술형 취미 라인업',
  };
  return lines[category];
}
