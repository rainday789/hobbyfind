# IA: HobbyFind

| 항목 | 내용 |
|------|------|
| 서비스명 | HobbyFind |
| 서비스 타입 | 웹서비스 |
| 기술 전제 | Next.js 15 (App Router) |
| 문서 버전 | 1.0 |

---

## 1. 전체 사이트맵 (Site Map)

```text
HobbyFind
│
├── 홈 (/)
│   ├── Top Bar
│   ├── Hero (사이트 소개)
│   └── 취미 카드 그리드 + 대분류 필터
│
├── 카테고리 (3종)
│   ├── 운동형    (/category/sports)
│   ├── 지능형    (/category/intelligence)
│   └── 예술형    (/category/art)
│
├── 로그인        (/login)
├── 회원가입      (/signup)
│
└── 마이페이지    (/mypage)  [로그인 필요]
    ├── 북마크 목록
    └── 카테고리별 통계 차트
```

### 페이지–URL 매핑

| Depth | 페이지 | URL | 접근 |
|:-----:|--------|-----|------|
| L1 | 홈 | `/` | 전체 |
| L1 | 로그인 | `/login` | 전체 |
| L1 | 회원가입 | `/signup` | 전체 |
| L1 | 마이페이지 | `/mypage` | 회원 |
| L2 | 운동형 | `/category/sports` | 전체 |
| L2 | 지능형 | `/category/intelligence` | 전체 |
| L2 | 예술형 | `/category/art` | 전체 |

### 취미 데이터 (고정 18종)

| 카테고리 | 취미 |
|----------|------|
| 운동형 (`sports`) | 조깅/러닝, 요가, 수영, 자전거, 클라이밍, 댄스 |
| 지능형 (`intelligence`) | 독서, 퍼즐, 체스, 프로그래밍, 외국어 학습, 사진 촬영 |
| 예술형 (`art`) | 그림 그리기, 악기 연주, 요리, 서예, 도자기 만들기, 정원 가꾸기 |

---

## 2. 사용자 흐름 (User Flow)

### 2.1 비회원 플로우

```mermaid
flowchart TD
    A[홈 / 접속] --> B[Hero·그리드 탐색]
    B --> C{카테고리 선택}
    C -->|Top Bar / 필터| D[카테고리 페이지]
    C -->|필터 토글| E[홈 그리드 필터링]
    D --> F[취미 카드 조회]
    E --> F
    F --> G{북마크 클릭}
    G --> H[로그인 /login 유도]
    H --> I{회원가입?}
    I -->|예| J[/signup]
    I -->|아니오| K[로그인 성공]
    J --> K
    K --> L[회원 플로우로 전환]
```

| 단계 | 행동 | 결과 |
|:----:|------|------|
| 1 | 홈 접속 | 18개 취미 그리드 + Hero 표시 |
| 2 | 대분류 필터 토글 | 홈 그리드에 선택 카테고리만 표시 |
| 3 | Top Bar 카테고리 클릭 | 해당 `/category/[type]` 이동 |
| 4 | 북마크 시도 | 로그인 페이지로 이동 또는 토스트 안내 |
| 5 | 로그인/회원가입 | 세션 생성 → 북마크·마이페이지 이용 가능 |

### 2.2 회원 플로우

```mermaid
flowchart TD
    A[로그인 /login] --> B[홈 /]
    B --> C[취미 탐색·필터]
    C --> D[북마크 토글]
    D --> E[API 저장/삭제]
    E --> F{마이페이지?}
    F -->|예| G[/mypage]
    G --> H[북마크 목록]
    G --> I[통계 차트]
    F -->|아니오| C
    G --> J[로그아웃]
    J --> K[비회원 상태·홈]
```

| 단계 | 행동 | 결과 |
|:----:|------|------|
| 1 | 로그인 | Top Bar → 마이페이지·로그아웃 표시 |
| 2 | 취미 북마크 | 카드 북마크 아이콘 ON, DB 저장 |
| 3 | 북마크 해제 | 아이콘 OFF, DB 삭제 |
| 4 | 마이페이지 | 북마크 N건 + 카테고리별 차트 |
| 5 | 로그아웃 | 세션 종료, 탐색만 가능 |

