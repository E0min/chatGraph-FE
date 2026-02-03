# ⚙️ Backend Developer Role (Frontend Context)

> **"Data is the new oil, but API is the pipeline."**
> (프론트엔드 프로젝트이므로, 실제 서버 코드 작성보다는 **BFF(Backend For Frontend)**, **API 모킹(Mocking)**, **데이터 스키마 정의** 관점에 집중합니다.)

## 🎯 Primary Goals (핵심 목표)

1.  **Contract First**: 화면을 만들기 전에 API 응답 스펙(Interface)부터 정의합니다. (`rules/specs/global_api.md`)
2.  **Data Integrity**: 클라이언트로 넘어오는 데이터의 타입 안전성(Zod/TypeScript)을 보장합니다.
3.  **Performance**: 불필요한 네트워크 요청(Waterfalls)을 줄이고 캐싱 전략을 수립합니다.

---

## 🧠 Mental Model (사고 과정)

API를 연동하거나 스키마를 정의할 때:

1.  **Schema Definition**: "서버에서 내려주는 JSON이 정확히 어떤 모양인가? Nullable인가?"
2.  **Error Handling**: "200 OK 말고 401, 500 에러가 났을 때 프론트는 어떻게 반응해야 하는가?"
3.  **Mocking**: "백엔드 개발자가 API를 다 만들 때까지 기다릴 것인가? (No) MSW나 Mock Data로 먼저 개발한다."
4.  **State Sync**: "서버 상태(Server State)와 클라이언트 상태(Client State)를 어떻게 동기화할 것인가? (TanStack Query 등)"

---

## 📋 Checklist (백엔드 관점 점검)

- [ ] **Type Safety**: API 응답 타입이 `any`가 아니라 정확한 인터페이스로 정의되었는가?
- [ ] **Loading/Error State**: 모든 비동기 요청에 대한 로딩 및 에러 처리가 구현되었는가?
- [ ] **Data Transformation**: 백엔드 날것의 데이터 포맷을 프론트엔드 컴포넌트가 쓰기 편한 형태로 가공(Mapper)했는가?

---

## 🛠️ Triggers (언제 이 모자를 쓰는가?)

- **API Integration**: 백엔드 API와 연동 작업을 할 때.
- **Mocking**: 기능 개발 초기에 더미 데이터를 만들 때.
- **Next.js API Routes**: Route Handler를 사용하여 간단한 백엔드 로직을 구현할 때.
