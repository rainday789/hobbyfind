# Use Case Document: HobbyFind

| 항목 | 내용 |
|------|------|
| 서비스명 | HobbyFind |
| 문서 유형 | Use Case Specification |
| 버전 | 1.0 |

---

## 1. 액터 정의 (Actor Definitions)

| 액터 | 설명 | 권한 |
|------|------|------|
| **비회원 사용자 (Guest)** | 로그인 없이 사이트에 접근하는 이용자 | 홈·카테고리 페이지 **탐색**, Hero·그리드·필터 조회 |
| **회원 사용자 (Member)** | 이메일·비밀번호로 가입·로그인한 이용자 | Guest 권한 + **북마크** + **마이페이지** |
| **시스템 (System)** | Next.js + Supabase + NextAuth로 구성된 웹 애플리케이션 | UI 렌더링, 인증·인가, DB CRUD, API 응답 |

### 액터–기능 매트릭스

| 기능 | Guest | Member | System |
|------|:-----:|:------:|:------:|
| 홈 탐색 | O | O | 제공 |
| 카테고리 페이지 탐색 | O | O | 제공 |
| 대분류 필터 | O | O | 제공 |
| 북마크 추가/해제 | X | O | 처리 |
| 마이페이지 | X | O | 제공 |
| 로그인/회원가입 | O | — | 처리 |
| 로그아웃 | X | O | 처리 |

---

## 2. 상세 Use Case 시나리오 (Detailed Use Case Scenarios)

### UC 목록

| ID | Use Case | 주 액터 | 우선순위 |
|----|----------|---------|:--------:|
| UC-01 | 메인페이지(홈)에서 취미 탐색 | Guest, Member | 필수 |
| UC-02 | 카테고리 페이지에서 취미 탐색 | Guest, Member | 필수 |
| UC-03 | 북마크 추가 | Member | 필수 |
| UC-04 | 북마크 해제 | Member | 필수 |
| UC-05 | 마이페이지 조회 | Member | 필수 |
| UC-06 | 로그인 | Guest | 필수 |
| UC-07 | 회원가입 | Guest | 필수 |
| UC-08 | 로그아웃 | Member | 필수 |

---

### UC-01: 메인페이지(홈)에서 취미 탐색

| 항목 | 내용 |
|------|------|
| **목적** | 사용자가 Hero·그리드를 통해 18개 고정 취미를 탐색한다 |
| **액터** | Guest, Member |
| **트리거** | 사용자가 `/` 접속 또는 Logo 클릭 |
| **사전조건** | 브라우저·네트워크 사용 가능 |
| **사후조건** | 선택 필터에 맞는 취미 카드가 그리드에 표시됨 |

---

### UC-02: 카테고리 페이지에서 취미 탐색

| 항목 | 내용 |
|------|------|
| **목적** | 특정 대분류(운동형·지능형·예술형) 취미 6종만 집중 탐색 |
| **액터** | Guest, Member |
| **트리거** | Top Bar 카테고리 메뉴 클릭 또는 `/category/[type]` 직접 접근 |
| **사전조건** | `[type]` ∈ `sports`, `intelligence`, `art` |
| **사후조건** | 카테고리명·소개 + 해당 6개 카드 표시 |

---

### UC-03: 북마크 추가

| 항목 | 내용 |
|------|------|
| **목적** | 관심 취미를 저장하여 마이페이지에서 재조회 |
| **액터** | Member |
| **트리거** | HobbyCard의 북마크 버튼 클릭 (미북마크 상태) |
| **사전조건** | 유효 세션, 해당 hobby_id 존재, 미북마크 상태 |
| **사후조건** | `bookmarks` 레코드 생성, UI 아이콘 ON |

---

### UC-04: 북마크 해제

| 항목 | 내용 |
|------|------|
| **목적** | 저장한 취미 관심 해제 |
| **액터** | Member |
| **트리거** | HobbyCard의 북마크 버튼 클릭 (북마크 상태) |
| **사전조건** | 유효 세션, 해당 취미 북마크 존재 |
| **사후조건** | `bookmarks` 레코드 삭제, UI 아이콘 OFF |

