# 성능 예산 (Performance Budget)

<!-- 담당 에이전트: frontend -->

## 1. Core Web Vitals 목표
| 지표 | 목표 | 설명 |
|------|------|------|
| LCP | < 2.5s | Largest Contentful Paint |
| FID/INP | < 200ms | First Input Delay / Interaction to Next Paint |
| CLS | < 0.1 | Cumulative Layout Shift |

## 2. 번들 사이즈 예산
| 항목 | 예산 |
|------|------|
| Initial JS | < 200KB (gzipped) |
| Initial CSS | < 50KB (gzipped) |
| Total Page Weight | < 1MB |
| 개별 chunk | < 100KB (gzipped) |

## 3. 이미지 최적화 규칙
- **포맷**: WebP 우선, AVIF (지원 시)
- **크기**: 뷰포트에 맞는 사이즈 제공 (srcset)
- **Lazy loading**: 뷰포트 밖 이미지에 적용
- **압축**: 품질 80% 기준

## 4. 코드 스플리팅 전략
- 라우트 기반 코드 스플리팅 (기본)
- 대형 라이브러리 동적 import
- Critical CSS 인라인

## 5. 캐싱 전략
| 레이어 | 전략 | TTL |
|--------|------|-----|
| Browser | Cache-Control | 정적 1년, API no-cache |
| CDN | Edge Caching | 정적 1일 |
| Server | Redis (해당 시) | 쿼리별 설정 |

## 6. 성능 모니터링
- **도구**: Lighthouse CI, Web Vitals
- **자동화**: PR별 성능 리포트 생성
- **알림**: 예산 초과 시 빌드 경고

## 변경 이력
| 일자 | 변경 내용 | 관련 기능 | 작성자 |
|------|----------|----------|--------|
