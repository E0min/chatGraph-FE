# Figma MCP 브릿지 (Figma MCP Bridge)

<!-- 담당 에이전트: designer -->

## 1. Figma MCP 연동 개요
- **목적**: Figma 디자인 파일에서 디자인 토큰과 컴포넌트 정보를 자동 추출
- **연동 MCP**: Figma MCP Server

## 2. 환경 설정 & API 키 관리
```json
// MCP 설정 예시 (.gemini/settings.json 또는 .claude/mcp_config.json)
{
  "figma": {
    "personalAccessToken": "${FIGMA_TOKEN}",
    "teamId": "",
    "projectId": ""
  }
}
```
- API 키는 `.env`에 저장, `.gitignore`에 포함

## 3. 디자인 토큰 자동 추출 스크립트
- Figma Variables API로 색상, 타이포, 스페이싱 토큰 추출
- 추출된 토큰을 `DOCS/02_Design/DESIGN_SYSTEM.md`에 자동 반영
- CSS 변수 파일로 자동 변환 (해당 시)

## 4. 컴포넌트 동기화 워크플로우
1. Figma에서 컴포넌트 변경 감지
2. 변경된 컴포넌트의 Props, Variants 추출
3. `DOCS/02_Design/` 관련 문서 업데이트
4. 프론트엔드 에이전트에게 변경 알림

## 5. 변경 감지 & 알림 설정
- **감지 주기**: 수동 (`/figma-sync` 명령으로 호출)
- **알림 대상**: designer, frontend 에이전트

## 변경 이력
| 일자 | 변경 내용 | 관련 기능 | 작성자 |
|------|----------|----------|--------|
