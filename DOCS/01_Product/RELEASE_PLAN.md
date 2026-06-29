# 릴리즈 전략 & 배포 계획 (Release Plan)

<!-- 담당 에이전트: planner -->

## 1. 릴리즈 전략
- **배포 방식**: Continuous / Versioned
- **배포 주기**:
- **배포 환경**: Development → Staging → Production

## 2. 버전 관리 정책
- **Semantic Versioning**: `MAJOR.MINOR.PATCH`
  - MAJOR: 호환성 깨지는 변경
  - MINOR: 하위 호환 기능 추가
  - PATCH: 하위 호환 버그 수정

## 3. 릴리즈 체크리스트
- [ ] 모든 기능 스토리의 수용 기준 통과
- [ ] QA/테스트 전체 통과 (단위, 통합, E2E)
- [ ] DOCS 문서 최신 상태 확인 (`/integrity-sync`)
- [ ] 성능 기준 충족 (`PERFORMANCE_BUDGET.md` 참조)
- [ ] 보안 감사 완료 (`SECURITY_POLICY.md` 참조)
- [ ] 배포 승인 (PM + 리드 개발자)

## 4. 롤백 계획
- **롤백 트리거**: 에러율 > 1% 또는 핵심 기능 장애
- **롤백 절차**:
- **롤백 시간 목표**: < 5분

## 5. 릴리즈 노트 템플릿
```
## v[X.Y.Z] - YYYY-MM-DD
### ✨ 새 기능
### 🐛 버그 수정
### 🔧 개선
### ⚠️ Breaking Changes
```

## 변경 이력
| 일자 | 변경 내용 | 관련 기능 | 작성자 |
|------|----------|----------|--------|
