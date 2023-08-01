import { disableConflictRules } from "@effect/eslint-plugin/configs/disable-conflict-rules"

export default {
  extends: [],
  rules: {
    ...disableConflictRules.rules,
    "@effect/dprint": "error",
  },
}
