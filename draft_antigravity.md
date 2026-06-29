# SDD 프레임워크 — Antigravity 온보딩 가이드

> 이 문서는 **Antigravity**가 SDD 프레임워크를 이해하고 자신의 어댑터를 구축하기 위한 가이드입니다.
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
├── .gemini/             ← 🔧 Gemini 어댑터 (참고용)
│   ├── GEMINI.md        
│   ├── workflows/       Gemini 워크플로우
│   ├── skills/          Gemini 스킬
│   └── templates/       Gemini 템플릿
│
├── .claude/             ← 🔧 Claude 어댑터 (참고용)
│   ├── CLAUDE.md
│   └── hooks/           Claude 전용 hooks (자동 강제)
│
└── .antigravity/        ← 🔧 네가 만들 어댑터 (아직 없음)
```

## 네가 해야 할 일

### 1. `.antigravity/` 어댑터 생성 (또는 네 방식에 맞는 설정)
- Antigravity가 프로젝트 설정으로 어떤 파일/디렉토리를 사용하는지에 맞춰 구성
- `.claude/CLAUDE.md`나 `.gemini/GEMINI.md`를 참고하여 네 버전의 프로젝트 헌장 작성
- 핵심: `.agents/`와 `DOCS/`를 **참조**하되 직접 수정하지 않음

### 2. 포함해야 할 핵심 내용
- **에이전트 메타데이터**: `.agents/` 인덱스 (4개 에이전트의 디렉토리, 역할, 트리거)
- **Skills 레지스트리**: `.agents/skills/`의 4개 오픈 표준 스킬 → Antigravity에서도 동일하게 사용 가능
- **DOCS 인덱스**: 36개 문서의 경로와 1줄 요약
- **강제 규칙**: No Documentation No Code (spec-gate 연계)

### 3. 핵심 규칙 3가지
1. **spec-gate**: DOCS 필수 문서 6개 완성 전 코드 작성 거부
   - `PRD.md`, `UI_UX_GUIDELINES.md`, `DESIGN_SYSTEM.md`, `CODE_CONVENTIONS.md`, `PROJECT_STRUCTURE.md`, `GIT_CONVENTIONS.md`
2. **integrity-sync**: 코드 변경 후 영향받는 DOCS 자동 업데이트
3. **agent-dispatch**: 작업 유형에 따라 `.agents/{role}/` 지식파일 로드

### 4. 각 AI 어댑터의 역할 (참고)
| AI 도구 | 강제성 메커니즘 | 스킬 사용 |
|---------|--------------|----------|
| Gemini CLI | `.gemini/workflows/` | `.agents/skills/` (오픈 표준) |
| Claude Code | `.claude/hooks/` | `.agents/skills/` (오픈 표준) |
| Antigravity | 네가 결정 | `.agents/skills/` (오픈 표준) |

### 5. 자유롭게 보완
- Antigravity만의 방식으로 워크플로우를 구현해도 됨
- 핵심 원칙: `.agents/`와 `DOCS/`는 **공용 영역** — 참조만 하고 구조를 변경하지 않기
