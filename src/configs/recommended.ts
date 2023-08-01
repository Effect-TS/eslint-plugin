import { disableConflictRules } from "@effect/eslint-plugin/configs/disable-conflict-rules"

export default {
  plugins: ["@effect"],
  rules: {
    ...disableConflictRules.rules,
    "@effect/dprint": "error",
  },
}
