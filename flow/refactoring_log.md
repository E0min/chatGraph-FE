# Refactoring & Design Decisions Log

이 문서는 프로젝트 진행 과정에서 마주친 문제들과 그에 대한 기술적 의사결정, 리팩토링 과정을 기록합니다.

## 1. 데이터 페칭 전략 (TanStack Query vs useEffect)

### ❓ 고민 포인트
Next.js 환경에서 데이터를 가져올 때 `useEffect`와 `fetch` 조합을 사용할지, `TanStack Query`를 도입할지 고민하였습니다.

### 💡 해결 방안
**TanStack Query**를 채택하였습니다.
- **이유**:
  - `useEffect` 사용 시 로딩(`isLoading`), 에러(`isError`), 데이터(`data`) 상태를 일일이 `useState`로 관리해야 하는 Boilerplate가 발생함.
  - TanStack Query는 **캐싱**, **중복 요청 방지**, **자동 갱신**, **Race Condition 방지** 등 서버 상태 관리에 필수적인 기능을 기본 제공함.
  - 단순한 마운트 시점 실행이 아닌, 지속적인 "데이터 동기화" 관점에서 Query가 압도적으로 유리함.

---

## 2. 프론트엔드 아키텍처 (Feature-First Architecture)

### ❓ 고민 포인트
컴포넌트가 많아지면서 `src/components`, `src/pages` 같은 고전적인 구조로는 어떤 파일이 어디에 속하는지 파악하기 어려워졌습니다.

### 💡 해결 방안
**Feature-First Architecture**를 도입하여 관심사를 명확히 분리했습니다.

| 디렉토리 | 역할 | 규칙 |
| :--- | :--- | :--- |
| **`app`** | 라우팅 & 레이아웃 | 비즈니스 로직 포함 금지. 순수하게 경로 진입점 역할만 수행. |
| **`features`** | 도메인 로직 | 기능 단위 격리 (예: `topic`, `auth`). 내부에서 필요한 api, hooks, types를 응집. |
| **`views`** | 페이지 조립 | 여러 Feature를 조합하여 실제 사용자에게 보이는 페이지를 구성. |
| **`shared`** | 공용 요소 | 도메인에 종속되지 않는 UI(`Button`)나 유틸리티(`formatDate`). |

---

## 3. ChatView 로직 분리 (View Layer Refactoring)

### ❓ 문제점
`views/chat/chat-view.tsx` 파일 내부에 데이터 페칭 로직, 로딩 처리(`Suspense`), UI 렌더링이 뒤섞여 있어 가독성이 떨어졌습니다.

### 💡 해결 방안
**책임 분리 원칙**에 따라 컴포넌트를 분리했습니다.
- **`TopicPageContent` (Feature Layer)**: 실제 데이터를 가져오고(`useTopicData`), 화면을 그리는 비즈니스 로직 담당. (`features/topic/components`로 이동)
- **`ChatView` (View Layer)**: 오직 `Suspense`를 통한 로딩 처리와 Feature 컴포넌트를 import해서 보여주는 껍데기 역할만 수행.

---

## 4. Topic 컴포넌트 복잡도 해결 (God Component Decomposition)

### ❓ 문제점
`features/topic/components/conversation/index.tsx` 파일이 **340줄**에 달하며 너무 많은 책임을 지고 있었습니다.
- 뷰 전환 (Chat vs Graph)
- 그래프 렌더링
- 채팅 UI 렌더링
- 전역 모달/알림창 (이동, 분리, 공유 등) 관리

### 💡 해결 방안
기능별로 파일을 잘게 쪼개어(Decomposition) 각 컴포넌트의 역할을 명확히 했습니다.

1.  **`TopicGlobalDialogs.tsx`**: 자리만 차지하던 긴 `AlertDialog` 코드들을 별도 파일로 격리.
2.  **`TopicChatView.tsx`**: 채팅 목록, 입력폼 등 채팅 모드 UI만 담당.
3.  **`TopicGraphView.tsx`**: D3 그래프 시각화 모드 UI만 담당.
4.  **`index.tsx`**: `viewMode`에 따라 알맞은 컴포넌트를 보여주는 단순한 **Orchestrator**로 변경 (340줄 -> 45줄).