---

## 3. 내비게이션 구조 (Navigation Structure)

### 3.1 Top Bar (전 페이지 공통, 고정)

| 위치 | 요소 | 동작 |
|------|------|------|
| **좌측** | Logo (`HobbyFind`) | `/` 이동 |
| **중앙** | CategoryMenu | `/category/sports` · `/category/intelligence` · `/category/art` |
| **우측** | 인증 영역 | 로그인 상태에 따라 분기 (아래 표) |

### 3.2 인증 상태별 Top Bar 표시

| 요소 | 비회원 | 회원 |
|------|:------:|:----:|
| 로고 | O | O |
| 카테고리 메뉴 (3종) | O | O |
| 로그인 링크 | O | X |
| 회원가입 버튼 | O | X |
| 마이페이지 링크 | O* | O |
| 로그아웃 | X | O |

\* 비회원이 마이페이지 클릭 시 → `/login` 리다이렉트

### 3.3 반응형 내비게이션

| 뷰포트 | Top Bar |
|--------|---------|
| **Desktop (≥768px)** | 로고 + 가로 카테고리 메뉴 + 우측 인증 버튼 |
| **Mobile (<768px)** | 로고 + 햄버거 → 드로어/시트에 카테고리·인증 메뉴 |

### 3.4 페이지 간 이동 규칙

| 출발 | 트리거 | 도착 |
|------|--------|------|
|任意 | Logo | `/` |
|任意 | CategoryMenu | `/category/[type]` |
|任意 | 로그인 | `/login` |
|任意 | 회원가입 | `/signup` |
|任意 | 마이페이지 (회원) | `/mypage` |
|任意 | 마이페이지 (비회원) | `/login` |
| `/login` | 회원가입 링크 | `/signup` |
| `/signup` | 로그인 링크 | `/login` |

---

## 4. 페이지 계층 구조 (Page Hierarchy)

### 4.1 홈 `/`

```text
Page: Home
├── Layout: RootLayout (Top Bar, Footer)
├── Section: Hero
│   └── 사이트 소개 문구, CTA(선택)
├── Section: CategoryFilter
│   └── 전체 | 운동형 | 지능형 | 예술형
└── Section: HobbyCardGrid
    └── HobbyCard × 18 (필터 결과)
```

### 4.2 카테고리 `/category/[type]`

```text
Page: Category
├── Layout: RootLayout
├── Section: CategoryHeader
│   ├── 카테고리명 (H1)
│   └── 소개 문구
└── Section: HobbyCardGrid
    └── HobbyCard × 6
```

### 4.3 로그인 `/login`

```text
Page: Login
├── Layout: RootLayout (또는 AuthLayout)
└── Section: LoginForm
    ├── 이메일(아이디)
    ├── 비밀번호
    ├── 에러 메시지 영역
    ├── 로그인 버튼
    └── → 회원가입 링크
```

### 4.4 회원가입 `/signup`

```text
Page: Signup
├── Layout: RootLayout (또는 AuthLayout)
└── Section: SignupForm
    ├── 이메일(아이디)
    ├── 비밀번호
    ├── 약관 동의 체크
    ├── 가입 버튼
    └── → 로그인 링크
```

### 4.5 마이페이지 `/mypage`

```text
Page: MyPage [Auth Guard]
├── Layout: RootLayout
├── Section: UserProfile (요약)
├── Section: BookmarkList
│   └── HobbyCardGrid (북마크만)
└── Section: Stats
    ├── 북마크 총 개수
    └── StatsChart (카테고리별 분포)
```

---

## 5. 페이지별 주요 콘텐츠 구성 (Content Organization)

