# Design Guide: HobbyFind

> **Reference:** Airbnb Design Language — 여백 중심, 카드 탐색, 명확한 CTA, 친근하고 신뢰감 있는 UI  
> **Stack:** Next.js · Tailwind CSS · shadcn/ui

| 항목 | 내용 |
|------|------|
| 서비스명 | HobbyFind |
| 디자인 키워드 | Clean · Friendly · Trustworthy · Card-first |

---

## 1. 디자인 시스템 개요 (Design System Overview)

### 1.1 브랜드 아이덴티티

| 요소 | 가이드 |
|------|--------|
| **서비스명** | HobbyFind — “취미를 찾고, 저장한다” |
| **로고** | 좌측 Top Bar, 텍스트 + 심볼(H) 또는 아이콘 |
| **톤** | Airbnb처럼 **따뜻하고 가벼운** 탐색 경험, 과장된 장식 최소화 |
| **콘텐츠 중심** | 큰 Hero보다 **카드 그리드**가 주인공 — “리스팅 탐색” 패턴 차용 |

### 1.2 Airbnb에서 차용하는 UI 원칙

| Airbnb 패턴 | HobbyFind 적용 |
|-------------|----------------|
| 넉넉한 whitespace | 섹션 간 `py-8`~`py-12`, 카드 gap `gap-6` |
| 둥근 모서리 | 카드 `rounded-xl`, 버튼 `rounded-lg` |
| 부드러운 그림자 | `shadow-sm` → hover `shadow-md` |
| Coral Primary CTA | 북마크·가입·로그인 주요 버튼 |
| 카드 hover zoom | 이미지 `scale-105` transition |
| 고정 Top Bar | 스크롤 시 탐색·인증 항상 접근 |
| 필터 pill/tabs | 카테고리 필터 세그먼트 UI |

### 1.3 키 비주얼 가이드

| 항목 | 스펙 |
|------|------|
| **타이포** | `font-sans` — Pretendard / Noto Sans KR / system-ui |
| **제목** | `font-semibold` ~ `font-bold`, `text-ink` |
| **본문** | `text-sm`~`text-base`, `text-ink-muted` |
| **아이콘** | lucide-react, 20~24px, stroke 1.5~2 |
| **이미지** | 4:3 또는 16:10 비율, `object-cover`, `rounded-xl` |
| **애니메이션** | 150~300ms ease, Framer Motion 선택 적용 |

### 1.4 카테고리 시각 구분 (보조)

| 카테고리 | 배지 톤 | 용도 |
|----------|---------|------|
| 운동형 | `bg-rose-50 text-rose-700 border-rose-100` | 카드 배지 |
| 지능형 | `bg-teal-50 text-teal-700 border-teal-100` | 카드 배지 |
| 예술형 | `bg-amber-50 text-amber-800 border-amber-100` | 카드 배지 |

---

## 2. TailwindCSS 색상 팔레트 (Color Palette for TailwindCSS)

### 2.1 브랜드·시맨틱 컬러 (Airbnb 기반)

| 역할 | HEX | Tailwind 확장 키 | 용도 |
|------|-----|-------------------|------|
| **Primary (Rausch)** | `#FF385C` | `brand-primary` | CTA, 활성 필터, 북마크 ON |
| **Secondary (Teal)** | `#008489` | `brand-teal` | 보조 링크, 차트 2번 |
| **Accent (Gold)** | `#FFD700` | `brand-gold` | 차트 강조, 별점형 포인트 |
| **Surface** | `#FFFFFF` | `white` | 카드·Top Bar |
| **Background** | `#F7F7F7` | `neutral-light` | 페이지 배경 |
| **Ink** | `#222222` | `neutral-dark` / `ink` | 제목·본문 |
| **Ink Muted** | `#717171` | `ink-muted` | 보조 텍스트 |
| **Border** | `#DDDDDD` | `border-gray` | 카드·입력 테두리 |
| **Success** | `#008489` | `success-green` | 성공 토스트 |
| **Error** | `#C13515` | `error-red` | 폼·API 오류 |

### 2.2 `tailwind.config.ts` 확장 예시

