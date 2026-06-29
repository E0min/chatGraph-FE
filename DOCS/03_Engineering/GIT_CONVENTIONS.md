# Git 컨벤션 (Git Conventions)

## 1. 브랜치 전략 (Branch Strategy)
이 프로젝트는 기능 단위 독립 개발(Feature Branch)을 기본 모델로 합니다.

- `main`: 최종 프로덕션 배포가 일어나는 무결성 브랜치.
- `develop` (또는 `dev`): 다음 배포를 위해 기능 브랜치들이 머지되는 통합 테스트 브랜치.
- `feature/{issue-number}`: 새로운 기능 개발을 진행하는 브랜치 (예: `feature/23-graph-zoom`).
- `fix/{issue-number}`: 버그 수정 브랜치.
- `hotfix/{issue-number}`: 운영 환경 즉각 대응 브랜치.

## 2. 커밋 메시지 규칙 (Commit Message)
의도를 명확히 파악할 수 있도록 Angular Commit Message 방식을 차용합니다.

```text
type(scope): subject

body (optional)

footer (optional)
```

**Type 목록:**
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `design`: UI/기능 디자인 변경
- `style`: 코드 스타일 수정 (포맷팅, 세미콜론 누락 등. 로직 변경 없음)
- `refactor`: 코드 리팩토링
- `chore`: 빌드, 패키지 매니저, 기타 구성 파일 수정
- `docs`: 문서 (DOCS, README) 관리 수정

**예시:**
```text
feat(topic): 그래프 노드 드래그 앤 드롭 기능 추가

상세 설명 (필요시 기입)
```

## 3. Pull Request 규칙
- 리뷰어가 쉽게 이해하도록 Description에 스크린샷 캡처(View 변경 시)나 의도를 작성하세요.
- 기능 구현 후 자체 테스트 완료, 의존성 충돌 검증(npm run lint 통과) 여부를 선포함합니다.
