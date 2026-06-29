# 에러 처리 정책 (Error Handling)

## 1. 개요
Front-end 애플리케이션(`chatGraph-FE-local`) 내에서 발생하는 예상 가능한 예외 상황 및 네트워크 에러들을 어떻게 전파하고 명시적으로 사용자에게 피드백할 것인지에 대한 기준입니다.

## 2. 레벨 별 에러 처리 전략

### 2-1. Data Fetching (TanStack Query) 레벨
API 비동기 호출을 전담하는 도메인 로직(훅스)입니다.
- Query 단의 전역 설정에서 `retry: 1` 수준으로 재시도 후 에러를 발생시킵니다.
- `useMutation` 실행 시 오류가 발생할 경우 (예: 새 질문 등록 실패), 낙관적 업데이트(Optimistic Update)로 인해 미리 반영되었던 프론트엔드 캐시를 롤백(Rollback)합니다. 

### 2-2. UI Feedback 레벨 (Toast & Dialog)
시스템 에러가 발생한 사실을 사용자에게 숨기지 않고 적절한 맥락으로 안내합니다.
- 복구 가능한 일시적 에러 (네트워크 끊김 등): 우측 하단 에러 Toast 알림 사용 (예: `sonner` 라이브러리 사용).
- 치명적 에러 (데이터 무결성 훼손, 권한 없음): Alert Dialog 모달을 띄워 사용자에게 수동 새로고침을 유도하거나 홈으로 리다이렉트 시킵니다.

### 2-3. Component Exception 레벨 (Error Boundary)
의도치 않은 런타임 자바스크립트 오류로부터 전체 App이 크래시(Crash)되는 것을 막기 위한 보호 구역입니다.
- 주요 라우트 영역(`app/` 의 `error.tsx` 파일) 또는 복잡한 데이터가 그려지는 `TopicGraphView`, `TopicChatView` 외곽 단위에 `ErrorBoundary` 컴포넌트를 둘러 전파를 차단합니다.
- Boundary Fallback UI는 "문제가 발생했습니다. 다시 시도해주세요." 메시지와 `[새로고침]` 버튼을 제공해야 합니다.

## 3. 에러 로깅 (Error Logging)
- `console.error` 사용은 개발 환경에서만 허용하며, 프로덕션에서는 센트리(Sentry) 등 별도 오류 수집 플랫폼 플러그인에 넘기는 파이프라인으로 일원화합니다.
