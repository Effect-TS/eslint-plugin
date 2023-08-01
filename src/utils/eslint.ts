import { ESLintUtils } from "@typescript-eslint/utils"

const {getParserServices} = ESLintUtils

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/Effect-TS/eslint-plugin/blob/main/src/rules/${name}.ts`
)

export { getParserServices, createRule}
