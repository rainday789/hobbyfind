import type { HobbyCategory } from './category-theme';
import type { Hobby } from './data/hobbies';

export interface CarouselSlideCopy {
  headline: string;
  tagline: string;
  cta: string;
}

/** {title} 자리에 취미 이름이 들어갑니다 */
const carouselHeadlineTemplates: Record<HobbyCategory, string[]> = {
  sports: [
    '〈{title}〉 오늘의 추천 PICK',
    '에너지 UP! 〈{title}〉',
    '〈{title}〉, 몸을 깨울 시간',
    '오늘의 운동 PICK — 〈{title}〉',
    '〈{title}〉 지금 시작해볼까요?',
    '땀 흘리며 리프레시, 〈{title}〉',
    '〈{title}〉 한 번 도전해요',
    '오늘 기분, 〈{title}〉으로 풀어볼까요?',
    '〈{title}〉 — 움직이면 기분이 달라져요',
    '스트레스 OUT, 〈{title}〉 IN',
    '〈{title}〉, 가볍게 시작해도 OK',
    '몸이 심심할 때 〈{title}〉',
    '이번 주 추천 운동 〈{title}〉',
    '〈{title}〉와 함께 체력 충전',
    '활력 필요할 때 〈{title}〉',
  ],
  intelligence: [
    '〈{title}〉 오늘의 추천 PICK',
    '두뇌를 깨울 〈{title}〉',
    '집중력 UP! 〈{title}〉',
    '호기심 충전 〈{title}〉',
    '오늘의 지능형 PICK — 〈{title}〉',
    '〈{title}〉, 생각이 즐거워져요',
    '지금 파헤쳐볼 〈{title}〉',
    '〈{title}〉 — 머리가 맑아지는 시간',
    '궁금증 풀어줄 〈{title}〉',
    '오늘의 두뇌 운동, 〈{title}〉',
    '〈{title}〉, 깊이 빠져들기 좋아요',
    '지적 호기심 자극 〈{title}〉',
    '한 단계 성장, 〈{title}〉',
    '〈{title}〉로 새로운 시각 열기',
    '생각하는 즐거움, 〈{title}〉',
  ],
  art: [
    '〈{title}〉 오늘의 추천 PICK',
    '감성 충전 〈{title}〉',
    '〈{title}〉, 표현하고 싶을 때',
    '손끝이 설레는 〈{title}〉',
    '오늘의 예술 PICK — 〈{title}〉',
    '〈{title}〉 지금 만나보세요',
    '만들며 쉬는 〈{title}〉',
    '〈{title}〉 — 마음을 담는 시간',
    '오늘의 감성 큐레이션 〈{title}〉',
    '창작 욕구, 〈{title}〉로 채워요',
    '〈{title}〉, 작은 작품 하나쯤',
    '색과 리듬, 〈{title}〉',
    '나만의 〈{title}〉 세계',
    '〈{title}〉로 감각 깨우기',
    '표현하고 싶은 날, 〈{title}〉',
  ],
};