```ts
// theme.extend.colors
colors: {
  'brand-primary': '#FF385C',
  'brand-teal': '#008489',
  'brand-gold': '#FFD700',
  'neutral-light': '#F7F7F7',
  'neutral-dark': '#222222',
  'ink': '#222222',
  'ink-muted': '#717171',
  'border-gray': '#DDDDDD',
  'success-green': '#008489',
  'error-red': '#C13515',
},
borderRadius: {
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
},
boxShadow: {
  card: '0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
  'card-hover': '0 2px 4px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.08)',
},
```

### 2.3 CSS 변수 (shadcn/ui 연동)

```css
:root {
  --background: 0 0% 97%;        /* #F7F7F7 */
  --foreground: 0 0% 13%;        /* #222222 */
  --primary: 349 100% 61%;       /* #FF385C */
  --primary-foreground: 0 0% 100%;
  --border: 0 0% 87%;            /* #DDDDDD */
  --radius: 0.75rem;
}
```

### 2.4 컴포넌트별 색상 적용

| UI | 클래스 예시 |
|----|-------------|
| 페이지 배경 | `bg-neutral-light` |
| Top Bar | `bg-white border-b border-border-gray` |
| Primary 버튼 | `bg-brand-primary hover:bg-[#E31C5F] text-white` |
| Ghost 버튼 | `border border-neutral-dark text-neutral-dark hover:bg-neutral-light` |
| 카드 | `bg-white border border-border-gray rounded-xl shadow-card` |
| 필터 active | `bg-neutral-dark text-white` |
| 필터 inactive | `bg-white border border-border-gray text-ink-muted` |
| 북마크 ON | `text-brand-primary fill-brand-primary` |
| 북마크 OFF | `text-ink-muted hover:text-brand-primary` |

---

## 3. 페이지 구현 가이드 (Page Implementations)

### 3.1 루트 페이지 `/`

**목적:** 서비스 소개 + 18개 취미 그리드 탐색 + 대분류 필터

| 영역 | 레이아웃 | Tailwind 예시 |
|------|----------|---------------|
| **Top Bar** | sticky, h-16, container | `sticky top-0 z-50 glass-nav` |
| **Hero** | 단순 1열, 좌측 정렬 | `max-w-2xl py-10 md:py-14` |
| **Filter** | pill 4개 가로 | `flex gap-2 overflow-x-auto` |
| **Grid** | 반응형 카드 | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6` |

**Hero 구조**

```html
<section class="container mx-auto px-4 py-10 md:py-14">
  <span class="text-xs font-semibold text-brand-primary uppercase tracking-wide">
    취미 추천 · 북마크
  </span>
  <h1 class="mt-2 text-3xl md:text-4xl font-bold text-ink">
    취미 고를 때 망설이지 마세요
  </h1>
  <p class="mt-3 text-ink-muted text-base md:text-lg max-w-xl">
    운동형·지능형·예술형 18가지 취미를 탐색하고, 마음에 드는 활동을 저장하세요.
  </p>
</section>
```

**필터 → 카테고리 페이지:** Top Bar 카테고리 링크는 `/category/[type]` 이동. 홈 필터는 **클라이언트 필터링**만.

---

### 3.2 카테고리 페이지 `/category/[type]`

| 영역 | 내용 |
|------|------|
| **Header** | H1 카테고리명 + 1~2문장 소개 |
| **Grid** | 해당 6개 카드만 |
| **북마크** | Member만 BookmarkButton 노출 |

```html
<header class="summer-section py-10 md:py-12">
  <div class="container mx-auto px-4">
    <h1 class="text-2xl md:text-3xl font-bold text-ink">운동형 취미</h1>
    <p class="mt-2 text-ink-muted max-w-lg">체력과 에너지를 채울 활동적인 취미 모음</p>
  </div>
</header>
<section class="container mx-auto px-4 py-8">
  <!-- HobbyCardGrid × 6 -->
