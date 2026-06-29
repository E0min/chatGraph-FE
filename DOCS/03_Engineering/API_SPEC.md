# API 규격 가이드 (API Spec)

## 1. 개요
`chatGraph-FE-local` 프론트엔드가 백엔드 서버와 소통하기 위해 정의하는 API 스펙 및 클라이언트 내 Axios 인스턴스/호출 아키텍처 규칙입니다.

## 2. API 호출 아키텍처
프론트엔드 내의 모든 외부 통신은 `shared/api/`의 중앙 집중식 인스턴스를 통과해야 합니다.

### 설정 관리
- 기본 URL은 환경 변수 `.env` (예: `NEXT_PUBLIC_API_URL`) 파일에 의존합니다.
- 요청 시 인터셉터(Interceptor)를 통해 세션 토큰(JWT 등)을 헤더에 삽입합니다.

```typescript
// 예시: shared/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

apiClient.interceptors.request.use((config) => {
  // 토큰 주입 로직
  return config;
});
```

## 3. API 엔드포인트 도메인 분리
Features(기능) 분리 설계 원칙에 따라, REST API 함수들은 구체적인 도메인 폴더 내 `api` 디렉토리에 묶입니다.

- `features/topic/api/` : 토픽/트리 조회, 생성, 삭제 관련 API 호출체 (`getTopicTree`, `createQuestion` 등)
- `features/auth/api/` : 로그인, 로그아웃, 토큰 리프레시 호출체

## 4. 응답 형태 (Response Format)
본 프로젝트는 항상 성공/실패 여부를 담은 봉투(Envelope) 패턴이 쓰이거나, JSON 스키마가 단일하게 고정된 형태로 응답을 파싱(Parsing)할 것을 기대합니다.

백엔드 명세가 바뀔 시 DTO 타입을 반드시 명시하고 Zod 등을 통한 런타임 스키마 검증(혹은 TypeScript 캐스팅)을 동반해야 합니다.
