import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  TITLE: "dwook.co",
  DESCRIPTION:
    "김지욱 — 백엔드·인프라 개발자. 경력과 프로젝트, 기술 글을 모아둔 사이트.",
  EMAIL: "jwkim775@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "김지욱의 개인 사이트 — 경력, 프로젝트, 기술 글.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "개발하면서 배운 것들을 기록합니다.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "어디서 무슨 일을 해왔는지.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "만들고 있는 것들 — 프로젝트 모음.",
};

export const SOCIALS: Socials = [
  {
    NAME: "GitHub",
    HREF: "https://github.com/Jiwook00",
  },
];