---

## 5. TopicChatView 최적화 및 Lint 수정

### ❓ 문제점
리팩토링 과정에서 `TopicChatView.tsx` 내에 불필요한 영문 주석(CoT 흔적)이 남았고, `useQuestionTreeContext` 훅을 콜백 함수 내부에서 호출하여 **React Hook 규칙 위반(Lint Error)**이 발생했습니다.

### 💡 해결 방안
- **Why**: 파일 이동 시 경로 수정 비용을 최소화하고, 파일의 위치를 명확하게 파악하기 위함입니다.
- **[추가] `QuestionTreeContext.tsx` 삭제**: `QuestionTreeProvider`를 사용하지 않게 됨에 따라 Context 정의를 hook 파일(`use-question-tree-context.ts`)로 이관하고 해당 파일은 삭제했습니다.
- **주석 정리**: 불필요한 영문 사고 과정 주석을 모두 제거하고, 한글로 간결하게 핵심만 남겼습니다.
- **Hook 규칙 준수**: `navigateToQuestion` 함수를 컴포넌트 최상단에서 구조 분해 할당(Destructuring)으로 미리 꺼내와서 사용함으로써 렌더링 에러를 해결했습니다.

---

## 9. Context와 Custom Hook 분리

### ❓ 문제점
`QuestionTreeContext.tsx` 파일에 Context 정의, Provider, 그리고 이를 사용하는 Custom Hook(`useQuestionTreeContext`)이 모두 모여있었습니다.
하지만 `useQuestionTreeContext` 훅은 다른 컴포넌트나 훅에서 빈번하게 재사용되는 로직이므로, 별도의 파일로 분리하는 것이 의존성 관리 및 재사용성 측면에서 더 적합했습니다.

### 💡 해결 방안
**Hook을 별도 파일로 분리**했습니다.
- `src/features/topic/hooks/conversation/breadcrumb/use-question-tree-context.ts` 파일을 생성하여 Hook 구현부를 이동시켰습니다.
- `QuestionTreeContext`는 Provider와 함께 Context 정의만 남겨두고, 외부에서 접근 가능하도록 `export` 처리했습니다.
- 이를 통해 'Context 정의'와 'Context 소비(Hook)'의 역할이 명확히 분리되었습니다.

---

## 6. 엄격한 1 File = 1 Component 규칙 적용

### ❓ 문제점
`BreadcrumbFocusView` 컴포넌트 파일(`index.tsx`) 내부에 `BreadcrumbFocusViewContent`라는 내부 컴포넌트가 함께 정의되어 있었습니다.
이로 인해 "한 파일에 파일명과 다른 컴포넌트가 숨어있는" 상황이 발생하여, 유지보수 시 컴포넌트를 찾기 어려웠습니다.

### 💡 해결 방안
**1:1 매핑 원칙**을 엄격하게 적용하여 파일을 분리했습니다.
- **`breadcrumb-focus-view-content.tsx` 생성**: 내부 로직 컴포넌트를 별도 파일로 추출.
- **`breadcrumb-focus-view.tsx`**: (User Request) `QuestionTreeProvider`와 `BreadcrumbFocusViewContent`를 완전히 하나로 합쳐 단일 컴포넌트(`BreadcrumbFocusView`)로 만들었습니다.
- 이를 통해 불필요한 depth를 줄이고 코드를 더 직관적으로 만들었습니다.
- 이를 통해 파일 탐색기만 봐도 어떤 컴포넌트가 있는지 명확히 알 수 있게 되었습니다.

---

## 7. Breadcrumb 관련 파일 구조화 (Directory Grouping)

### ❓ 문제점
Breadcrumb 기능과 관련된 컴포넌트와 훅들이 `conversation` 폴더 내에 다른 파일들과 섞여 있어, 관련 파일들을 한눈에 파악하거나 관리하기 어려웠습니다.

### 💡 해결 방안
**기능별 디렉토리 그룹화**를 수행했습니다.

