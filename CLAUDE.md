# [CLAUDE.md](http://CLAUDE.md)

이 문서와 코드가 다르거나 규칙이 어긋난다면 작업자에게 확인, 질문 한다.

## 이 프로젝트는

`dwook.co` — 김지욱(소프트웨어 개발자)의 개인 사이트. **블로그이자 이력서/포트폴리오 대용**을 겸한다. 기술 글·자기소개·사이드 프로젝트·경력을 한곳에서 보여준다.

- DB·백엔드·관리자 UI **없음**. 글은 로컬에서 `.md`/`.mdx` 파일로 쓰고 git push → 자동 배포.
- 톤: 한국어, 존댓말. 미니멀하고 과설계 없는 결과물을 지향한다.

## 기술 스택

- **Astro 6** (정적 사이트, JS 최소 전송) / **Node 24**
- **Tailwind CSS v4** — `@tailwindcss/vite` + CSS 기반 설정 (`src/styles/global.css`의 `@theme`). `tailwind.config.js` 없음.
- **TypeScript**, **MDX**, Astro **Content Collections** (Zod 스키마 검증)
- 검색 **Pagefind** (`astro-pagefind`, 빌드 타임 정적 인덱스)
- 댓글 **Giscus** (GitHub Discussions)
- 폰트: **Pretendard**(본문 sans-serif) + **JetBrains Mono**(mono). `@fontsource`/`pretendard` npm 패키지로 로컬 번들.
- 배포: **Cloudflare Pages** (git push 자동 배포)

> 베이스 템플릿은 **astro-micro**. 기획서(`블로그구축기획서.md`)의 "스타일 nano + 기능 micro" 구상과 달리 실제로는 micro를 그대로 쓴다. **기획서는 참고용 히스토리이며 현재 상태와 다르다.**

## 명령어

| 명령어            | 하는 일                                       |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | 로컬 미리보기 (`http://localhost:4321`)       |
| `npm run build`   | `astro check`(타입/오류 검사) + `astro build` |
| `npm run preview` | 빌드 결과 로컬 확인                           |

## 구조

```
src/
├── consts.ts            # 사이트 메타(SITE/HOME/BLOG/WORK/PROJECTS), SOCIALS
├── types.ts             # 위 상수들의 타입
├── content.config.ts    # 콘텐츠 컬렉션 Zod 스키마 (blog/projects/work)
├── content/
│   ├── blog/<slug>/index.md      # 블로그 글 (slug 폴더명 = URL)
│   ├── projects/<slug>/index.md  # 프로젝트
│   └── work/<slug>/index.md      # 경력
├── layouts/Layout.astro # 공통 레이아웃 (Head/Header/Footer/Pagefind)
├── components/          # ArrowCard, TableOfContents, PostNavigation, Giscus 등
├── lib/utils.ts         # cn(), formatDate(), dateRange(), readingTime()
├── pages/               # 라우트 (아래)
└── styles/global.css    # Tailwind v4 @theme, 컬러/폰트/prose/shiki 토큰
```

**라우트**: `/`, `/about`, `/blog` + `/blog/[...id]`, `/projects` + `/projects/[...id]`, `/work`, `/tags` + `/tags/[...id]`, `/404`, `/rss.xml`

> `/about`은 내용이 채워질 때까지 **헤더 내비게이션에서 빼둔 상태**다 (페이지·라우트는 살아 있음). `Header.astro`의 주석 자리에 링크 한 줄을 되돌리면 다시 노출된다.

**임포트 alias**: `@components`, `@layouts`, `@lib`, `@consts`, `@types` (tsconfig)

## 콘텐츠 규칙

전부 폴더 기반 — `src/content/<컬렉션>/<slug>/index.md`. 폴더명이 URL slug. 이미지는 같은 폴더에 넣고 `./image.jpg` 상대경로로 참조.

**blog** (blog는 `01-`, `02-` 숫자 프리픽스로 정렬/관리):

```yaml
title: string # 필수
description: string # 필수 (목록·검색·SNS 요약)
date: "YYYY-MM-DD" # 필수
tags: [string] # 선택
draft: true # 선택, true면 비공개
```

**projects**: `title`/`description`/`date` 필수, `demoURL`/`repoURL`/`draft` 선택. URL을 채우면 카드에 링크 버튼이 붙는다.

**work**: `company`/`summary`(회사·서비스 한 줄 설명)/`role`/`dateStart`/`stack`(기술 배열) 필수, `dateEnd` 필수(날짜 또는 `"재직 중"` 같은 문자열 허용), `highlights`(프로젝트 제목 배열) 선택. `dateStart` 기준 최신순 정렬.

`/work`는 frontmatter만 보여주는 간단한 이력(회사·역할·기간·`highlights`·`stack`)이고, 홈에는 work를 노출하지 않는다. 상세 이력은 `public/resume.pdf`로 내려받게 한다. md 본문은 현재 렌더링되지 않는다(기록용).

> 필수 frontmatter가 비면 `astro check`/빌드가 **실패**한다. 스키마 변경은 `content.config.ts`에서.

## 디자인 시스템

- 배경 **stone** 팔레트 (`bg-stone-100` / `dark:bg-stone-900`), 텍스트는 `black/50`·`white/75`
- 링크 hover 액센트 **amber** (`amber-700/50` / `amber-500/60`)
- 다크모드는 `.dark` 클래스 기반 (`@custom-variant dark`)
- 본문은 `article` = Tailwind `prose prose-stone`
- 코드 하이라이트: Shiki `css-variables` 테마 → 색상 토큰은 `global.css`의 `--astro-code-*` 로 직접 정의
- 진입 애니메이션: `.animate` → 스크롤 시 `.show` 부여

미니멀함을 유지하되 컬러·타이포 정도로만 아이덴티티를 준다. 과한 장식은 지양.

## 사이트 정보 수정 위치

- 사이트 제목·설명·이메일·홈 노출 개수·소셜 링크 → `src/consts.ts`
- About 본문 → `src/pages/about.astro` (HTML 태그는 두고 안쪽 글자만)
- 홈 소개 문단 → `src/pages/index.astro`

## 참고

- 운영/글쓰기 매뉴얼: `GUIDE.md`
- 초기 기획 히스토리: `블로그구축기획서.md` (**현재 코드와 일부 상이**)
- 미완성 항목·채워야 할 placeholder: `TODO.md`

> `TODO.md`와 `블로그구축기획서.md`는 개인 작업 메모라 `.gitignore`로 제외했다. 로컬에만 있고 레포에는 없다.
