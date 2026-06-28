import type { HobbyCategory } from '@/lib/category-theme';
import { hobbies, type Hobby } from '@/lib/data/hobbies';

export type HobbyDifficulty = '쉬움' | '보통' | '도전';

export interface HobbyDetail {
  recommendFor: string;
  difficulty: HobbyDifficulty;
  starterTips: string[];
  highlight: string;
}

const details: Record<string, HobbyDetail> = {
  running: {
    recommendFor: '스트레스를 빠르게 풀고 싶거나, 부담 없이 시작할 운동을 찾는 분',
    difficulty: '쉬움',
    highlight: '신발만 있으면 오늘 바로 시작할 수 있어요.',
    starterTips: ['10분 걷기부터 시작해 페이스를 익히세요.', '무릎 부담을 줄이려면 잔디길·트랙을 활용하세요.', '주 3회, 같은 시간대에 뛰면 습관이 잘 붙어요.'],
  },
  yoga: {
    recommendFor: '몸과 마음을 함께 가다듬고 싶은 분',
    difficulty: '보통',
    highlight: '매트 한 장이면 집에서도 충분히 시작할 수 있어요.',
    starterTips: ['초보용 유튜브·앱 영상 15분부터 따라 해 보세요.', '호흡에 집중하면 긴장이 빠르게 풀립니다.', '무리한 자세보다 정렬과 호흡을 우선하세요.'],
  },
  swimming: {
    recommendFor: '관절 부담 적은 전신 운동을 원하는 분',
    difficulty: '보통',
    highlight: '물속 저항 덕분에 칼로리 소모가 큰 편이에요.',
    starterTips: ['자유형·평영 기본부터 익히면 재미가 배가됩니다.', '수영장 강습 1~2회면 호흡법을 빠르게 잡을 수 있어요.', '귀마개·고글만 준비해도 첫 수영이 편해집니다.'],
  },
  cycling: {
    recommendFor: '야외 활동과 운동을 동시에 즐기고 싶은 분',
    difficulty: '쉬움',
    highlight: '출퇴근·장보기와 연결하면 일상 속 운동이 됩니다.',
    starterTips: ['헬멧 착용은 필수, 야간엔 라이트를 켜세요.', '평지 5~10km 코스부터 익숙해지세요.', '타이어 공기·브레이크 상태를 출발 전 확인하세요.'],
  },
  climbing: {
    recommendFor: '문제 해결형 운동과 성취감을 함께 원하는 분',
    difficulty: '도전',
    highlight: '첫 바위를 넘을 때의 짜릿함이 중독성 있어요.',
    starterTips: ['실내 볼더링장 체험권으로 시작해 보세요.', '그립·발 디딤 위치를 차근차근 읽는 연습을 하세요.', '반드시 매트·벨레이 안전 수칙을 지키세요.'],
  },
  dance: {
    recommendFor: '운동보다 ‘즐거움’을 먼저 찾고 싶은 분',
    difficulty: '보통',
    highlight: '혼자 연습해도, 수업에 참여해도 모두 OK예요.',
    starterTips: ['좋아하는 K-pop·재즈 한 곡으로 5분만 따라 춰 보세요.', '거울 앞에서 기본 스텝부터 반복하면 금방 익숙해집니다.', '발목·무릎 스트레칭 후 시작하면 부상을 줄일 수 있어요.'],
  },
  reading: {
    recommendFor: '조용히 깊이 빠져들 수 있는 취미를 원하는 분',
    difficulty: '쉬움',
    highlight: '장르 하나만 정해도 시작 장벽이 거의 없어요.',
    starterTips: ['하루 10페이지 목표로 부담을 줄이세요.', '관심 있는 주제의 짧은 에세이부터 읽어 보세요.', '독서 메모·하이라이트 앱으로 기록하면 더 오래 갑니다.'],
  },
  puzzle: {
    recommendFor: '짧은 시간에 집중력을 쓰고 싶은 분',
    difficulty: '쉬움',
    highlight: '300~500피스 퍼즐이 입문에 딱 좋아요.',
    starterTips: ['가장자리·색상별로 나눠 정리하면 속도가 빨라집니다.', '조명 좋은 자리에서 하면 눈의 피로가 줄어요.', '완성작은 액자·보관함으로 기록해 두면 성취감 UP.'],
  },
  chess: {
    recommendFor: '전략·예측을 즐기며 두뇌를 쓰고 싶은 분',
    difficulty: '보통',
    highlight: '온라인으로 언제든 상대를 찾을 수 있어요.',
    starterTips: ['오프닝 2~3가지만 익혀도 실력이 안정됩니다.', 'chess.com·lichess 무료 퍼즐로 패턴을 익히세요.', '패배 복기가 실력 향상의 지름길입니다.'],
  },
  programming: {
    recommendFor: '만들면서 배우는 타입, 논리적 사고를 좋아하는 분',
    difficulty: '도전',
    highlight: '작은 프로젝트 하나가 가장 빠른 성장 루트예요.',
    starterTips: ['HTML·CSS 또는 Python 중 하나만 먼저 고르세요.', 'TODO 앱·날씨 앱처럼 작은 결과물부터 만드세요.', '에러 메시지를 그대로 검색하는 습관을 들이세요.'],
  },
  language: {
    recommendFor: '새로운 문화·여행과 연결된 취미를 원하는 분',
    difficulty: '보통',
    highlight: '매일 15분만 해도 3개월이면 체감 차이가 납니다.',
    starterTips: ['Duolingo·앱 + 드라마 자막을 병행해 보세요.', '외운 단어는 바로 문장으로 써 보세요.', '목표를 ‘여행에서 쓰기’처럼 구체적으로 정하세요.'],
  },
  photography: {
    recommendFor: '기록과 감각을 동시에 키우고 싶은 분',
    difficulty: '보통',
    highlight: '스마트폰 카메라만으로도 충분히 시작할 수 있어요.',
    starterTips: ['같은 장소를 아침·저녁에 찍어 빛 차이를 비교해 보세요.', '삼분할 구도부터 연습하면 사진이 안정됩니다.', 'RAW·보정 앱 하나만 익혀도 완성도가 올라갑니다.'],
  },
  painting: {
    recommendFor: '감정 표현과 창작의 즐거움을 원하는 분',
    difficulty: '보통',
    highlight: '수채·아크릴·디지털 중 하나만 골라도 OK.',
    starterTips: ['스케치북·워터컬러 12색 세트로 부담 없이 시작하세요.', '레퍼런스 사진을 보며 색·명암을 관찰하세요.', '완벽함보다 ‘매일 한 장’ 리듬을 만드는 게 중요해요.'],
  },
  music: {
    recommendFor: '손·귀를 함께 쓰며 성취감을 느끼고 싶은 분',
    difficulty: '도전',
    highlight: 'Ukulele·키보드는 입문 난이도가 비교적 낮아요.',
    starterTips: ['좋아하는 곡 한 멜로디만 먼저 완주해 보세요.', '메트로놈·느린 템포로 정확도를 우선하세요.', '하루 20분 규칙적 연습이 2시간 몰아치기보다 낫습니다.'],
  },
  cooking: {
    recommendFor: '실용적이면서 창의적인 취미를 원하는 분',
    difficulty: '보통',
    highlight: '한 끼를 성공시키는 순간 바로 보상이 와요.',
    starterTips: ['계란·파스타·볶음밥처럼 실패 확률 낮은 메뉴부터.', '칼·도마·팬 3종만 정리해도 충분합니다.', '레시피는 그램보다 ‘불 세기·순서’를 메모하세요.'],
  },
  calligraphy: {
    recommendFor: '느린 집중과 손글씨의 아름다움을 좋아하는 분',
    difficulty: '보통',
    highlight: '붓펜만 있어도 오늘부터 연습할 수 있어요.',
    starterTips: ['기본 획(一, 人, 大)부터 반복 연습하세요.', '책상·자세를 고정하면 선 품질이 안정됩니다.', '하루 한 문장만 써도 꾸준함이 쌓입니다.'],
  },
  pottery: {
    recommendFor: '손으로 무언가를 ‘만들어내는’ 감각을 원하는 분',
    difficulty: '도전',
    highlight: '원데이 클래스가 가장 부담 없는 시작이에요.',
    starterTips: ['체험 수업에서 손감·속도를 먼저 익히세요.', '실패한 작품도 과정 학습으로 받아들이세요.', '집 근처 도예 공방·공유 스튜디오를 검색해 보세요.'],
  },
  gardening: {
    recommendFor: '자연과 루틴을 함께 키우고 싶은 분',
    difficulty: '쉬움',
    highlight: '화분 하나·허브 한 포트만으로도 시작 가능해요.',
    starterTips: ['초보에게는 로즈마리·바질·다육이 추천됩니다.', '물 주기는 ‘흙 표면 마름’ 기준으로 확인하세요.', '창가 햇빛·통풍 위치를 먼저 정하세요.'],
  },
};

export function getHobbyDetail(id: string): HobbyDetail {
  return (
    details[id] ?? {
      recommendFor: '새로운 취미를 탐색하고 있는 분',
      difficulty: '보통',
      highlight: '오늘부터 작은 한 걸음으로 시작해 보세요.',
      starterTips: ['관심 있는 영상·글 하나를 찾아보세요.', '일주일에 2~3회, 짧게라도 꾸준히 해 보세요.', '비슷한 취미를 하는 사람과 정보를 나눠 보세요.'],
    }
  );
}

export function getDifficultyColor(difficulty: HobbyDifficulty) {
  if (difficulty === '쉬움') return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  if (difficulty === '보통') return 'bg-teal-50 text-teal-700 border-teal-100';
  return 'bg-amber-100 text-amber-800 border-amber-200';
}

export function getRelatedHobbies(category: HobbyCategory, currentId: string, limit = 4): Hobby[] {
  return hobbies.filter((h) => h.category === category && h.id !== currentId).slice(0, limit);
}
