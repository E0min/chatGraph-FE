# SDD 프레임워크 — Gemini CLI 온보딩 가이드

> 이 문서는 **Gemini CLI**가 SDD 프레임워크를 이해하고 자신의 어댑터(`.gemini/`)를 점검/보완하기 위한 가이드입니다.
> Claude Code가 작성했습니다.

## 현재 상태

이 프로젝트는 **멀티 AI SDD(Spec-Driven Development) 프레임워크**입니다.
핵심 지식은 AI-agnostic 디렉토리에 저장되고, 각 AI 도구는 자신의 어댑터를 통해 참조합니다.

```
project-root/
├── .agents/             ← ✅ 범용 (AI 공용) — 너도 나도 여기를 참조
│   ├── planner/         기획자 에이전트 (AGENT.md + rules/)
│   ├── designer/        디자이너 에이전트
│   ├── frontend/        프론트엔드 에이전트
│   ├── backend/         백엔드 에이전트
│   ├── workflows/       범용 워크플로우 4개
│   └── skills/          오픈 표준 Agent Skills 4개 (SKILL.md)
│       ├── agent-dispatch/       에이전트 전환
│       ├── spec-gate/            문서 완료 전 코드 금지 ⛔
│       ├── integrity-sync/       코드↔DOCS 무결성 동기화 🔄
│       └── cross-doc-validation/ 교차 정합성 검증 ✅
│
├── DOCS/                ← ✅ 범용 — SDD 문서 체계 (36개 문서)
│   ├── 01_Product/      기획 (6개)
│   ├── 02_Design/       디자인 (6개)
│   ├── 03_Engineering/  엔지니어링 (11개)
│   ├── 04_Technical_Spec/ 기술 상세 (7개)
│   └── 05_System_Architecture/ 시스템 아키텍처 (6개)
│
├── .gemini/             ← 🔧 너의 어댑터
│   ├── GEMINI.md        프로젝트 헌장 (메타데이터 포인터)
│   ├── workflows/       Gemini 전용 워크플로우 (기존 9개)
│   ├── skills/          Gemini 전용 스킬
│   └── templates/       Gemini 전용 템플릿
│
└── .claude/             ← 🔧 Claude 어댑터 (참고용)
    ├── CLAUDE.md
    └── hooks/           Claude 전용 hooks (자동 강제)
```

## 네가 해야 할 일

### 1. `.gemini/GEMINI.md` 확인
- v2.0으로 업데이트 됨. 에이전트 메타데이터 인덱스(섹션 5), DOCS 인덱스(섹션 6), 워크플로우 레지스트리(섹션 7) 추가됨
- `.agents/workflows/`의 4개 범용 워크플로우가 레지스트리에 등록되어 있는지 확인

### 2. `.agents/skills/` 오픈 표준 스킬 확인
- `.agents/skills/`에 4개 스킬(agent-dispatch, spec-gate, integrity-sync, cross-doc-validation)이 있음
- 이 스킬들은 **오픈 표준 Agent Skills 형식**으로, Gemini CLI에서도 동일하게 사용 가능
- Skills는 사용자가 수동 호출하거나 AI가 작업 맥락에서 자동 발견·실행

### 3. `.gemini/workflows/` 보완 검토
- **spec-gate**: DOCS 필수 문서 6개(PRD, UI_UX_GUIDELINES, DESIGN_SYSTEM, CODE_CONVENTIONS, PROJECT_STRUCTURE, GIT_CONVENTIONS) 완성 전 코드 작성 거부
- **integrity-sync**: 코드 변경 후 영향받는 DOCS 자동 업데이트
- **agent-dispatch**: 작업 유형에 따라 `.agents/{role}/` 지식파일 로드

### 4. 자유롭게 보완
- `.gemini/` 하위에 네 방식대로 추가 파일이 필요하면 생성해
- 핵심 원칙: `.agents/`와 `DOCS/`는 건드리지 말고 참조만 해
