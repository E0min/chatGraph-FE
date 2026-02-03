# 🧠 Agent Context Map

이 파일은 에이전트(AI)가 작업의 성격에 따라 참조해야 할 **지식, 규정, 상태** 파일의 위치를 안내하는 지도입니다.

## 1. 🎭 Roles (작업자 페르소나)
*작업 시 "누구의 관점"으로 임할 것인지 결정합니다.*

| Role | 파일 경로 | 설명 | 트리거 키워드 |
|---|---|---|---|
| **Frontend Dev** | `rules/roles/frontend_dev.md` | React/Next.js 컴포넌트, 스타일링 | `화면`, `UI`, `컴포넌트`, `Hook` |
| **Backend Dev** | `rules/roles/backend_dev.md` | API 로직, DB 스키마 | `API`, `DB`, `서버` |
| **Architect** | `rules/roles/architect_planner.md` | 기술 구조, 리팩토링, Tech Debt 관리 | `구조`, `설계`, `리팩토링`, `최적화` |
| **Product Manager**| `rules/roles/product_manager.md` | 기획 의도, 시나리오, 우선순위 | `기획`, `요구사항`, `유저` |
| **Designer** | `rules/roles/designer.md` | UI/UX, 디자인 시스템, 인터랙션 | `디자인`, `CSS`, `스타일` |
| **Debugger** | `rules/roles/debugger.md` | 에러 추적, 로깅, RCA(원인분석) | `버그`, `에러`, `고장` |
| **QA Tester** | `rules/roles/qa_tester.md` | 테스트 케이스, 검증, 엣지 케이스 | `테스트`, `QA` |

## 2. 🏛️ Knowledge (배경 지식 & 시스템 정보)
*작업 전 "무엇을 알아야 하는가"를 확인합니다.*

| 구분 | 파일 경로 | 설명 |
|---|---|---|
| **프로젝트 문맥** | `rules/knowledge/project_context/` | 인수인계 자료, 핵심 로직, 비즈니스 배경 (Folder) |
| **디렉토리 맵** | `rules/knowledge/directory_map.md` | 폴더 구조 및 파일 위치 가이드 |
| **기술 스택** | `rules/knowledge/tech_stack.md` | 라이브러리 버전 및 기술 의사결정 (ADR) |
| **용어 사전** | `rules/knowledge/domain_terms.md` | 프로젝트 공용 어휘 (Ubiquitous Language) |

## 3. 🧩 Specs (구현 명세서)
*작업 대상인 "무엇을 만들어야 하는가"를 정의합니다.*

`rules/specs/` 하위에 기능별(Feature)로 디렉토리를 생성하여 관리합니다.
*   `rules/specs/global_api.md` (공통 API 규약)
*   `rules/specs/topic/`
*   `rules/specs/chat/`
*   `rules/specs/_template.md` (명세서 작성 템플릿)

## 4. 🛠️ Ops (운영 정책 및 표준)
*변경 불가능한 "반드시 지켜야 할 운영 규칙"입니다.*

| 정책 | 파일 경로 | 설명 | 필수 적용 |
|---|---|---|---|
| **Git 정책** | `rules/ops/git_policy.md` | 커밋 컨벤션, 브랜치 전략 | **모든 커밋/PR 시** |
| **배포 절차** | `rules/ops/deployment.md` | CI/CD, 배포 체크리스트 | 배포 관련 작업 시 |

## 5. 👣 Track (작업 상태 추적)
*현재 작업의 "진행 상황"을 기록하고 열람합니다.*

| 파일명 | 파일 경로 | 용도 | 업데이트 시점 |
|---|---|---|---|
| **Roadmap** | `rules/track/roadmap.md` | 거시적 할 일 목록, 마일스톤 | 작업 시작/완료 시 |
| **Scratchpad** | `rules/track/scratchpad.md` | 현재 작업의 미시적 메모장, 로그 | 작업 중 수시로 |
| **Memory Log** | `rules/track/memory_log.md` | 문맥 저장소 (Session Dump) | 세션 종료/중단 시 |

## 6. 🧠 Meta (최상위 행동 강령)

*   **`rules/meta/prime_directive.md`**: AI가 따라야 할 절대적인 행동 수칙 및 태도 (The Constitution).
