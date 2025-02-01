import { dprint } from "@effect/eslint-plugin/rules/dprint"
import recommended from "@effect/eslint-plugin/configs/recommended"

export const configs = {
  recommended,
}

export const rules = {
  dprint,
}

export const meta = {
  name: "@effect/eslint-plugin",
}

const plugin = { meta, rules, configs }

export default plugin
