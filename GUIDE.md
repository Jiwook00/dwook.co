# dwook.co 운영 가이드

블로그를 직접 쓰고 고칠 때 필요한 것

---

## 0. 기본 흐름 (딱 3단계)

이 블로그는 **DB도 관리자 화면도 없습니다.** 글은 파일로 씁니다.

```
1. 로컬에서 .md 파일을 쓰거나 고친다
2. 미리보기로 확인한다   → npm run dev
3. git push 하면 자동 배포된다
```

로컬 미리보기 서버 켜는 법:

```bash
npm run dev
```

→ 브라우저에서 `http://localhost:4321` 접속. 파일을 저장하면 화면이 자동으로 새로고침됩니다. 끌 때는 터미널에서 `Ctrl + C`.

---

## 1. 새 글 쓰기

### 1) 폴더 만들기

`src/content/blog/` 안에 **새 폴더**를 하나 만듭니다. 폴더 이름이 곧 글의 주소(URL)가 됩니다.

```
src/content/blog/02-my-first-cafe/
```

→ 주소는 `dwook.co/blog/02-my-first-cafe` 가 됩니다.
(맨 앞 숫자는 순서 정렬용. 안 붙여도 되지만 붙이면 관리가 편합니다.)

### 2) 폴더 안에 `index.md` 파일 만들기

맨 위 `---` 사이 구역이 **글 정보(frontmatter)** 입니다. 여기만 규칙을 지키면 됩니다.

```markdown
---
title: "글 제목"
description: "목록·검색·SNS 공유에 쓰이는 한 줄 요약"
date: "2026-08-25"
tags: ["커피", "회고"]
---

여기서부터 본문입니다. 그냥 마크다운으로 쓰면 됩니다.

## 소제목

- 목록도 되고
- **굵게**, _기울임_, [링크](https://example.com) 다 됩니다.
```

| 항목          | 필수 | 설명                                        |
| ------------- | ---- | ------------------------------------------- |
| `title`       | ✅   | 글 제목                                     |
| `description` | ✅   | 한 줄 요약                                  |
| `date`        | ✅   | 날짜. `"YYYY-MM-DD"` 형식                   |
| `tags`        |      | 태그 목록. 없으면 생략 가능                 |
| `draft`       |      | `true` 로 두면 **공개 안 됨** (초안 보관용) |

> ⚠️ 필수 항목이 비면 빌드가 실패합니다. 날짜 형식(`"2026-08-25"`)과 따옴표를 꼭 지켜주세요.

### 3) 이미지 넣기

글 폴더 안에 이미지 파일을 같이 넣고, 본문에서 상대경로로 부릅니다.

```
src/content/blog/02-my-first-cafe/
├── index.md
└── cafe.jpg
```

```markdown
![카페 전경](./cafe.jpg)
```

---

## 2. 프로젝트 추가하기

블로그 글과 똑같은 방식입니다. 위치만 `src/content/projects/` 입니다.

```
src/content/projects/새-프로젝트/index.md
```

```markdown
---
title: "프로젝트 이름"
description: "한 줄 소개"
date: "2026-08-25"
demoURL: "https://데모주소.com" # 없으면 "" 로 비워두기
repoURL: "https://github.com/..." # 없으면 "" 로 비워두기
---

프로젝트 설명 본문.
```

`demoURL` / `repoURL` 을 채우면 카드에 링크 버튼이 붙습니다.

---

## 2-1. 경력(Work) 추가·수정하기

홈 화면의 **Work** 섹션에 나오는 경력입니다. 위치는 `src/content/work/` 이고, 방식은 글·프로젝트와 같습니다.

```
src/content/work/회사이름/index.md
```

```markdown
---
company: "회사 이름"
role: "직무 (예: 백엔드 개발자)"
dateStart: "2023-01-01"
dateEnd: "2026-02-01" # 재직 중이면 "재직 중" 처럼 글자로 써도 됩니다
---

이 회사에서 한 일 설명. 마크다운으로 자유롭게.
```

- 최신 경력이 위로 오도록 `dateStart` 기준으로 자동 정렬됩니다.
- `dateEnd` 는 날짜(`"2026-02-01"`) 또는 `"재직 중"` 같은 글자 둘 다 됩니다.

