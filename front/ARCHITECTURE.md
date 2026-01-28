# 프론트엔드 아키텍처 (Frontend Architecture)

이 문서는 프로젝트의 전체 프론트엔드 구조와 주요 모듈 간의 관계를 설명합니다.

## 시스템 맵 (System Map)

`front/src`의 최상위 레벨 구조입니다. Next.js App Router를 기반으로 하며, 비즈니스 로직은 `features`로 분리되어 있습니다.

```mermaid
graph TD
    %% 노드 정의
    App[App Router <br/> (/app)]
    Features[기능 모듈 <br/> (/features)]
    Shared[공통 요소 <br/> (/shared)]
    Views[페이지 뷰 <br/> (/views)]

    %% 주요 관계
    App -->|페이지 렌더링| Views
    Views -->|기능 사용| Features
    Views -->|UI/유틸 사용| Shared
    Features -->|공통 로직 사용| Shared

    %% 서브시스템 정의
    subgraph Features_Group [Features]
        Auth[인증 (Auth)]
        Topic[토픽 (Topic)]
        Sidebar[사이드바 (Sidebar)]
        Share[공유 (Share)]
    end

    Features --> Auth
    Features --> Topic
    Features --> Sidebar
    Features --> Share

    %% 스타일링
    classDef default fill:#f9f9f9,stroke:#333,stroke-width:1px;
    classDef core fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    class App,Features,Shared,Views core;
```

## 디렉토리 구조 설명

| 디렉토리 | 설명 |
|---|---|
| **`/app`** | Next.js App Router의 진입점입니다. 라우팅, 레이아웃, 메타데이터를 정의합니다. |
| **`/features`** | 도메인별 비즈니스 로직과 컴포넌트가 모여 있습니다. (예: `topic`, `auth`) |
| **`/shared`** | 프로젝트 전반에서 재사용되는 UI 컴포넌트, 훅, 유틸리티 함수입니다. |
| **`/views`** | 페이지 단위의 조합을 담당합니다. `page.tsx`는 `view`를 import하여 렌더링합니다. |
