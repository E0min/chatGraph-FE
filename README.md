# ChatGraph Frontend

ChatGraph의 프론트엔드 레포지토리입니다. 대화형 데이터를 시각화하고 탐색하는 인터페이스를 제공합니다.

## 🛠 Tech Stack

### Core
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query v5](https://tanstack.com/query/latest)

### UI Components & Visualization
- **Headless UI**: [Radix UI](https://www.radix-ui.com/), [Headless UI](https://headlessui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visualization**: [D3.js](https://d3js.org/) (Graph/Network visualization)
- **Utility**: `clsx`, `tailwind-merge`

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

본 프로젝트는 **Feature-Sliced Design (기능 중심 설계)** 철학을 일부 차용하여 구성되었습니다.

```bash
front/src/
├── app/                 # Next.js App Router (Pages & Layouts)
├── features/            # 기능(도메인) 단위 모듈
│   ├── topic/           # 토픽 생성, 조회, 시각화 관련 기능
│   ├── chat/            # 채팅 인터페이스 기능
│   └── ...
├── shared/              # 전역에서 사용되는 공통 모듈 (UI 키트, 유틸리티)
├── views/               # 페이지 단위의 UI 조합 (Page Assembly)
├── constants/           # 상수 값 관리
└── api/                 # API 통신 로직
```

### Key Directories

- **`features/`**: 비즈니스 로직의 핵심입니다. 각 폴더는 `components`, `hooks`, `types` 등을 독립적으로 가집니다.
- **`views/`**: `app/` 디렉토리의 `page.tsx`는 껍데기 역할만 하며, 실제 페이지 UI 구성은 이곳에서 담당합니다.

---

## 🎨 Styling Guide

- **Tailwind CSS 4**를 사용합니다.
- 복잡한 스타일 조건링은 `cn()` 유틸리티(`clsx` + `tailwind-merge`)를 사용합니다.
- 색상, 폰트 등의 디자인 토큰은 `global.css` 및 Tailwind 변수로 관리됩니다.

---

## ✅ Key Scripts

- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm run lint`: ESLint 검사
