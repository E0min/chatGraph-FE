# 모션 & 애니메이션 가이드 (Animation Guide)

<!-- 담당 에이전트: designer -->

## 1. 모션 원칙
- **Purpose (목적성)**: 모든 애니메이션은 사용자의 이해를 돕기 위해 존재
- **Duration (적절한 시간)**: 너무 빠르지도, 느리지도 않게
- **Easing (자연스러움)**: 기계적이 아닌 자연스러운 움직임

## 2. 트랜지션 규격

### 2.1. 페이지 전환
- **타입**: Fade / Slide / Scale
- **지속 시간**: 300ms
- **이징**: ease-in-out

### 2.2. 컴포넌트 상태 변화
- **Hover**: 150ms, ease-out
- **Focus**: 즉시 (0ms)
- **Active/Press**: 100ms, ease-in
- **Appearance (나타남)**: 200ms, ease-out
- **Disappearance (사라짐)**: 150ms, ease-in

### 2.3. 마이크로 인터랙션
- **버튼 클릭 피드백**: scale(0.97) → scale(1), 150ms
- **토글 전환**: 200ms, ease-in-out
- **스켈레톤 로딩**: pulse 1.5s infinite

## 3. 이징 커브 정의
| 이름 | CSS 값 | 용도 |
|------|--------|------|
| ease-in | `cubic-bezier(0.4, 0, 1, 1)` | 사라지는 요소 |
| ease-out | `cubic-bezier(0, 0, 0.2, 1)` | 나타나는 요소 |
| ease-in-out | `cubic-bezier(0.4, 0, 0.2, 1)` | 이동/변환 |
| spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 바운스 효과 |

## 4. 지속 시간 스케일
| 토큰 | 값 | 용도 |
|------|-----|------|
| `--duration-fast` | 150ms | 호버, 포커스 |
| `--duration-normal` | 300ms | 페이지 전환, 모달 |
| `--duration-slow` | 500ms | 복잡한 레이아웃 변화 |

## 5. 접근성 고려
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 변경 이력
| 일자 | 변경 내용 | 관련 기능 | 작성자 |
|------|----------|----------|--------|
