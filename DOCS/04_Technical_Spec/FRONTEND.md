# Frontend Technical Specification (FE Spec)

## 1. 개요 (Overview)
`chatGraph-FE-local` 프론트엔드는 사용자가 질문/응답(대화) 트리를 선형적인 채탕 형태와 비선형적인 그래프 형태로 상호작용할 수 있도록 돕는 React 기반 웹 애플리케이션입니다.

## 2. 기술 스택 (Tech Stack)
- **Core Framework**: Next.js 15 (App Router 방식)
- **Language**: TypeScript (엄격한 타입 시스템 관리)
- **Styling**: Tailwind CSS 4, `clsx` & `tailwind-merge` (`cn` 유틸리티)
- **UI Components**: Radix UI (Headless 기반 권장)
- **Visualization**: D3.js (그래프 렌더링을 위한 코어 엔진)
- **Data Fetching**: TanStack Query (React Query v5)
- **State Management**: Zustand (전역 상태 관리)

## 3. 핵심 아키텍처 (Feature-Sliced Design)
비즈니스 로직 캡슐화를 위해 FSD(Feature-Sliced Design)를 차용한 구조를 채택하고 있습니다.

### 디렉토리 구조 룰
```text
src/
├── app/       # Next.js 라우팅 진입점 및 전역 레이아웃
├── views/     # 페이지 단위의 조합 컨테이너 화면 (Page Assembly)
├── features/  # 도메인 기반 분리 구역 (topic, auth, chat, sidebar, share 등)
├── shared/    # 재사용성이 보장되는 공통 컴포넌트, 유틸, UI Kit
└── constants/ # 상수 관리
```

### 아키텍처 철학
1. `app/`의 라우터 파일(`page.tsx`)은 가장 얇은 진입점 역할만 수행하며, 곧바로 `views/` 의 컨트롤러 컴포넌트를 호출합니다.
2. `features/` 내부 컴포넌트는 다른 feature에 강결합되지 않아야 합니다. (단방향 의존성)
3. UI Kit 및 범용 도구는 무조건 `shared/` 에 위치합니다.

## 4. 컴포넌트 데이터 페칭 전략
Next.js 15 App router 기능을 최대한 이용하여, API 의존적인 Client 컴포넌트들은 `Tanstack Query`를 활용해 캐싱 및 백그라운드 재페칭 처리합니다. 

## 5. 최적화 및 렌더링 전략 (Rendering Strategy)
- 질문 트리를 구성할 때 낙관적 업데이트(Optimistic Updates)를 수행하여 레이턴시를 숨기고 사용자 경험을 증대시킵니다. (ex: `OptimisticChatView`)
- D3.js 기반 그래프 뷰의 경우, Canvas나 SVG 렌더링의 성능 저하를 방지하기 위해 React 생명주기 외부에서 DOM 컨트롤을 브릿지하는 방식을 준수해야 합니다.