</section>
```

---

### 3.3 로그인 `/login`

| 요소 | 스펙 |
|------|------|
| 레이아웃 | 중앙 카드, max-w-md |
| 폼 | email, password |
| CTA | full-width Primary |
| 링크 | 회원가입 → `/signup` |

```html
<div class="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-neutral-light">
  <div class="w-full max-w-md bg-white rounded-2xl border border-border-gray shadow-card p-8">
    <h1 class="text-2xl font-bold text-ink">로그인</h1>
    <p class="text-sm text-ink-muted mt-1">HobbyFind 계정으로 로그인</p>
    <!-- inputs + button -->
    <p class="text-sm text-center mt-6 text-ink-muted">
      계정이 없나요? <a href="/signup" class="text-brand-primary font-semibold">회원가입</a>
    </p>
  </div>
</div>
```

**에러:** `text-error-red text-sm mt-1` — 입력 필드 하단

---

### 3.4 회원가입 `/signup`

| 필드 | 검증 UI |
|------|---------|
| 이메일 | `type="email"`, invalid → `border-error-red` |
| 비밀번호 | min length 안내 |
| 비밀번호 확인 | 불일치 시 inline error |
| 약관 동의 | checkbox 필수 |

레이아웃·카드 스타일은 로그인과 **동일 패턴** 유지.

---

### 3.5 마이페이지 `/mypage`

| 영역 | Desktop | Mobile |
|------|---------|--------|
| 프로필 요약 | 상단 1행 | 상단 |
| 북마크 그리드 | 2/3 너비 | full |
| 통계 차트 | 1/3 너비 | 그리드 아래 |

```html
<div class="container mx-auto px-4 py-8">
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div class="lg:col-span-2">
      <!-- BookmarkedHobbyGrid -->
    </div>
    <div class="summer-panel rounded-2xl p-6">
      <!-- StatsChart: pie or bar -->
    </div>
  </div>
</div>
```

**Empty state:** 북마크 0건 — `text-ink-muted text-center py-12` + 홈 링크 CTA

---

## 4. 레이아웃 컴포넌트 (Layout Components)

### 4.1 Top Bar (Header)

| 구역 | 요소 | 클래스 |
|------|------|--------|
| Left | Logo | `text-xl font-bold text-brand-primary` |
| Center | CategoryMenu | `hidden md:flex gap-6 text-sm font-medium` |
| Right | Auth | Guest: 로그인 링크 + Primary 회원가입 / Member: 마이페이지 + 로그아웃 |

```html
<header class="sticky top-0 z-50 bg-white border-b border-border-gray h-16">
  <div class="container mx-auto px-4 h-full flex items-center justify-between">
    <!-- Logo | Nav | Auth -->
  </div>
</header>
```

**Mobile:** `md:hidden` 햄버거 → Sheet/Drawer에 카테고리·인증 메뉴

---

### 4.2 Footer

```html
<footer class="border-t border-border-gray bg-white mt-auto py-8">
  <div class="container mx-auto px-4 flex flex-col md:flex-row justify-between gap-4 text-sm text-ink-muted">
    <span class="font-semibold text-ink">HobbyFind</span>
    <nav class="flex gap-4">홈 · 운동형 · 지능형 · 예술형</nav>
  </div>
</footer>
```

---

### 4.3 HobbyCard

| 파트 | 스펙 |
|------|------|
| Image | `aspect-[4/3] rounded-xl overflow-hidden` |
| Badge | 카테고리 pill, 좌상단 |
| Title | `font-semibold text-ink line-clamp-1` |
| Desc | `text-sm text-ink-muted line-clamp-2` |
| Bookmark | 우상단 absolute, Member only |

```html
<article class="group relative bg-white rounded-xl border border-border-gray overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
  <div class="relative aspect-[4/3] overflow-hidden">
    <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    <!-- BookmarkButton -->
  </div>
  <div class="p-4">
    <span class="text-xs font-medium px-2 py-0.5 rounded-full bg-rose-50 text-rose-700">운동형</span>
    <h3 class="mt-2 font-semibold text-ink">요가</h3>
    <p class="mt-1 text-sm text-ink-muted line-clamp-2">...</p>
  </div>
