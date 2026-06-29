# 디자인 시스템 (Design System)

## 1. 개요
`chatGraph-FE-local`의 디자인 시스템은 **Tailwind CSS 4**를 핵심 유틸리티로, **Radix UI** 컴포넌트를 베이스 프레임워크로 하는 Headless UI 기반 시스템입니다. 

## 2. 디자인 토큰 관리
Tailwind CSS 4의 스펙에 맞추어 `global.css`에서 통합된 디자인 토큰을 사용하여 앱 전역에서 일관성을 유지합니다.

```css
@theme {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-border: var(--border);
  --color-background: var(--background);
  /* ... 표준 토큰 정의 (생략) ... */
}
```

## 3. 공통 컴포넌트 아키텍처 (`shared/components`)
- **버튼 (Button)**: `class-variance-authority` (cva) 패턴을 활용한 `Variant` 지원 버튼.
- **입력폼 (Input/Textarea)**: 기본 제공 Radix 폼 형태에서 Tailwind를 통한 일관된 Focus Ring 스타일 적용.
- **다이얼로그/모달 (Dialog)**: Radix UI primitives (`@radix-ui/react-dialog`)를 사용하여 접근성(a11y) 확보.

## 4. 커스텀 아이콘
- **Lucide React** 라이브러리에 전적으로 의존합니다. 인라인 SVG보다 우선적으로 재사용합니다.

## 5. 그래프 시각화 (D3.js) 스타일링
- 컴포넌트 내부 CSS나 인라인 스타일 대신 Tailwind의 Data 속성이나 그룹 유틸리티(`group-hover`, `data-[state=active]`)를 활용해 D3 노드의 SVG 요소를 제어 권장.
- 노드의 크기, 선 굵기 등은 Layout 계산을 위해 D3 렌더링 측면에, 색상 및 이벤트 호버 픽셀은 CSS 단에 둡니다.
