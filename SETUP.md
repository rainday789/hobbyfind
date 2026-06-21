# HobbyFind 로컬/배포 설정 체크리스트

## 1. Supabase DB 마이그레이션

Supabase Dashboard → SQL Editor에서 아래 파일 순서대로 실행:

1. `supabase/migrations/0001_create_users_table.sql`
2. `supabase/migrations/0002_create_bookmarks_table.sql`

실행 후 Table Editor에서 `users`, `bookmarks` 테이블 생성 확인.

## 2. 환경변수 (.env.local)

`.env.local` 파일에 **5개** 변수가 모두 채워져 있어야 합니다.

| 변수 | 설정 위치 |
|------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Connect → App Frameworks |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Connect → App Frameworks |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → service_role (Reveal) |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` 또는 Node crypto |
| `NEXTAUTH_URL` | 로컬: `http://localhost:3000` |

> `.env.local`은 Git에 올리지 마세요.

## 3. 로컬 실행

```bash
npm install
npm run dev
```

브라우저: http://localhost:3000

## 4. 기능 테스트 순서

1. 홈 / 카테고리 페이지 탐색 (비로그인)
2. 회원가입 → 로그인
3. 취미 북마크 추가/해제
4. 마이페이지 통계 확인
5. 로그아웃

## 5. GitHub 제출

```bash
git init
git add .
git commit -m "Initial commit: HobbyFind 중급 파이널 프로젝트"
git remote add origin https://github.com/YOUR_USERNAME/hobbyfind.git
git push -u origin main
```

## 6. Vercel 배포

1. Vercel → Import Git Repository → hobbyfind
2. Environment Variables에 `.env.local`과 **동일한 5개** 설정
3. `NEXTAUTH_URL`을 Vercel 배포 URL로 변경 (예: `https://hobbyfind.vercel.app`)
4. Deploy 후 **프로덕션에서 회원가입부터 전체 재테스트**

## 7. 최종 제출 (2가지)

- GitHub 저장소 링크 (또는 ZIP, `.env*` 제외)
- Vercel 배포 URL

제출 폼: https://forms.gle/FsXP4XFSm2HwWRYF8
