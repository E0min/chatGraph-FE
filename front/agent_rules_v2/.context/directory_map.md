<!-- 🤖 SYSTEM BOOT SEQUENCE (AUTO-RUN)
1.  **SCAN**: List all files in the root directory (`ls -R` or `tree`).
2.  **DETECT**:
    *   IF `package.json` found -> Stack = **Node.js**.
    *   IF `pom.xml` or `build.gradle` -> Stack = **Java/JVM**.
    *   IF `requirements.txt` or `pyproject.toml` -> Stack = **Python**.
    *   IF Empty -> Stack = **New Project**.
3.  **ANALYZE (Pattern Mining)**:
    *   **Scan** existing source files (if any) to identify coding patterns (Naming, Folder Structure, API calls).
    *   **Constraint**: If multiple styles exist, **ASK** the user: "I found mixed styles (A vs B). Which one is the standard?"
    *   **Action**: Document the agreed pattern in `rules/knowledge/code_patterns/`.
4.  **SPECIALIZE (Role Injection)**:
    *   IF Stack == **Frontend**:
        *   **Inject** into `agent_rules_v2/.rules/roles/implementer.md`: "Focus on Component Composition, Hooks, and Client State."
    *   IF Stack == **Backend**:
        *   **Inject** into `agent_rules_v2/.rules/roles/implementer.md`: "Focus on API Design, DB Schema, and Error Handling."
5.  **EXECUTE**:
    *   **Update** `agent_rules_v2/.context/tech_stack.md`: Replace {{PLACEHOLDERS}} with detected versions.
    *   **Update** `agent_rules_v2/.rules/ops/checklist.md`: Set build/test commands (e.g., `npm run build`).
    *   **Refine** `agent_rules_v2/.context/directory_map.md`: Map the actual folder structure below this block.
4.  **CLEANUP**: Remove this comment block after successful initialization.
-->

# 📂 Project Directory Map (Template)

> **"A place for everything."**

## 📂 Root
- **`src/`** (or equivalent): Source code.
- **`rules/`**: Agent OS (Brain).

## 📂 Front
- **`src/app/`**: App Router pages & layouts.
- **`src/features/`**: Domain logic (e.g., `chat`, `auth`).
- **`src/shared/`**: Reusable UI components & utilities.
- **`src/api/`**: Axios configuration & API types.
- **`src/views/`**: Page assembly (glue code).
- **`agent_rules_v2/`**: Agent OS (Brain).
