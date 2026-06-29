# 상태 관리 설계 (State Management)

## 1. 개요
`chatGraph-FE-local`은 복잡한 트리 형태의 채팅 데이터 및 UI 상호작용 상태를 다루어야 합니다. 이를 효과적으로 분리하고 관리하기 위해 상태의 목적에 따라 관리 도구를 이원화합니다.

## 2. Server State (서버 상태 관리)
서버 데이터 동기화, 캐싱, 무효화 처리는 **TanStack Query v5**가 전담합니다.

- **도구**: `@tanstack/react-query`
- **사용처**:
  - 질문 트리의 노드 이력 페칭
  - 토픽 목록 조회 및 토픽 생성/수정/삭제 등
  - 사용자 세션 및 Auth 데이터 동기화
- **전략**:
  - API 페칭은 커스텀 훅단(`useTreeData`, 등)으로 캡슐화하여 사용.
  - 새 대화 생성 시 Mutate 중에는 `Optimistic Update` 규칙을 사용하여 화면에 즉각 표시하고, API 에러 시 Rollback.

## 3. Global Client State (클라이언트 전역 상태)
앱 전반에 걸쳐 공유되어야 하나 서버에 종속적이지 않은 상태는 **Zustand**가 전담합니다.

- **도구**: `zustand`
- **주요 Store**:
  - `useTopicStore`: 현재 유저가 포커스하고 있는 대상 토픽(Topic ID, Topic Name 등)의 정보를 담아 상단 헤더, 사이드바, 캔버스 간의 컨텍스트를 동기화합니다.
- **전략**:
  - 보일러플레이트를 낮추기 위해 슬라이스(Slice) 패턴을 권장하거나 Store 분리.
  - 리소스를 아끼기 위해 선택적 구독(Selector) 활용.

## 4. Local / Context State (종속 상태)
컴포넌트의 특정 트리에만 종속되는 상태는 리액트 내장 Context API 및 Local State로 다룹니다.

- **주요 Context**:
  - `QuestionTreeContext`: TopicChatView 및 TopicGraphView 하위 트리에 현재 탐색 경로(`currentPath`) 및 뷰 모드 정보, 데이터를 Provider로 공급.
  - 전역 스토어 접근을 최소화하고 특정 기능 구역의 응집도를 높이기 위함입니다.
