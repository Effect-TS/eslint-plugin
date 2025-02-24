import { dprint } from "@effect/eslint-plugin/rules/dprint"

export const meta = {
  name: "@effect/eslint-plugin",
}

export const rules = {
  dprint,
}

// NOTE: unfortunately plugins needs a self-reference inside configs,
// so in this file we only stub out known configs
// but they actually get injected in their respective file
export const configs = {
  dprint: [] as Array<any>,
}