const carouselTaglines: Record<HobbyCategory, string[]> = {
  sports: [
    '몸을 움직이며 스트레스를 날려볼까요?',
    '오늘 에너지를 쓰기 딱 좋은 활동이에요.',
    '가볍게 시작해도 충분히 재미있어요.',
    '땀 한 방울이 기분 전환을 만들어요.',
    '오늘 하루, 활동적으로 채워볼까요?',
    '체력도 마음도 함께 가볍게.',
    '움직이면 생각이 정리되는 타입이에요.',
    '주말에 시작하기 좋은 운동 PICK.',
    '처음이라도 부담 없이 도전해요.',
    '몸이 가벼워지는 순간을 만나보세요.',
    '리듬 타듯 즐기면 더 오래 갑니다.',
    '오늘의 나에게 필요한 움직임이에요.',
    '기분 전환엔 역시 몸부터.',
    '작은 루틴부터 쌓아가면 돼요.',
    '운동 후의 상쾌함, 미리 상상해보세요.',
  ],
  intelligence: [
    '집중력이 올라가는 취미, 지금 만나보세요.',
    '호기심을 자극하는 오늘의 PICK이에요.',
    '생각이 즐거워지는 시간을 추천해요.',
    '잠깐의 몰입이 하루를 바꿔요.',
    '새로운 지식, 가볍게 시작해볼까요?',
    '두뇌도 쉬지 않고 성장 중이에요.',
    '문제를 풀듯 취미를 즐겨보세요.',
    '깊이 파고들수록 재미있어져요.',
    '오늘의 호기심, 여기서 풀어보세요.',
    '생각하는 시간이 가장 풍요로워요.',
    '한 번 빠지면 시간 가는 줄 몰라요.',
    '지적 자극이 필요한 당신에게.',
    '배움의 즐거움, 취미로 만나보세요.',
    '집중 모드 ON, 준비됐나요?',
    '탐구하는 재미, 여기 있습니다.',
  ],
  art: [
    '감성 충전, 오늘은 이 취미 어때요?',
    '만들고 표현하며 쉬어가는 시간.',
    '손끝에서 시작되는 작은 즐거움.',
    '완성품보다 과정이 더 좋을 수도.',
    '색·소리·질감, 감각을 깨워요.',
    '표현하고 나면 마음이 가벼워져요.',
    '오늘의 감정, 작품으로 남겨볼까요?',
    '창작은 쉬는 것과 같은 시간.',
    '나만의 취향을 드러내는 순간.',
    '작은 시도가 큰 만족을 만들어요.',
    '예술은 재능보다 시작이 먼저예요.',
    '감각을 되살리는 오늘의 추천.',
    '만들며 힐링, 이 조합 좋아요.',
    '손으로 만지면 기분이 달라져요.',
    '오늘은 감성 모드, ON.',
  ],
};

const carouselCtas = [
  '취미 보러가기',
  '자세히 보기',
  '지금 확인하기',
  '추천 살펴보기',
  '이 취미 볼래요',
  '바로 가보기',
];

function pickRandom<T>(pool: T[]): T | undefined {
  if (pool.length === 0) return undefined;
  return pool[Math.floor(Math.random() * pool.length)];
}

function pickUniqueFromPool(pool: string[], used: Set<string>): string {
  const available = pool.filter((item) => !used.has(item));
  const source = available.length > 0 ? available : pool;
  const picked = pickRandom(source) ?? pool[0];
  used.add(picked);
  return picked;
}

function formatCarouselHeadline(template: string, title: string): string {
  return template.replace('{title}', title);
}

export function getCarouselSlideCopy(
  hobby: {
    title: string;
    description: string;
    category: HobbyCategory;
  },
  usedCopyKeys: Set<string> = new Set()
): CarouselSlideCopy {
  const headlinePool = carouselHeadlineTemplates[hobby.category];
  const taglinePool = carouselTaglines[hobby.category];
  const headlineTemplate = pickUniqueFromPool(headlinePool, usedCopyKeys);
  const tagline = pickUniqueFromPool(taglinePool, usedCopyKeys);
  const cta = pickUniqueFromPool(carouselCtas, usedCopyKeys);

  return {
    headline: formatCarouselHeadline(headlineTemplate, hobby.title),
    tagline,
    cta,
  };
}

const TODAY_PICK_PLAN: Array<{
  category: HobbyCategory;
  offset: number;
  count: number;
}> = [
  { category: 'sports', offset: 2, count: 2 },
  { category: 'intelligence', offset: 0, count: 2 },
  { category: 'art', offset: 0, count: 2 },
];

/** 카테고리별로 골라 오늘의 추천(운동형 단독 행과 겹치지 않도록 구성) */
export function getTodayPicks(allHobbies: Hobby[]): Hobby[] {
  return TODAY_PICK_PLAN.flatMap(({ category, offset, count }) =>
    allHobbies
      .filter((hobby) => hobby.category === category)
      .slice(offset, offset + count)
  );
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