---

### UC-05: 마이페이지 조회

| 항목 | 내용 |
|------|------|
| **목적** | 북마크 목록 및 카테고리별 분포 확인 |
| **액터** | Member |
| **트리거** | Top Bar 「마이페이지」 클릭 또는 `/mypage` 접근 |
| **사전조건** | 유효 세션 |
| **사후조건** | 북마크 그리드 + 통계(총 개수·차트) 표시 |

---

### UC-06: 로그인

| 항목 | 내용 |
|------|------|
| **목적** | 회원 인증 및 북마크·마이페이지 이용 권한 획득 |
| **액터** | Guest |
| **트리거** | `/login` 접근, 북마크 시도, 마이페이지(비로그인) 접근 |
| **사전조건** | 가입된 이메일·비밀번호 보유 |
| **사후조건** | 세션 생성, Top Bar 회원 UI 전환 |

---

### UC-07: 회원가입

| 항목 | 내용 |
|------|------|
| **목적** | 신규 계정 생성 |
| **액터** | Guest |
| **트리거** | `/signup` 접근 또는 로그인页 「회원가입」 |
| **사전조건** | 미등록 이메일, 약관 동의 |
| **사후조건** | `users` 레코드 생성(비밀번호 해시), 로그인 유도 |

---

### UC-08: 로그아웃

| 항목 | 내용 |
|------|------|
| **목적** | 세션 종료, 비회원 탐색 모드 복귀 |
| **액터** | Member |
| **트리거** | Top Bar 「로그아웃」 클릭 |
| **사전조건** | 로그인 상태 |
| **사후조건** | 세션 삭제, Guest UI 전환 |

---

## 3. 주요 단계 및 이벤트 흐름 (Main Steps and Flow of Events)

### UC-01: 홈 탐색

| Step | 액터 | 시스템 |
|:----:|------|--------|
| 1 | `/` 접속 | Hero + 18개 HobbyCard 그리드 렌더 |
| 2 | 대분류 필터(전체/운동형/지능형/예술형) 선택 | 클라이언트 필터 적용, 그리드 갱신 |
| 3 | (선택) Top Bar 카테고리 클릭 | UC-02로 분기 |
| 4 | (Member) 북마크 버튼 표시 | 세션 기준 북마크 상태 로드 |

### UC-02: 카테고리 탐색

| Step | 액터 | 시스템 |
|:----:|------|--------|
| 1 | `/category/sports` 등 접근 | URL `[type]` 검증 |
| 2 | — | 카테고리명·소개 문구 표시 |
| 3 | — | 해당 카테고리 6개 HobbyCard 그리드 렌더 |
| 4 | (Member) 북마크 상호작용 | UC-03/04로 분기 |

### UC-03 / UC-04: 북마크 추가·해제

| Step | 액터 | 시스템 |
|:----:|------|--------|
| 1 | 북마크 버튼 클릭 | 세션 검증 |
| 2 | — | `POST /api/bookmarks/toggle` 호출 |
| 3 | — | Supabase insert/delete |
| 4 | — | 성공 응답 → 아이콘 상태 갱신 |

### UC-05: 마이페이지

| Step | 액터 | 시스템 |
|:----:|------|--------|
| 1 | `/mypage` 접근 | 세션 검증 (실패 시 UC-06) |
| 2 | — | `GET /api/bookmarks`, `GET /api/bookmarks/stats` |
| 3 | — | 북마크 카드 그리드 + StatsChart 렌더 |

### UC-06: 로그인

| Step | 액터 | 시스템 |
|:----:|------|--------|
| 1 | 이메일·비밀번호 입력 후 제출 | 클라이언트 형식 검증 |
| 2 | — | NextAuth Credentials 인증 |
| 3 | — | 성공: 세션 쿠키, `/` 또는 이전 페이지 이동 |
| 4 | — | 실패: 폼 하단 에러 메시지 |

### UC-07: 회원가입

| Step | 액터 | 시스템 |
|:----:|------|--------|
| 1 | 이메일·비밀번호·약관 동의 입력 | 클라이언트 검증 |
| 2 | 제출 | `POST /api/auth/signup` |
| 3 | — | bcrypt 해시 후 `users` insert |
| 4 | — | 성공: `/login` 안내 또는 자동 로그인 |