- **Components**: `features/topic/components/conversation/breadcrumb/` 폴더를 생성하고 관련 컴포넌트(`FocusView`, `Content`, `Navigation`, `Context`)를 모두 이동시켰습니다.
- **Hooks**: `features/topic/hooks/conversation/breadcrumb/` 폴더를 생성하고 관련 훅들(`useQuestionTree`, `useGraphMutations` 등)을 이동시켰습니다.
- 이를 통해 'Breadcrumb'라는 기능 단위로 파일들이 응집되어 유지보수가 용이해졌습니다.

---

## 8. 절대 경로(Absolute Import) 규칙 강화

### ❓ 문제점
파일 이동(Refactoring) 과정에서 `../../`와 같은 상대 경로가 사용되면, 파일 위치 변경 시마다 경로를 일일이 수정해야 하는 번거로움이 있었습니다.

### 💡 해결 방안
**모든 상위 디렉토리 참조는 절대 경로(`@/`)를 사용**하도록 규칙을 강화하고 적용했습니다.
- `rulesets/front_rulesets.md`에 해당 규칙을 명시했습니다.
- 리팩토링된 모든 파일에서 `../` 패턴을 제거하고 `@/features/...` 형태로 수정했습니다.
- 단, 같은 디렉토리 내의 파일(` ./ `)은 가독성을 위해 허용했습니다.

---

## 10. Context Directory 도입

### ❓ 문제점
`hooks` 폴더에 `use-question-tree-context.ts`가 위치해 있어, 단순 훅인지 Context 정의인지 구분이 모호했습니다.
일반적으로 React 프로젝트에서 Context 관련 로직은 `contexts` 폴더에서 별도로 관리하는 것이 관례입니다.

### 💡 해결 방안
**`contexts` 디렉토리를 신설**하여 역할을 명확히 했습니다.
- **`features/topic/contexts/` 생성**: Context 정의 및 Provider(혹은 하이브리드 파일)를 보관할 장소를 마련했습니다.
- **파일 이동 및 이름 변경**: `hooks/.../use-question-tree-context.ts` -> `contexts/.../question-tree-context.ts`로 이동 및 변경하여 "Context 정의 파일"임을 명시했습니다.
- **규칙 업데이트**: `rulesets/frontend_directory.md`에 `contexts` 폴더에 대한 설명을 추가하여 아키텍처 규칙에 반영했습니다.

---

## 11. Cohesion(응집도) 개선: State Lifting

### ❓ 문제점
`BreadcrumbFocusView`가 View 역할뿐만 아니라 데이터 초기화(`useQuestionTree`) 및 Provider 제공 역할까지 수행하고 있어 결합도가 높고(Coupling) 재사용이 어려웠습니다.

### 💡 해결 방안
**State Lifting(상태 끌어올리기)**을 통해 역할을 재분배했습니다.
- **`TopicPageContent`**: 데이터 페칭 + 상태 초기화(`useQuestionTree`) + `Context.Provider` 제공. (Container 역할 강화)
- **`BreadcrumbFocusView`**: 단순히 Context를 소비하여 View를 전환하는 역할로 축소. (Pure View 역할)
- 결과적으로 `TopicPageContent`는 데이터/상태 관리에 집중하고(High Cohesion), `BreadcrumbFocusView`는 의존성이 줄어들어(Loose Coupling) 구조가 개선되었습니다.

---

## 12. View Composition Pattern 적용

### ❓ 문제점
`BreadcrumbFocusView`는 이름과 달리 "화면 전환(Composition)" 로직을 포함하고 있어, View Layer(`ChatView`)가 해야 할 역할을 대신하고 있었습니다.
또한 `TopicPageContent`는 단순 위임자(Delegator) 역할에 불과했습니다.

