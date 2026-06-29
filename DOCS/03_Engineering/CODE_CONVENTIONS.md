# 코드 컨벤션 (Code Conventions)

## 1. 개요
프론트엔드(`chatGraph-FE-local`)의 안정적, 지속적 개발을 위해 강제하는 코딩 규칙 세트입니다.

## 2. 언어 및 문법 (TypeScript)
- 기본적으로 **Strict Type**을 준수해야 합니다. (`any` 사용 금지)
- `interface` 및 `type`의 이름을 명확하게 지어야 합니다. 접두사 `I`를 명시적으로 쓰지 않는 것을 원칙으로 합니다 (예: `IProps` 대신 `Props`, `IPoint` 대신 `Point`).

## 3. 리액트 컴포넌트 (React Component)
- **화살표 함수(Arrow Function)** 기반으로 컴포넌트를 선언합니다.

```tsx
// 권장 패턴
import { FC } from 'react';

interface ComponentProps {
  title: string;
}

export const MyComponent: FC<ComponentProps> = ({ title }) => {
  return <div>{title}</div>;
};
```

## 4. 명명 규칙 (Naming)
- 디렉토리 및 파일명: `kebab-case`를 사용합니다. (e.g., `chat-view.tsx`, `use-tree-data.ts`)
- 컴포넌트 폴더의 인덱스 파일은 `index.ts`를 사용하여 경로 단축을 지원합니다.
- 상수(Constants): `UPPER_SNAKE_CASE`
- 훅(Hooks): `use` 접두사로 시작하는 `camelCase`

## 5. 스타일링 규칙 (Tailwind)
- 동적 클래스 병합은 무조건 `src/shared/lib/utils` 의 `cn()` (`clsx` + `tailwind-merge`)을 사용합니다.
- 복잡한 템플릿 스트링 조합을 피하십시오.
```tsx
// Bad
const classNames = `text-sm font-bold ${isActive ? 'text-red-500' : 'text-gray-500'} ${className}`;

// Good
const classNames = cn('text-sm font-bold', isActive ? 'text-red-500' : 'text-gray-500', className);
```

## 6. 에러 처리 및 로깅
- React Query 단에서 Fetching 에러는 ErrorBoundary로 전파하거나, Toast 알림 컴포넌트를 사용해 사용자에게 명시하세요.
- `console.log`의 프로덕션 빌드 포함을 금지합니다. 디버깅용 로그는 완료 후 제거합니다.
