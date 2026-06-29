# 환경 설정 가이드 (Environment Setup)

<!-- 담당 에이전트: frontend, backend -->

## 1. 개발 환경 요구사항
| 도구 | 최소 버전 | 설명 |
|------|----------|------|
| Node.js | | |
| npm/yarn/pnpm | | |
| Git | | |

## 2. 프로젝트 초기 설정
```bash
# 1. 저장소 클론
git clone [repo-url]
cd [project-name]

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp .env.example .env
# .env 파일을 열어 필수 값 입력

# 4. 개발 서버 실행
npm run dev
```

## 3. 환경 변수 관리

### 3.1. .env 파일 구조
```
# === 필수 ===
DATABASE_URL=
API_BASE_URL=

# === 선택 ===
LOG_LEVEL=info
```

### 3.2. 환경 변수 목록
| 변수명 | 필수 | 기본값 | 설명 |
|--------|------|--------|------|

### 3.3. 시크릿 관리 규칙
- `.env` 파일은 **절대 커밋 금지** (`.gitignore` 포함)
- `.env.example`에 키 이름만 기록 (값은 비워둠)
- 프로덕션 시크릿은 환경 변수 또는 Secrets Manager 사용

## 4. 로컬 개발 서버
- **포트**:
- **Hot Reload**: 지원 여부
- **프록시 설정**: API 프록시 (CORS 우회)

## 5. Docker 설정 (해당 시)
```dockerfile
# Dockerfile 위치 및 빌드 명령
```

## 변경 이력
| 일자 | 변경 내용 | 관련 기능 | 작성자 |
|------|----------|----------|--------|
