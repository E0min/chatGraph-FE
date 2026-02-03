# 🚀 Deployment Process

## 1. Pre-Deployment Check (배포 전 확인)
- [ ] **Lint & Build**: `npm run lint && npm run build`가 에러 없이 통과하는가?
- [ ] **Console Logs**: 불필요한 `console.log`가 제거되었는가?
- [ ] **Environment**: `.env` 변수가 배포 환경(Vercel 등)에 올바르게 설정되었는가?
- [ ] **Branch Check**: `main` 브랜치가 최신 상태(`git pull`)인가?

## 2. CI/CD Pipeline
(프로젝트의 CI/CD 파이프라인 설명을 여기에 기술하세요. 예: GitHub Actions, Vercel Auto Deploy 등)

## 3. Post-Deployment Verification (배포 후 검증)
- [ ] 실제 운영 사이트(Production)에 접속하여 주요 기능(로그인, 결제 등)이 작동하는지 확인.
- [ ] Sentry 등의 에러 모니터링 시스템에서 새로운 이슈가 올라오는지 관제.