---

## 4. 대체 흐름 및 엣지 케이스 (Alternative Flows and Edge Cases)

| ID | Use Case | 조건 | 대체 흐름 |
|----|----------|------|-----------|
| AF-01 | UC-03 | Guest가 북마크 클릭 | `/login` 리다이렉트 + 안내 |
| AF-02 | UC-05 | Guest가 `/mypage` 접근 | `/login` 리다이렉트 |
| AF-03 | UC-03 | 이미 북마크된 취미 | toggle → 해제(UC-04) |
| AF-04 | UC-02 | 잘못된 `[type]` | 404 또는 「카테고리 없음」 UI |
| AF-05 | UC-05 | 북마크 0건 | 빈 상태 메시지 + 차트 0 |
| AF-06 | UC-06 | 비밀번호 불일치 | 「이메일 또는 비밀번호가 올바르지 않습니다」 |
| AF-07 | UC-07 | 이메일 중복 | 「이미 사용 중인 이메일」 |
| AF-08 | UC-07 | 약관 미동의 | 제출 차단 + 검증 메시지 |
| AF-03~ | 북마크 API | 세션 만료 | 401 → 로그인 유도 |
| AF-09 | UC-01 | 필터 「전체」 | 18개 모두 표시 |

---

## 5. 사전조건과 사후조건 (Preconditions and Postconditions)

| UC | 사전조건 (Pre) | 사후조건 (Post) |
|----|----------------|-----------------|
| UC-01 | 서비스 URL 접근 가능 | 필터된 그리드 표시 |
| UC-02 | 유효 category slug | 6개 카드 + 헤더 표시 |
| UC-03 | Member 세션, 미북마크 | bookmark row 존재, UI ON |
| UC-04 | Member 세션, 북마크 존재 | bookmark row 삭제, UI OFF |
| UC-05 | Member 세션 | 목록·통계 표시 |
| UC-06 | 등록된 계정 | 세션 active, Member UI |
| UC-07 | 미등록 이메일, 약관 동의 | users row 생성 |
| UC-08 | Member 세션 | 세션 없음, Guest UI |

---

## 6. 비즈니스 규칙 및 제약사항 (Business Rules and Constraints)

| ID | 규칙 |
|----|------|
| BR-01 | **비회원**은 북마크·마이페이지 **불가** |
| BR-02 | 취미는 **18종 고정** — 추가·삭제·편집 없음 |
| BR-03 | 동일 `(user_id, hobby_id)` 북마크 **중복 불가** |
| BR-04 | 취미 **상세 페이지 없음** — 카드 정보만 제공 |
| BR-05 | 카테고리는 **3종**만: sports, intelligence, art |
| BR-06 | 비밀번호는 **평문 저장 금지** (bcrypt) |
| BR-07 | 북마크·통계는 **본인 데이터만** 조회 |
| BR-08 | 인증: **이메일 + 비밀번호** (소셜 로그인 없음) |

### 고정 취미 목록

| 카테고리 | 취미 |
|----------|------|
| 운동형 | 조깅/러닝, 요가, 수영, 자전거, 클라이밍, 댄스 |
| 지능형 | 독서, 퍼즐, 체스, 프로그래밍, 외국어 학습, 사진 촬영 |
| 예술형 | 그림 그리기, 악기 연주, 요리, 서예, 도자기 만들기, 정원 가꾸기 |

---

## 7. 예외 처리 절차 (Exception Handling Procedures)

| 예외 | 발생 지점 | 시스템 처리 | 사용자 피드백 |
|------|-----------|-------------|---------------|
| **E-01** DB 연결 실패 | API 전반 | 500 응답, 로그 | 「일시적 오류, 다시 시도」 |
| **E-02** 북마크 저장 실패 | toggle API | 롤백, 이전 UI 유지 | 토스트 error |
| **E-03** 세션 만료 | 북마크·마이페이지 | 401 | 로그인 페이지 이동 |
| **E-04** 로그인 실패 | NextAuth | — | 폼 inline error |
| **E-05** 회원가입 검증 실패 | signup API | 400 | 필드별 error |
| **E-06** 네트워크 단절 | fetch | — | 로딩 후 실패 안내 |
| **E-07** 잘못된 category URL | category page | — | 404 / not-found |

