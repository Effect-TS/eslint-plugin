import disableConflictRules from "@effect/eslint-plugin/configs/disable-conflict-rules"
import * as plugin from "@effect/eslint-plugin/plugin"

export default plugin.configs.dprint = [
  ...disableConflictRules,
  {
    plugins: {
      "@effect": plugin,
    },
    rules: {
      "@effect/dprint": "error",
    },
  },
]
