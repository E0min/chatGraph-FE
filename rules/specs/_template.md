# 📄 Feature Specification Template

## 1. Overview (개요)
- **Feature Name**: (기능 이름)
- **Goal**: (이 기능을 왜 만드는가? 사용자에게 어떤 가치를 주는가?)
- **Status**: `Draft` / `Review` / `Approved` / `In Progress` / `Done`

## 2. Process Flow (흐름도)
> 사용자의 진입부터 완료까지의 흐름을 기술합니다.
1. 사용자가 ... 버튼을 클릭한다.
2. 시스템은 ...를 확인한다.
3. 결과가 ...하게 표시된다.

## 3. UI/UX Requirements
- [ ] (디자인 시안 링크)
- [ ] 버튼 클릭 시 리플 효과
- [ ] 로딩 시 스켈레톤 UI 표시

## 4. API & Data Requirements
- **Endpoint**: `POST /api/topic/create`
- **Request**: `{ title: string, content: string }`
- **Response**: `{ id: string, status: 'success' }`

## 5. Edge Cases (예외 처리)
- 네트워크 연결이 끊겼을 때: "재시도" 버튼 표시
- 데이터가 없을 때: Empty State 컴포넌트 표시
