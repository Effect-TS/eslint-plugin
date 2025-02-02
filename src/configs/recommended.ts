import disableConflictRules from "@effect/eslint-plugin/configs/disable-conflict-rules"
import plugin from "@effect/eslint-plugin/plugin"

const recommended = [
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

plugin.configs.recommended = recommended
export default recommended