</article>
```

---

### 4.4 CategoryFilter (Pill Tabs)

```html
<div class="flex gap-2 p-1 bg-white border border-border-gray rounded-full w-fit">
  <button class="px-4 py-2 rounded-full text-sm font-medium bg-neutral-dark text-white">전체</button>
  <button class="px-4 py-2 rounded-full text-sm font-medium text-ink-muted hover:bg-neutral-light">운동형</button>
</div>
```

---

### 4.5 컴포넌트–파일 매핑

| 컴포넌트 | 경로 |
|----------|------|
| Topbar | `components/layout/topbar.tsx` |
| HeroSection | `components/layout/hero-section.tsx` |
| SiteFooter | `components/layout/site-footer.tsx` |
| CategoryFilter | `components/hobby/category-filter.tsx` |
| HobbyGrid | `components/hobby/hobby-grid.tsx` |
| HobbyCard | `components/hobby/hobby-card.tsx` |
| CategoryStats | `components/mypage/category-stats.tsx` |

---

## 5. 상호작용 패턴 (Interaction Patterns)

### 5.1 버튼

| 타입 | 상태 | 클래스 |
|------|------|--------|
| Primary | default | `bg-brand-primary text-white hover:opacity-90` |
| Primary | disabled | `opacity-50 cursor-not-allowed` |
| Ghost | hover | `bg-neutral-light` |
| Icon | bookmark | toggle fill + `scale-110` 150ms |

### 5.2 필터

| 동작 | 피드백 |
|------|--------|
| 클릭 | active pill 즉시 전환 |
| 홈 | 그리드 fade 또는 instant filter |
| Top Bar | page navigation transition |

### 5.3 카드

| 이벤트 | Desktop | Mobile |
|--------|---------|--------|
| hover | image scale + shadow ↑ | — |
| tap | — | subtle scale 0.98 (선택) |
| bookmark | API → icon state | 동일 |

### 5.4 페이지 전환

- Next.js App Router 기본 transition
- Framer Motion (선택): `opacity 0→1`, `y: 8→0`, 200ms

### 5.5 피드백

| 상황 | UI |
|------|-----|
| 북마크 성공 | toast 또는 icon만 |
| 로그인 실패 | inline error |
| 로딩 | skeleton card `animate-pulse bg-neutral-light` |
| empty | illustration + text + CTA link |

---

## 6. 반응형 브레이크포인트 (Breakpoints)

### 6.1 Tailwind 기본값

| Token | min-width | HobbyFind 용도 |
|-------|-----------|----------------|
| `sm` | 640px | 그리드 2열 시작 |
| `md` | 768px | Top Bar 가로 메뉴, Hero text-lg |
| `lg` | 1024px | 그리드 3열, 마이페이지 2단 |
| `xl` | 1280px | 그리드 4열 |
| `2xl` | 1536px | container max-width |

### 6.2 디바이스별 레이아웃

| 디바이스 | Breakpoint | Grid cols | Top Bar | Hero |
|----------|------------|-----------|---------|------|
| Mobile | `< sm` | 1 | 햄버거 | `text-2xl` |
| Mobile L | `sm` | 2 | 햄버거 | `text-2xl` |
| Tablet | `md` | 2 | full nav | `text-3xl` |
| Desktop | `lg` | 3 | full nav | `text-4xl` |
| Wide | `xl` | 4 | full nav | 동일 |

### 6.3 Container

```html
<div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
```

### 6.4 터치·접근성

- 최소 터치 타겟: `min-h-[44px] min-w-[44px]`
- focus ring: `focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2`
- 북마크 `aria-label="북마크 추가"` / `aria-pressed="true|false"`

---

## 부록: 타이포 스케일

| Level | Class | 용도 |
|-------|-------|------|
| H1 | `text-3xl md:text-4xl font-bold` | Hero |
| H2 | `text-2xl font-bold` | 섹션 제목 |
| H3 | `text-lg font-semibold` | 카드 제목 |
| Body | `text-base text-ink` | 본문 |
| Caption | `text-sm text-ink-muted` | 보조·메타 |

---

*문서 끝 — MVP 범위 외 UI(검색·추천 캐러셀 등)는 본 가이드에 포함하지 않음*
