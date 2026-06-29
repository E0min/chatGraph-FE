# 보안 정책 (Security Policy)

<!-- 담당 에이전트: backend -->

## 1. 보안 원칙
- **최소 권한 (Least Privilege)**: 필요한 최소한의 권한만 부여
- **심층 방어 (Defense in Depth)**: 다중 보안 레이어

## 2. 인증/인가 정책
- **인증 방식**: (JWT / Session / OAuth2)
- **토큰 만료**: Access 15min, Refresh 7d
- **비밀번호**: bcrypt 해싱, 최소 8자, 복잡성 요구

## 3. 데이터 암호화
- **전송 중**: TLS 1.2+ (HTTPS 강제)
- **저장 시**: AES-256 (민감 정보)

## 4. 입력 검증
- **서버 사이드 검증 필수** (클라이언트만 의존 금지)
- Parameterized Query (SQL Injection 방지)
- HTML 이스케이핑 (XSS 방지)
- CSRF 토큰 적용

## 5. OWASP Top 10 체크리스트
- [ ] A01: Broken Access Control
- [ ] A02: Cryptographic Failures
- [ ] A03: Injection
- [ ] A04: Insecure Design
- [ ] A05: Security Misconfiguration
- [ ] A06: Vulnerable Components
- [ ] A07: Authentication Failures
- [ ] A08: Data Integrity Failures
- [ ] A09: Logging Failures
- [ ] A10: SSRF

## 6. 의존성 보안
- `npm audit` 주기적 실행
- Dependabot / Snyk 연동
- 알려진 취약점 있는 패키지 즉시 업데이트

## 7. 시크릿 관리
- `.env` 파일로 관리, `.gitignore` 포함
- 프로덕션: 환경 변수 또는 Secrets Manager
- 코드에 시크릿 하드코딩 절대 금지

## 변경 이력
| 일자 | 변경 내용 | 관련 기능 | 작성자 |
|------|----------|----------|--------|