> 지금 들어있는 **CodiPlay** 항목은 입사일·직무가 임시값(placeholder)입니다. `src/content/work/codiplay/index.md` 를 열어 실제 정보로 고쳐주세요.

---

## 3. 사이트 기본 정보 고치기

### 제목·소개·이메일 → `src/consts.ts`

사이트 이름, 설명, 이메일, 홈/블로그/프로젝트 페이지 문구가 여기 다 모여 있습니다.

```ts
export const SITE = {
  TITLE: "dwook.co",
  DESCRIPTION: "…",
  EMAIL: "jwkim775@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 5, // 홈에 보여줄 최근 글 개수
  NUM_PROJECTS_ON_HOMEPAGE: 3, // 홈에 보여줄 최근 프로젝트 개수
};
```

**소셜 링크**도 같은 파일 아래쪽 `SOCIALS` 에서 고칩니다. GitHub 주소 등을 여기서 바꾸세요.

```ts
export const SOCIALS = [
  { NAME: "GitHub", HREF: "https://github.com/내아이디" },
];
```

### 자기소개 페이지 → `src/pages/about.astro`

About 페이지 내용은 이 파일의 한글 문장을 직접 고치면 됩니다. HTML 태그(`<p>`, `<li>` 등)는 그대로 두고 그 **안의 글자만** 바꾸면 안전합니다.

### 홈 화면 문구 → `src/pages/index.astro`

첫 화면 소개 문단도 마찬가지로 `<p>` 안 글자만 고치면 됩니다.

---

## 4. 배포하기

```bash
git add .
git commit -m "새 글: 첫 카페 이야기"
git push
```

push 하면 연결된 호스팅(Vercel 등)이 **자동으로 다시 배포**합니다. 몇 분 뒤 dwook.co 에 반영됩니다.

> 아직 git 저장소·배포가 연결되지 않았다면, 그 설정을 먼저 한 번 해두어야 합니다. (기획서 7번 항목)

---

## 5. 댓글 기능 켜기 (Giscus, 최초 1회)

댓글은 GitHub Discussions로 동작합니다. 아직 미설정이라 지금은 댓글창이 **안 보입니다.** 켜려면:

1. 댓글을 저장할 **공개 GitHub 저장소**를 하나 준비하고 Discussions 기능을 켠다.
2. [https://giscus.app](https://giscus.app) 에 저장소 주소를 넣으면 값 4개를 알려준다.
3. 프로젝트 루트에 `.env` 파일을 만들고 그 값을 넣는다:

```
PUBLIC_GISCUS_REPO=내아이디/저장소이름
PUBLIC_GISCUS_REPO_ID=…
PUBLIC_GISCUS_CATEGORY=…
PUBLIC_GISCUS_CATEGORY_ID=…
```

1. 배포 플랫폼(Vercel 등)의 환경변수에도 같은 4개를 등록한다.

→ 네 값이 모두 채워지면 글 하단에 댓글창이 자동으로 나타납니다.

---

## 6. 자주 쓰는 명령어

| 명령어            | 하는 일                            |
| ----------------- | ---------------------------------- |
| `npm run dev`     | 로컬 미리보기 (글 쓰면서 확인용)   |
| `npm run build`   | 실제 배포용으로 빌드 + 오류 검사   |
| `npm run preview` | 빌드 결과를 로컬에서 실제처럼 확인 |

> 글이 화면에 안 보인다면? → `draft: true` 로 되어 있거나, `date` 형식이 틀렸거나, frontmatter 따옴표가 빠졌을 가능성이 큽니다. `npm run build` 를 돌리면 어디가 문제인지 알려줍니다.

---

## 요약 한 장

- **글쓰기** = `src/content/blog/폴더/index.md` 만들기
- **프로젝트** = `src/content/projects/폴더/index.md` 만들기
- **경력(Work)** = `src/content/work/폴더/index.md` 만들기
- **사이트 정보** = `src/consts.ts`
- **자기소개** = `src/pages/about.astro`
- **배포** = `git push`