---

## 8. UI 고려사항 (User Interface Considerations)

| 영역 | 요구사항 |
|------|----------|
| **Top Bar** | Guest: 로그인·회원가입 / Member: 마이페이지·로그아웃 |
| **Hero** | 서비스 목적 1~2문장, 비회원·회원 동일 |
| **CategoryFilter** | 선택 탭 active 스타일 (색·굵기) |
| **HobbyCard** | 이미지·제목·설명·카테고리 배지 |
| **BookmarkButton** | OFF: outline / ON: filled, Guest 클릭 시 로그인 유도 |
| **Login/Signup** | 에러 메시지 필드 근처 표시, 상호 링크 |
| **MyPage** | 북마크 0건 empty state, 차트 색상 카테고리 구분 |
| **반응형** | 모바일 그리드 1~2열, 터치 영역 ≥44px |
| **접근성** | 버튼 aria-label, 폼 label 연결 |

---

## 9. 데이터 요구사항 및 데이터 흐름 (Data Requirements and Data Flow)

### 9.1 데이터 엔티티

| 엔티티 | 저장 | 주요 필드 |
|--------|------|-----------|
| **User** | Supabase `users` | id, email, password(hash), created_at |
| **Bookmark** | Supabase `bookmarks` | id, user_id, hobby_id, created_at |
| **Hobby** | `lib/data/hobbies.ts` (정적) | id, title, description, imageUrl, category |

### 9.2 API·데이터 흐름

```text
[Guest/Member Browser]
        │
        ├─ GET  /  ──────────────────► hobbies.ts (정적, 클라이언트)
        │
        ├─ POST /api/auth/signup ───► users INSERT
        │
        ├─ POST /api/auth/signin ───► users SELECT + session
        │
        ├─ POST /api/bookmarks/toggle ► bookmarks INSERT/DELETE
        │                              (user_id from session)
        │
        ├─ GET  /api/bookmarks ──────► bookmarks + hobbies join
        │
        └─ GET  /api/bookmarks/stats ► GROUP BY category count
```

### 9.3 UC별 데이터

| UC | Read | Write |
|----|------|-------|
| UC-01, UC-02 | hobbies (18) | — |
| UC-03 | bookmarks (check) | bookmarks INSERT |
| UC-04 | bookmarks | bookmarks DELETE |
| UC-05 | bookmarks, stats | — |
| UC-06 | users | session |
| UC-07 | users (dup check) | users INSERT |

---

## 10. 보안 및 개인정보 고려사항 (Security and Privacy Considerations)

| 항목 | 조치 |
|------|------|
| **전송** | HTTPS (Vercel 프로덕션) |
| **비밀번호** | bcrypt 해싱, 응답·로그에 평문 미포함 |
| **세션** | NextAuth JWT/쿠키, httpOnly 권장 |
| **인가** | 북마크 API: `session.user.id` 일치 검증 |
| **입력 검증** | email 형식, password 최소 길이, 서버 zod 검증 |
| **SQL** | Supabase parameterized query |
| **XSS** | React 기본 escape, 사용자 입력 HTML 미렌더 |
| **환경변수** | service_role key 서버 전용, `.env` Git 제외 |
| **개인정보** | email만 수집, 북마크는 user_id 연동 |
| **타 사용자 데이터** | user_id 필터로 타인 북마크 접근 차단 |

---

## 부록: Use Case 다이어그램 (개요)

```text
        ┌─────────────┐
        │   Guest     │
        └──────┬──────┘
               │ UC-01, UC-02, UC-06, UC-07
               ▼
        ┌─────────────┐      ┌─────────────┐
        │   System    │◄────►│  Supabase   │
        └──────┬──────┘      └─────────────┘
               │ UC-03~05, UC-08
               ▼
        ┌─────────────┐
        │   Member    │
        └─────────────┘
```

---

*문서 끝*
