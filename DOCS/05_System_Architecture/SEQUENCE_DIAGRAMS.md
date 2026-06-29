# 시퀀스 다이어그램 (Sequence Diagrams)

<!-- 담당 에이전트: frontend, backend -->

## 1. 주요 유스케이스 목록
| ID | 유스케이스 | 관련 에픽 | 상태 |
|----|----------|----------|------|

## 2. 유스케이스별 시퀀스 다이어그램

### UC-001: [유스케이스명]

#### 정상 플로우 (Happy Path)
```mermaid
sequenceDiagram
    actor User
    participant Client
    participant Server
    participant DB
    
    User->>Client: [사용자 액션]
    Client->>Server: [API 호출]
    Server->>DB: [데이터 조작]
    DB-->>Server: [결과]
    Server-->>Client: [응답]
    Client-->>User: [UI 업데이트]
```

#### 예외 플로우 (Error Path)
```mermaid
sequenceDiagram
    actor User
    participant Client
    participant Server
    
    User->>Client: [사용자 액션]
    Client->>Server: [API 호출]
    Server-->>Client: 400 Bad Request
    Client-->>User: 에러 메시지 표시
```

## 변경 이력
| 일자 | 변경 내용 | 관련 기능 | 작성자 |
|------|----------|----------|--------|
