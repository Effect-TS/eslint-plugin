import { ESLintUtils } from "@typescript-eslint/utils"
import * as path from "path"

export const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: path.join(__dirname, "..", "fixtures")
  }
})
