import { dprint } from "@effect/eslint-plugin/rules/dprint"
import recommended from "./configs/recommended"

export default {
  configs: {
    recommended,
  },
  rules: {
    dprint,
  },
}