| 페이지 | 섹션 | UI/콘텐츠 요소 | 데이터 |
|--------|------|----------------|--------|
| **홈** | Hero | 제목, 부제, 소개 문구 | 정적 카피 |
| | Filter | 4개 토글 버튼 | `sports` / `intelligence` / `art` / all |
| | Grid | HobbyCard × n | `hobbies.ts` 18종 |
| **카테고리** | Header | H1, 설명 1~2문장 | category 메타 |
| | Grid | HobbyCard × 6 | 필터된 취미 |
| **로그인** | Form | input×2, submit, link | — |
| | Feedback | inline error | API 응답 |
| **회원가입** | Form | input×2, checkbox, submit, link | — |
| | Feedback | validation error | 클라이언트·서버 |
| **마이페이지** | Bookmarks | HobbyCard × n | Supabase bookmarks |
| | Stats | 숫자 + Chart | 집계 API |

### HobbyCard 콘텐츠 단위

| 필드 | 표시 |
|------|------|
| imageUrl | 썸네일 |
| title | 취미명 |
| description | 짧은 설명 |
| category | 배지 (운동형/지능형/예술형) |
| BookmarkButton | 로그인 시만 활성 |

---

## 6. 상호작용 패턴 (Interaction Patterns)

| 패턴 | 트리거 | 동작 | UI 상태 변화 |
|------|--------|------|--------------|
| **카테고리 필터 (홈)** | 필터 버튼 클릭 | 클라이언트 필터링 | 선택 버튼 active 스타일, 그리드 갱신 |
| **카테고리 메뉴** | Top Bar 링크 | 페이지 이동 | 해당 `/category/[type]` 로드 |
| **북마크 추가** | BookmarkButton (OFF) | POST toggle API | 아이콘 filled, 토스트(선택) |
| **북마크 해제** | BookmarkButton (ON) | POST toggle API | 아이콘 outline |
| **북마크 (비회원)** | BookmarkButton | `/login` 이동 또는 안내 | — |
| **로그인 성공** | Form submit | NextAuth 세션 | Top Bar → 마이페이지·로그아웃 |
| **로그인 실패** | Form submit | — | 필드 하단 error 메시지 |
| **회원가입 성공** | Form submit | → `/login` 또는 자동 로그인 | — |
| **마이페이지 (비회원)** | 링크/직접 URL | redirect | `/login` |
| **로그아웃** | 버튼 | signOut | Top Bar → 로그인·회원가입 |
| **로딩** | API 호출 중 | skeleton/spinner | Grid·Stats 영역 |

### 상태 다이어그램: 북마크 버튼

```text
[비회원] --클릭--> [로그인 유도]
[회원·미북마크] --클릭--> [북마크됨] --클릭--> [미북마크]
```

---

## 7. URL 구조 (URL Structure)

| 페이지 | URL | Next.js 경로 | Dynamic |
|--------|-----|--------------|:-------:|
| 홈 | `/` | `app/page.tsx` | — |
| 로그인 | `/login` | `app/login/page.tsx` | — |
| 회원가입 | `/signup` | `app/signup/page.tsx` | — |
| 마이페이지 | `/mypage` | `app/mypage/page.tsx` | — |
| 운동형 | `/category/sports` | `app/category/[category]/page.tsx` | O |
| 지능형 | `/category/intelligence` | ↑ | O |
| 예술형 | `/category/art` | ↑ | O |

### API Routes (Next.js)

| URL | 용도 |
|-----|------|
| `/api/auth/[...nextauth]` | 로그인·세션 |
| `/api/auth/signup` | 회원가입 |
| `/api/bookmarks` | 북마크 목록 |
| `/api/bookmarks/toggle` | 북마크 추가/해제 |
| `/api/bookmarks/stats` | 카테고리 통계 |

### URL·SEO 정책

| URL | index | 비고 |
|-----|:-----:|------|
| `/` | O | 서비스 메인 |
| `/category/*` | O | 카테고리명 메타 |
| `/login`, `/signup` | △ | noindex 권장 |
| `/mypage` | X | noindex, auth required |

---

## 8. 컴포넌트 계층 구조 (Component Hierarchy)

### 8.1 App 전체

```text
app/layout.tsx (RootLayout)
├── Providers (SessionProvider, Theme, Query)
├── Topbar
│   ├── Logo
│   ├── CategoryMenu
│   └── AuthNav
│       ├── LoginLink          (비회원)
│       ├── SignupButton       (비회원)
│       ├── MyPageLink         (회원)
│       └── LogoutButton       (회원)
├── {children}  ← page routes
└── SiteFooter (선택)
```

