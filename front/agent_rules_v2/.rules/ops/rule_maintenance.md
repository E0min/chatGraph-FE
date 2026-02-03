# 🌺 Rule Maintenance Policy (The Gardener Protocol)

> **"Prune the dead leaves, water the roots."**

Rules are not stone tablets; they are a garden. You must actively maintain them to prevent "Semantic Rot".

## 1. 🕰️ Trigger Events
- **Start of Session**: Check if `tech_stack.md` matches the actual `package.json` / `pom.xml`.
- **End of Task**: Did I violate a rule because it was outdated?
- **Context Switch**: When switching from `Planning` to `Coding`, is the `implementer.md` role sufficient?

## 2. 🛡️ Mutable vs Immutable
| Type | Files | Policy |
|---|---|---|
| **Immutable** | `meta/prime_directive.md`, `meta/index.md` | **Proposal Required**. Do not change without explicit User approval. |
| **Mutable** | `knowledge/*`, `track/*` | **Auto-Update**. Update these whenever you detect a discrepancy. |
| **Semi-Mutable**| `ops/*`, `roles/*` | **Refinement**. Improve these if you find a better workflow (Self-Correction). |

## 3. 🛠️ Action Items
1.  **Orphaned Files**: If `directory_map.md` lists a folder that no longer exists -> **Delete the line**.
2.  **New Tech**: If you install a new library (e.g., `zustand`) -> **Add to `tech_stack.md`**.
3.  **Ambiguity**: If a rule isn't clear -> **Clarify it immediately** in the file.
