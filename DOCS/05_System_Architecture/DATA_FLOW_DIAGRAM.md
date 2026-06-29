# Data Flow Diagrams (DFD)

본 문서는 `chatGraph-FE-local` 시스템 내부의 핵심적인 데이터 흐름을 다이어그램으로 명세합니다. 주요 동작은 "Topic 트리의 데이터 로드와 낙관적 탐색/업데이트" 메커니즘을 따릅니다.

## 1. Topic 탐색 및 렌더링 데이터 흐름 (Topic Data Flow)

API로부터 토픽/질문 구조를 불러오고, 컨텍스트를 거쳐 화면(채팅 뷰 및 그래프 뷰)으로 뿌려지는 메커니즘입니다.

```mermaid
sequenceDiagram
    autonumber
    
    actor User
    participant Component as TopicView(Chat/Graph)
    participant Context as QuestionTreeContext
    participant Hook as useTreeData (React Query)
    participant Backend as API Server

    %% 데이터 초기화 흐름
    User->>Component: 페이지 진입
    Component->>Hook: 트리 데이터 요청
    Hook->>Backend: GET /api/topic/{id}/tree
    Backend-->>Hook: 200 OK (TopicTreeResponse)
    
    %% 데이터 가공 및 공급
    Hook->>Hook: Data Transform (transformApiDataToViewData)
    Hook->>Context: Provide View Data & Current Path
    Context-->>Component: Context Update
    Component->>User: UI 렌더링 완료

    %% 탐색 (경로 변경)
    User->>Component: 특정 노드 "이동/선택" 클릭
    Component->>Context: navigateToQuestion(node) 액션 디스패치
    Context->>Hook: setCurrentPath() State 업데이트
    Hook-->>Context: New Path 공급
    Context-->>Component: Re-render & 경로 변경 반영
```

## 2. 낙관적 업데이트 기반 (Optimistic) 엔티티 생성 흐름

새로운 질문/답변을 트리에 추가할 때 랙(Latency) 없이 화면에 먼저 나타나게 하는 흐름입니다.

```mermaid
sequenceDiagram
    autonumber

    actor User
    participant Form as NewQuestionForm
    participant Hook as useTreeData
    participant QueryCache as Tanstack Query Cache
    participant Backend as API Server

    User->>Form: 신규 질문 제출
    Form->>Hook: AddQuestion() 뮤테이션 요청
    
    %% Optimistic 업데이트
    Hook->>QueryCache: Cancel Outgoing Refetches (경합 방지)
    Hook->>QueryCache: Update Cache (임시 ID의 노드 삽입)
    QueryCache-->>Form: Re-render (성공한 것으로 가정하여 화면 즉시 출력)

    %% 실제 백그라운드 요청
    Hook->>Backend: POST /api/topic/{t_id}/question (새 질문 페이로드)
    
    alt API Success
        Backend-->>Hook: 200 OK (실제 DB 노드 반환)
        Hook->>QueryCache: 임시 ID를 실제 데이터로 대체
        QueryCache-->>Form: 보이지 않게 교체 렌더링 완료
    else API Failure
        Backend-->>Hook: 500 Internal Error
        Hook->>QueryCache: Rollback (임시 노드 삭제)
        QueryCache-->>Form: Re-render (원복됨)
        Form->>User: Toast Error "질문 등록에 실패했습니다"
    end
```
