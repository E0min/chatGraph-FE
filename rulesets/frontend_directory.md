# Frontend Directory Structure Guide

이 문서는 본 프로젝트의 프론트엔드 아키텍처를 정의합니다. **Feature-First Architecture**를 기반으로 하며, 유지보수성과 확장성을 최우선으로 고려한 구조입니다. 다른 프로젝트에서도 이 구조를 그대로 적용할 수 있습니다.

## 1. Top-Level Structure (최상위 구조)

`src` 폴더는 크게 4가지 핵심 영역으로 나뉩니다.

```
src/
├── app/          # Next.js App Router (Routing & Layout only)
├── features/     # 비즈니스 로직의 핵심 (도메인별 분리)
├── shared/       # 전역 공통 요소 (UI, Lib, Utils)
└── views/        # 페이지 조합 레이어 (Feature들을 조립)
```

| 디렉토리 | 설명 | 규칙 |
| :--- | :--- | :--- |
| **`app`** | 라우팅 진입점 | 로직을 최소화하고 `views`의 컴포넌트를 import하여 렌더링만 담당합니다. |
| **`features`** | 도메인 로직 | 기능 단위(예: auth, topic, sidebar)로 격리됩니다. 서로 간의 의존성을 최소화해야 합니다. |
| **`shared`** | 공통 요소 | 특정 도메인에 종속되지 않은 재사용 가능한 UI 컴포넌트(`Button`, `Input`)나 유틸리티(`formatDate`)를 둡니다. |
| **`views`** | 페이지 뷰 | 여러 Feature를 조합하여 실제 사용자에게 보이는 '페이지'를 구성합니다. |

---

## 2. Feature Structure (기능별 구조)

모든 기능(`features/domain-name`)은 동일한 내부 구조를 따릅니다. 이를 통해 개발자는 어떤 기능을 열더라도 어디에 무엇이 있는지 예측할 수 있습니다.

```
src/features/topic/  (예시)
├── api/             # 서버 통신 로직 (API calls)
├── components/      # 해당 기능 전용 UI 컴포넌트
├── hooks/           # 해당 기능 전용 커스텀 훅
└── types/           # 해당 기능 전용 타입 정의 (UI, API types)
```

### 2.1 Component & Hook Mirroring Pattern (핵심 규칙)

**Hooks 디렉토리는 Components 디렉토리의 구조를 거울처럼 반영해야 합니다.**
이 규칙은 "이 훅이 어디서 사용되는지"를 직관적으로 알 수 있게 해줍니다.

**예시:**
```
features/topic/
├── components/
│   ├── conversation/
│   │   ├── index.tsx          (Main Orchestrator)
│   │   └── modals/
│   │       └── topic-selector-modal.tsx
│   └── start-new-topic-form/
│       └── index.tsx
│
└── hooks/
    ├── conversation/
    │   ├── use-question-tree.ts   <-- components/conversation/index.tsx 대응
    │   └── modals/
    │       └── use-topic-selector.ts  <-- components/conversation/modals/... 대응
    └── start-new-topic-form/
        └── use-start-new-topic.ts <-- components/start-new-topic-form/... 대응
```

### 2.2 Directory-as-Component Pattern

복잡하거나 하위 파일이 생길 수 있는 컴포넌트는 폴더를 만들고 `index.tsx`를 사용합니다.

*   **단순 컴포넌트**: `button.tsx`
*   **복잡한 컴포넌트**: `login-form/index.tsx` (이렇게 하면 import 경로가 `.../login-form`으로 깔끔해짐)

---

## 3. Shared Layer (전역 공유)

앱 전체에서 공유되는 자원은 이곳에 모읍니다.

```
src/shared/
├── ui/              # Shadcn UI 등 공용 디자인 시스템 컴포넌트
│   ├── button.tsx
│   ├── dialog.tsx
│   └── ...
└── lib/             # 전역 유틸리티 함수
    ├── utils.ts     # cn() 등 헬퍼
    ├── api.ts       # Axios 인스턴스 등
    └── data-transformer.ts
```

---

## 4. Views Layer (뷰 레이어)

Next.js의 `app` 디렉토리에 비즈니스 로직을 넣지 않고, `views`에서 페이지 단위 컴포넌트를 정의합니다.

```
src/views/
├── login/
│   └── login-view.tsx
├── chat/
│   └── chat-view.tsx
└── ...
```

---

## 5. Summary of Rules (규칙 요약)

1.  **Co-location**: 코드는 그 코드가 사용되는 곳과 가장 가까운 곳에 둔다. (데이터, 상수, 타입 포함)
2.  **Explicit Imports**: `../../` 지옥을 피하기 위해 `@/features/...` 와 같이 절대 경로(Alias)를 적극 활용한다.
3.  **Strict Boundary**: `shared`는 `features`를 import할 수 없다. `features/A`는 `features/B`를 가급적 import하지 않는다 (필요하면 `shared`로 올리거나, 상위 `views`에서 조합).
4.  **Types Separation**: 컴포넌트의 Props는 파일 내부에 두는 것이 기본이지만, **중복되거나 도메인 모델(API 응답 등)인 경우**에는 `types/` 폴더로 분리한다.

---

이 문서는 프로젝트의 아키텍처 강령(Manifesto)으로 작동하며, 새로운 팀원이 합류했을 때 온보딩 가이드로 활용할 수 있습니다.
