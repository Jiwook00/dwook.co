---
company: "마로마브"
summary: "교육 플랫폼"
role: "백엔드 개발자"
dateStart: "2021-08-01"
dateEnd: "2025-07-01"
stack:
  ["NestJS", "TypeORM", "PostgreSQL", "AWS", "GitHub Actions", "CloudWatch"]
highlights:
  - "공유 프로젝트 조회 API 슬로우 쿼리 개선"
  - "교육청 소속 판별을 위한 DB 구조 개선"
  - "Firebase → PostgreSQL 마이그레이션 및 API 서버 재구축"
---

## 공유 프로젝트 조회 API 슬로우 쿼리 개선

2022.12\
PostgreSQL · TypeORM · NestJS · AWS RDS · CloudWatch

- **문제 상황**
  - 서울·인천 출강 수업이 몰리는 오전 시간대에 RDS CPU가 100%에 도달하고 서버가 응답하지 못하는 상황이 반복됨
  - EXPLAIN ANALYZE로 공유 프로젝트 목록 API를 병목으로 특정: 좋아요·다운로드 수 집계가 인덱스 없이 테이블을 전체 스캔하고, 페이지네이션이 조인 결과 전체를 정렬한 뒤에 적용됨
- **해결 과정**
  - 집계 대상 FK 컬럼(`likes.user_project_id`, `download_logs.user_project_id`)과 `is_shared`에 인덱스 추가
  - 페이지에 해당하는 프로젝트 id만 서브쿼리로 먼저 뽑은 뒤 조인하도록 쿼리 구조 변경
- **주요 성과**
  - 쿼리 실행 시간 2.71초 → 5.78ms (EXPLAIN ANALYZE 기준)
  - API 응답 시간 1.48초 → 0.14초 (단건 요청 기준)
  - 배포 후 매일 오전 반복되던 RDS CPU 100% 피크가 사라지고 10% 내외로 안정 (CloudWatch, 배포 전후 1주 비교)

## 교육청 소속 판별을 위한 DB 구조 개선

2023.06\
PostgreSQL · TypeORM · NestJS

- **문제 상황**
  - 서울·인천 교육청 MS 로그인을 도입한 뒤, 유저의 소속 교육청을 판별하려면 users → departments → managers → ministry_tenants를 이메일 도메인 LIKE 매칭으로 조인해야 함
  - 유저 조회 API 응답이 4초를 넘고, 교육청별 이용 통계 쿼리도 복잡해짐
- **해결 과정**
  - 교육청을 `ministries` 테이블로 분리해 문자열 중복을 없애고, 교육청이 추가되어도 스키마 변경 없이 대응할 수 있게 설계
  - `users`·`managers`에 `ministry_id` FK를 두어 소속을 직접 조회하도록 변경하고, 기존 데이터는 SQL로 백필
- **주요 성과**
  - 유저 조회 API 응답 시간 4.06초 → 124ms (단건 요청 기준)
  - 교육청별 유저 집계를 단일 조인으로 조회 가능

## Firebase → PostgreSQL 마이그레이션 및 API 서버 재구축

2021.09 – 2021.12\
NestJS · TypeORM · PostgreSQL · Firebase

- **문제 상황**
  - Firebase(NoSQL) 기반으로 운영되던 서비스에서 복잡한 관계형 데이터 처리의 한계가 명확해짐
  - 별도 API 서버 없이 클라이언트가 Firebase에 직접 접근하는 구조로 확장성 문제 발생
- **해결 과정**
  - Firestore 컬렉션 10개를 관계형 스키마로 재설계: 문서 안 배열(좋아요 유저 목록)은 조인 테이블로, 학급의 교사 목록 배열은 FK로 분리하고, 원본 문서 ID는 `legacy_id` 컬럼에 보존해 관계 매핑과 추적에 사용
  - NestJS 기반 RESTful API 서버 구축
  - 주말 사용량이 거의 없는 교육 서비스 특성상, 무중단 이관을 구현하는 복잡도보다 주말에 공지 후 서비스를 중단하고 일괄 이관하는 편이 위험이 적다고 판단. 이관 스크립트 전 과정에 로깅을 적용해 실패 건을 추적·재처리
- **주요 성과**
  - 클라이언트 직접 접근 구조를 API 서버 경유 구조로 전환
  - 관계형 DB 기반 API 서버로 이후 기능 개발 토대 마련

## 웹/앱 서비스 백엔드 개발 및 인프라 운영

2022.01 – 2025.07\
AWS · GitHub Actions · AWS CodeDeploy · CloudWatch

- **담당 업무**
  - 교육 플랫폼의 백엔드 API 개발과 AWS 인프라를 구축·운영
  - GitHub Actions + AWS CodeDeploy를 활용한 무중단 자동 배포 파이프라인 구성
  - CloudWatch 지표·알람을 Slack과 연결해 서비스 상태를 모니터링하고 장애에 대응
  - 사내 발표 문화(24절기톡)를 기획·운영해 개발·디자인 등 다양한 주제의 정기 발표를 진행