### 8.2 페이지별

```text
Home (page.tsx)
├── HeroSection
├── CategoryFilter
└── HobbyGrid
    └── HobbyCard[]
        ├── Image
        ├── CategoryBadge
        ├── Title
        ├── Description
        └── BookmarkButton

Category ([category]/page.tsx)
├── CategoryHeader
├── CategoryFilter (선택)
└── HobbyGrid
    └── HobbyCard[]

Login / Signup
└── AuthForm
    ├── Input (email)
    ├── Input (password)
    ├── ErrorMessage
    └── SubmitButton

MyPage (page.tsx)
├── UserProfile
├── BookmarkedHobbyGrid
│   └── HobbyCard[]
└── CategoryStats
    ├── StatSummary (total count)
    └── StatsChart
```

### 8.3 컴포넌트–경로 매핑 (Next.js)

| 컴포넌트 | 파일 위치 (예시) | 재사용 |
|----------|------------------|:------:|
| Topbar | `components/layout/topbar.tsx` | 전역 |
| CategoryMenu | topbar 내 또는 분리 | 전역 |
| HeroSection | `components/layout/hero-section.tsx` | 홈 |
| CategoryFilter | `components/hobby/category-filter.tsx` | 홈·카테고리 |
| HobbyGrid | `components/hobby/hobby-grid.tsx` | 홈·카테고리·마이페이지 |
| HobbyCard | `components/hobby/hobby-card.tsx` | 전역 |
| BookmarkButton | hobby-card 내 | 카드 |
| StatsChart | `components/mypage/category-stats.tsx` | 마이페이지 |
| UserProfile | `components/mypage/user-profile.tsx` | 마이페이지 |

---

## 9. 상단바 / 하단바 (Header & Footer)

### 9.1 상단바 (Top Bar) — **포함 (필수)**

| 구역 | 요소 | 비고 |
|------|------|------|
| 좌 | Logo | `/` 링크 |
| 중 | CategoryMenu | 운동형 · 지능형 · 예술형 |
| 우 | AuthNav | 상태별 분기 (§3.2) |

- **고정(sticky)** 권장 — 스크롤 시에도 탐색·인증 접근 유지
- **높이** — 모바일 56px / 데스크톱 64px (가이드)

### 9.2 하단바 (Footer) — **포함 (권장, 단순)**

| 요소 | 설명 |
|------|------|
| 서비스명 | HobbyFind |
| 보조 링크 | 홈 · 운동형 · 지능형 · 예술형 (Top Bar와 동일 목적지) |
| 카피 | © / 과제·프로젝트 안내 (1줄) |

- **고정 하단바(bottom tab bar)는 사용하지 않음** — Top Bar 중심 IA
- Footer는 **스크롤 하단**에만 배치

---

## 10. 기술 스택 고려 (Next.js Implementation)

| IA 요소 | Next.js 구현 |
|---------|--------------|
| 라우팅 | App Router — `app/` 디렉터리 파일 기반 |
| 레이아웃 | `app/layout.tsx` — Topbar·Footer 공통 |
| 동적 카테고리 | `app/category/[category]/page.tsx` + `generateMetadata` |
| 인증 | NextAuth middleware 또는 클라이언트 `useSession` + `/mypage` guard |
| 데이터 | 취미: `lib/data/hobbies.ts` / 북마크: Supabase + Route Handlers |
| 상태 | 북마크: React Query 또는 fetch + useState |
| 차트 | Recharts — `CategoryStats` 클라이언트 컴포넌트 |
| 스타일 | Tailwind CSS + shadcn/ui |
| 배포 | Vercel — URL 구조 그대로 반영 |

### 디렉터리–IA 대응

```text
src/app/
├── page.tsx                 → /
├── login/page.tsx           → /login
├── signup/page.tsx          → /signup
├── mypage/page.tsx          → /mypage
├── category/[category]/
│   ├── layout.tsx           → 카테고리 메타
│   └── page.tsx             → /category/*
└── api/
    ├── auth/[...nextauth]/
    ├── auth/signup/
    └── bookmarks/
```

---

*문서 끝*
