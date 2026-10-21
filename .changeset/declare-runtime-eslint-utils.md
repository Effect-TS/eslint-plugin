---
"@effect/eslint-plugin": patch
---

Declare `@typescript-eslint/utils` as a runtime dependency so the plugin and barrel import rule can load in clean consumer installations without relying on hoisted development dependencies.
