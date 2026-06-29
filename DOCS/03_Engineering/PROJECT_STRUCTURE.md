# 프로젝트 구조 (Project Structure)

## 1. 개요
`chatGraph-FE-local` 은 컴포넌트 묶음의 비대화를 방지하기 위해 Feature-Sliced Design (FSD, 기능 분할 설계) 아키텍처 개념을 활용하여 설계되었습니다.

## 2. 핵심 디렉토리 계층 체계

```text
front/src/
├── app/             # (1) Application Layer: 라우팅 설정, Root 설정 리전
│   ├── layout.tsx
│   ├── page.tsx
│
├── views/           # (2) Page Layer: app 레이어의 page에 바인딩 될 Page 조합물
│   ├── chat/        # 예) /chat 페이지 컴포넌트 묶음
│   ├── home/
│   
├── features/        # (3) Features Layer: 비즈니스 도메인 기능 컴포넌트
│   ├── topic/       # 주제/대화 트리 관련 로직 응집
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types/
│   ├── auth/
│   ├── sidebar/
│
├── shared/          # (4) Shared Layer: 도메인 로직에 종속되지 않은 공통 모듈
│   ├── components/  # ex: Button, Input, Modal, Icons
│   ├── hooks/       # 범용 훅 (useDebounce, useWindowSize)
│   ├── lib/         # 글로벌 유틸 (cn, utils)
│   ├── api/         # 글로벌 Axios 클라이언트 인스턴스
│
└── constants/       # 상수 및 환경변수
```

## 3. 모듈 의존성 원칙
모든 모듈은 단의 방향 의존성(Unidirectional Dependency)을 지닙니다. 하위 레이어는 상위 레이어를 참조할 수 없습니다.

- ✅ `app` -> `views`, `features`, `shared`
- ✅ `views` -> `features`, `shared` 
- ✅ `features` -> `shared`
- ❌ `shared` -> `features` (절대 금지. 에러 발생 확률 상승)
- ❌ `features/auth` -> `features/topic` (Feature 간 참조는 되도록 최소화. 서로 참조가 필요하다면 그 둘을 관장하는 view 단에서 상태 조립 수행)
