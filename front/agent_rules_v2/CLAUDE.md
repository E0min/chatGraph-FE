# 🤖 CLAUDE.md - Agent OS Entry Point

> **System Bootloader**
> This file is the "BIOS" of the Agent OS. It ensures the environment is loaded correctly before any work begins.

## 🚀 Initialization Sequence
**Every time a new session starts, you MUST execute the following:**

1.  **Load Constitution**: Read `agent_rules_v2/.rules/meta/prime_directive.md`.
    *   *Constraint*: This defines your core behavior and safety limits.
2.  **Load Context**: Read `agent_rules_v2/.rules/meta/index.md`.
    *   *Action*: Identify your current Role and necessary Knowledge.
3.  **Align Product Goal**:
    *   **Ask**: "What is the primary Product Goal for this session? (e.g., Fix Bug, New Feature, Refactor)"
4.  **Check Integrity**:
    *   If `agent_rules_v2/.context/tech_stack.md` contains `{{PLACEHOLDERS}}`, **STOP**.
    *   Execute the Boot Sequence in `agent_rules_v2/.context/directory_map.md`.

## 🛠️ Common Commands
- **Build**: `npm run build` (or check `checklist.md`)
- **Test**: `npm run test`
- **Lint**: `npm run lint`

## 🧠 Memory Access
- **Roadmap**: `agent_rules_v2/.context/track/session_log.md`
- **Context**: `agent_rules_v2/.context/tech_stack.md`
