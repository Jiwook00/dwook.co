# dwook.co

김지욱의 개인 사이트. 블로그이자 이력서·포트폴리오를 겸합니다.

기술 글, 지금까지 해온 일, 만들고 있는 것들을 한곳에 모아둡니다.
DB나 백엔드, 관리자 UI 없이 글은 로컬에서 마크다운으로 쓰고 git push하면 배포됩니다.

## 기술 스택

- [Astro](https://astro.build) 6 — 정적 사이트 생성, JS 최소 전송
- [Tailwind CSS](https://tailwindcss.com) v4 — CSS 기반 설정 (`src/styles/global.css`)
- TypeScript, MDX, Content Collections (Zod 스키마 검증)
- [Pagefind](https://pagefind.app) — 빌드 타임 정적 검색 인덱스
- [Giscus](https://giscus.app) — GitHub Discussions 기반 댓글
- Pretendard + JetBrains Mono (로컬 번들)
- Cloudflare Pages 배포

## 실행

Node 24 (`.nvmrc` 참고).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # astro check + astro build
npm run preview  # 빌드 결과 확인
```

댓글을 로컬에서 확인하려면 `.env.example`을 `.env`로 복사해 Giscus 값을 채웁니다.

## 문서

- `CLAUDE.md` — 프로젝트 구조와 콘텐츠 규칙
- `GUIDE.md` — 글쓰기·운영 매뉴얼
- `TODO.md` — 남은 작업

## 라이선스

사이트를 만든 코드는 MIT 라이선스를 따릅니다 (`LICENSE`).
[Astro Micro](https://astro-micro.vercel.app/) 테마를 기반으로 하며, 원저작권은 Trevor Lee에게 있습니다.

단, `src/content/` 아래의 글과 이력 등 **콘텐츠는 라이선스 대상이 아니며 무단 사용을 허락하지 않습니다.**