### 💡 해결 방안
**View Layer에서 화면 구성을 주도**하도록 변경했습니다.
- **`ChatView.tsx` 통합**: `TopicPageContent`와 `BreadcrumbFocusView`의 로직(데이터 페칭, 상태 초기화, 화면 전환)을 `ChatView`로 모두 가져왔습니다.
- **불필요한 파일 삭제**: 역할이 사라진 `TopicPageContent.tsx`와 `BreadcrumbFocusView.tsx`를 과감히 삭제했습니다.
- **결과**:
  - `features/`: 순수한 비즈니스 로직과 UI 컴포넌트 제공.
  - `views/`: 이들을 조립하여 최종 페이지를 완성하는 주체.
  - 역할 분리가 명확해지고 파일 갯수가 줄어들어 구조가 단순해졌습니다.

---

## 13. Component Consolidation (ChatView 통합)

### ❓ 문제점
`ChatView.tsx` 내부에서 `Suspense`를 처리하기 위해 `TopicContent`, `ChatViewContent`, `ChatView`로 3단 분리가 되어 있었습니다.
이는 불필요한 복잡도를 유발하고 가독성을 저하시켰습니다.

### 💡 해결 방안
**Suspense Boundary를 상위 페이지(`page.tsx`)로 이동**시키고, `ChatView`를 단일 컴포넌트로 합쳤습니다.
- **`app/[id]/page.tsx`**: `Suspense` 적용 담당.
- **`ChatView.tsx`**: 데이터 페칭 및 렌더링만 담당하는 단일 컴포넌트로 통합.
- 이를 통해 `ChatView` 코드가 매우 직관적이고 깔끔해졌습니다.

---

## 14. Absolute Path Fix (Import 경로 정리)

### ❓ 문제점
`front/src/features/topic/components/conversation/content` 내부 파일들(`topic-chat-view.tsx`, `sub-question-list.tsx` 등)이 여전히 상대 경로(`../`, `./`)를 사용하고 있어, 파일 이동 시 경로가 깨질 위험이 있었습니다.

### 💡 해결 방안
해당 디렉토리 내의 모든 컴포넌트 import를 **절대 경로(`@/...`)**로 수정했습니다.
- `sub-question-list.tsx`: `import { QuestionCard } from "@/features/..."`
- `topic-chat-view.tsx`: `import { SubQuestionList } from "@/features/..."`
- `topic-graph-view.tsx`: `import { QuestionCard } from "@/features/..."`
이를 통해 아키텍처 규칙(Rule #2)을 준수하고 유지보수성을 높였습니다.

---

## 15. File Relocation (StartNewTopicForm 이동)

### ❓ 문제점
`StartNewTopicForm`은 새로운 질문(Topic)을 시작하는 Input 폼이지만, `features/topic/components/start-new-topic-form/`이라는 별도의 최상위 폴더에 위치해 있어 `components/conversation/input/`과 역할이 겹치고 분산되어 있었습니다.

### 💡 해결 방안
`start-new-topic-form/index.tsx`를 **`features/topic/components/conversation/input/start-new-topic-form.tsx`**로 이동했습니다.
- **Input 관련 컴포넌트 응집**: `chat-input.tsx`, `new-question-form.tsx`와 함께 `input` 디렉토리에서 관리되어 일관성이 높아졌습니다.
- **파일명 변경**: `index.tsx` 대신 명시적인 파일명(`start-new-topic-form.tsx`)을 사용하여 찾기 쉬워졌습니다.

---

## 16. DRY Principle (View Duplication 제거)

### ❓ 문제점
`StandardChatView`와 `OptimisticChatView`가 화면을 그리는 로직(Chart/Graph 스위칭, 다이얼로그 렌더링)을 똑같이 중복해서 가지고 있었습니다.

### 💡 해결 방안
공통적인 View Composition 로직을 **`TopicContentLayout`**이라는 별도 컴포넌트로 추출했습니다.
- **`TopicContentLayout.tsx`**: `useQuestionTreeContext`를 통해 `viewMode`를 확인하고 적절한 View와 Dialogs를 렌더링.
- **`StandardChatView` / `OptimisticChatView`**: 데이터 페칭 및 Context Provider 역할에만 집중하고, 내부 렌더링은 Layout에 위임.
- 결과적으로 코드 중복이 제거되고(DRY), 각 컴포넌트의 책임이 더욱 명확해졌습니다.
